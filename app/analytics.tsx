"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "ga-consent";
type Consent = "unset" | "granted" | "denied";

let cachedConsent: Consent = "unset";
const consentListeners = new Set<() => void>();

function readStoredConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unset";
  } catch {
    return "unset";
  }
}

function subscribeConsent(callback: () => void) {
  consentListeners.add(callback);
  return () => consentListeners.delete(callback);
}

function getConsentSnapshot(): Consent {
  return cachedConsent;
}

function getServerConsentSnapshot(): Consent {
  return "unset";
}

function commitConsent(value: Consent) {
  cachedConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage indisponível (modo privado/bloqueio) — a preferência não persiste entre sessões.
  }
  consentListeners.forEach((listener) => listener());
}

/** One-time bootstrap: creates dataLayer/gtag and loads the script, defaulting to denied.
 * Idempotent — safe to call again after a withdraw/re-grant cycle. */
function ensureGtagLoaded(measurementId: string) {
  if (document.getElementById("ga4-script")) return;

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });
  gtag("config", measurementId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

/** The documented mechanism for telling an already-loaded tag that consent changed —
 * https://developers.google.com/tag-platform/security/guides/consent#update_consent_state.
 * In Basic Consent Mode (used here, no wait_for_update/redaction), a "denied" update stops the
 * tag from sending any further pings — no page reload needed to reach the uninstrumented state. */
function updateGtagConsent(state: "granted" | "denied") {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: state,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

/** Best-effort removal of the first-party cookies gtag.js set while consent was granted.
 * This only clears what this browser can still reach client-side — it makes no claim about
 * data already transmitted to Google before withdrawal. */
function clearAnalyticsCookies() {
  try {
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0]?.trim();
      if (name && /^_ga/.test(name)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    }
  } catch {
    // Cookie access blocked (e.g. browser privacy settings) — nothing to clear client-side.
  }
}

/** Gated on the current consent state, not merely window.gtag's existence — an already-loaded
 * tag must stop forwarding events the moment consent is withdrawn, even mid-session. */
function trackEvent(name: string, params: Record<string, string>) {
  if (cachedConsent !== "granted") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

const GA_EVENT_KEYS = ["placement", "caseSlug", "projectSlug", "contactMethod"] as const;
const GA_PARAM_NAMES: Record<(typeof GA_EVENT_KEYS)[number], string> = {
  placement: "placement",
  caseSlug: "case_slug",
  projectSlug: "project_slug",
  contactMethod: "contact_method",
};

export default function Analytics({ measurementId }: { measurementId: string }) {
  const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (!measurementId) return;
    const stored = readStoredConsent();
    if (stored !== cachedConsent) commitConsent(stored);
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId) return;
    if (consent === "granted") {
      ensureGtagLoaded(measurementId);
      updateGtagConsent("granted");
    } else if (consent === "denied") {
      updateGtagConsent("denied");
      clearAnalyticsCookies();
    }
  }, [measurementId, consent]);

  useEffect(() => {
    if (!measurementId) return;

    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-ga-event]");
      if (!target) return;
      const name = target.dataset.gaEvent;
      if (!name) return;

      const params: Record<string, string> = {};
      for (const key of GA_EVENT_KEYS) {
        const value = target.dataset[key];
        if (value) params[GA_PARAM_NAMES[key]] = value;
      }
      trackEvent(name, params);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [measurementId]);

  if (!measurementId) return null;

  function accept() {
    commitConsent("granted");
    setPanelOpen(false);
  }

  function reject() {
    commitConsent("denied");
    setPanelOpen(false);
  }

  const showBanner = consent === "unset" || panelOpen;

  return (
    <>
      {showBanner && (
        <div className="consent-banner" role="dialog" aria-modal="false" aria-labelledby="consent-title">
          <div className="consent-banner-inner">
            <div className="consent-copy">
              <p id="consent-title">
                <strong>Privacidade e métricas.</strong> Uso o Google Analytics 4 apenas para entender a
                audiência deste portfólio. Nenhum dado é coletado antes da sua aceitação, e você pode mudar
                de ideia quando quiser.
              </p>
              <p>
                Bloqueadores de anúncios, o modo de navegação privada e a rejeição do consentimento reduzem a
                precisão das métricas — os números refletem apenas uma parte real da audiência.
              </p>
            </div>
            <div className="consent-actions">
              <button type="button" className="button button-light" onClick={reject}>
                Rejeitar
              </button>
              <button type="button" className="button button-dark" onClick={accept}>
                Aceitar
              </button>
            </div>
          </div>
        </div>
      )}
      {!showBanner && (
        <button type="button" className="consent-reopen" onClick={() => setPanelOpen(true)}>
          Preferências de privacidade
        </button>
      )}
    </>
  );
}
