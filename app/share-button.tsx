"use client";

import { useState } from "react";
import type { Content } from "./content";

/**
 * Botão de compartilhamento nativo: aciona a folha de compartilhamento do
 * sistema (Web Share API) quando disponível; nos navegadores sem suporte,
 * copia o link da página para a área de transferência.
 */
export default function ShareButton({ share }: { share: Content["share"] }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: share.title, text: share.text, url });
      } catch {
        // Usuário cancelou a folha de compartilhamento nativa; nada a fazer.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Sem clipboard e sem Web Share API: não há fallback silencioso seguro.
    }
  }

  return (
    <button type="button" className="share-button" onClick={handleShare}>
      <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v12m0-12 4 4m-4-4-4 4M6 11v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-7"
        />
      </svg>
      <span aria-live="polite">{copied ? share.copied : share.label}</span>
    </button>
  );
}
