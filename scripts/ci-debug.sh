#!/usr/bin/env bash
# TEMPORARY: repeat the whole pages chain (build + validate + tests) to catch the flaky stage; never merge.
enc() { python3 -c 'import sys;print(sys.stdin.read().replace("%","%25").replace("\r","").replace("\n","%0A"))'; }
runs=${RUNS:-5}; summary=""
for i in $(seq 1 $runs); do
  rm -rf .next out
  s=$(date +%s)
  if ! npx next build > /tmp/build$i.log 2>&1; then
    echo "::error::RUN $i BUILD failed%0A$(tail -40 /tmp/build$i.log | enc)"; summary="$summary build-fail"; continue
  fi
  w=$(grep -iE "font|retry|fetch|ECONN|ETIMEDOUT|fallback" /tmp/build$i.log | head -10)
  [ -n "$w" ] && echo "::warning::RUN $i build notes%0A$(echo "$w" | enc)"
  if ! node scripts/validate-pages-build.mjs > /tmp/validate$i.log 2>&1; then
    echo "::error::RUN $i VALIDATE failed%0A$(tail -25 /tmp/validate$i.log | enc)"; summary="$summary validate-fail"; continue
  fi
  b=$(( $(date +%s)-s ))
  if ! node --test --test-reporter=tap tests/pages/*.test.mjs > /tmp/t$i.log 2>&1; then
    python3 - "$i" "/tmp/t$i.log" <<'PY'
import re,sys
i,p=sys.argv[1],sys.argv[2]; lines=open(p).read().splitlines(); out=[]
for n,l in enumerate(lines):
    if re.match(r'\s*not ok ',l):
        out.append(l.strip())
        for m in lines[n+1:n+40]:
            if re.match(r'\s*(ok|not ok) ',m): break
            if re.search(r"(error|message|expected|actual|location|failureType|code):",m): out.append('   '+m.strip()[:300])
msg='\n'.join(out[:60]) or '\n'.join(lines[-40:])
print('::error::RUN %s TESTS failed%%0A%s'%(i,msg.replace('%','%25').replace('\n','%0A')))
PY
    summary="$summary tests-fail"
  else
    summary="$summary ok"
  fi
  echo "run $i build ${b}s total $(( $(date +%s)-s ))s"
done
echo "::warning::flaky summary:$summary"
exit 0
