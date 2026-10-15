"use client";

import { useState } from "react";

type Props = { email: string; label: string; copied: string; failed: string };

export default function CopyEmail({ email, label, copied, failed }: Props) {
  const [status, setStatus] = useState("");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus(copied);
    } catch {
      setStatus(failed);
    }
  }

  return (
    <>
      <button type="button" className="button button-dark button-small" onClick={copy}>
        {label}
      </button>
      <p className="copy-status" aria-live="polite">{status}</p>
    </>
  );
}
