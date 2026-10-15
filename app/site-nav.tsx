"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Content, Lang } from "./content";

export default function SiteNav({ nav, lang }: { nav: Content["nav"]; lang: Lang }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="nav-wrap">
      <nav className="nav shell" aria-label={nav.label}>
        <a className="brand" href="#top" aria-label={nav.home}>
          JD<span>.</span>
        </a>
        <div className="nav-links" id={menuId} data-open={open}>
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="lang-switch" role="group" aria-label={nav.language}>
          <a href={`${basePath}/`} hrefLang="pt-BR" lang="pt-BR" aria-current={lang === "pt" ? "page" : undefined}>PT</a>
          <a href={`${basePath}/en/`} hrefLang="en" lang="en" aria-current={lang === "en" ? "page" : undefined}>EN</a>
        </div>
        <a className="nav-cta" href="#contato">{nav.cta}</a>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? nav.close : nav.open}</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </nav>
    </header>
  );
}
