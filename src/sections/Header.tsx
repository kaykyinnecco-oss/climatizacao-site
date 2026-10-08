import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo, Button } from "../components/ui";
import { site } from "../config";
const nav = [
  ["Início", "inicio"],
  ["Serviços", "servicos"],
  ["Sobre nós", "sobre"],
  ["Equipamentos", "equipamentos"],
  ["Projetos", "projetos"],
  ["Contato", "contato"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);
  return (
    <header>
      <div className="container header-inner">
        <Logo />
        <nav aria-label="Navegação principal">
          {nav.map(([label, id]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <Button className="header-cta" />
        <button
          id="menu-toggle"
          className="icon-button menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        id="mobile-menu"
        className={`mobile-menu ${open ? "is-open" : ""}`}
        inert={!open}
      >
        {nav.map(([label, id]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
            <ArrowUpRight size={18} />
          </a>
        ))}
      </div>
    </header>
  );
}
