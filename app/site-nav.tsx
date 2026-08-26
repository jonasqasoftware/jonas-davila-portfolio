"use client";

import { useEffect, useId, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#projetos", label: "Projetos" },
  { href: "#conteudos", label: "Conteúdo" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

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
      <nav className="nav container" aria-label="Navegação principal">
        <a className="brand" href="#top" aria-label="Jonas Dávila — início">
          JD<span>.</span>
        </a>
        <div className="nav-links" id={menuId} data-open={open}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
        <a className="nav-cta" href="#contato">Vamos conversar</a>
      </nav>
    </header>
  );
}
