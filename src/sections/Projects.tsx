import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, Eyebrow, Photo } from "../components/ui";
import { site } from "../config";
export default function Projects() {
  const [filter, setFilter] = useState("Todos");
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  function close() {
    dialog.current?.close();
    trigger.current?.focus();
  }
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const reset = () => {
      document.body.style.overflow = "";
    };
    d.addEventListener("close", reset);
    return () => {
      reset();
      d.removeEventListener("close", reset);
    };
  }, []);
  return (
    <section className="section projects" id="projetos">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>CONFORTO QUE GANHA FORMA</Eyebrow>
            <h2>
              {site.copy.projects[0]}
              <br />
              {site.copy.projects[1]}
              <span>{site.copy.projects[2]}</span>
            </h2>
          </div>
          <div>
            <p>Ambientes únicos. Soluções sob medida.</p>
            <p className="fine-print">
              Galeria conceitual com imagens geradas por IA.
            </p>
          </div>
        </Reveal>
        <div className="filters" aria-label="Filtrar projetos">
          {["Todos", "Residencial", "Comercial", "Corporativo"].map((f) => (
            <button
              aria-pressed={f === filter}
              className={filter === f ? "active" : ""}
              key={f}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {site.projects.map((p, i) =>
            filter === "Todos" || filter === p.category ? (
              <Reveal key={p.title}>
                <button
                  className={`project-card project-${i}`}
                  onClick={(e) => {
                    setActive(i);
                    trigger.current = e.currentTarget;
                    dialog.current?.showModal();
                    document.body.style.overflow = "hidden";
                  }}
                  aria-label={`Ampliar ${p.title}`}
                >
                  <Photo src={p.image} alt={p.alt} />
                  <span className="project-overlay" />
                  <span className="project-expand">
                    <Plus size={22} />
                  </span>
                  <span className="project-caption">
                    <small>
                      {p.category} · {p.system}
                    </small>
                    <strong>{p.title}</strong>
                    <ArrowUpRight size={25} />
                  </span>
                </button>
              </Reveal>
            ) : null,
          )}
        </div>
        <p className="fine-print centered">
          Projetos ilustrativos. Os ambientes não representam obras executadas
          por uma empresa real.
        </p>
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Galeria de projetos"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight")
            setActive((active + 1) % site.projects.length);
          if (e.key === "ArrowLeft")
            setActive(
              (active + site.projects.length - 1) % site.projects.length,
            );
        }}
      >
        <button
          className="icon-button lightbox-close"
          onClick={close}
          aria-label="Fechar imagem"
        >
          <X />
        </button>
        <img
          src={site.projects[active].image}
          alt={site.projects[active].alt}
        />
        <div className="lightbox-controls">
          <button
            className="icon-button"
            onClick={() =>
              setActive(
                (active + site.projects.length - 1) % site.projects.length,
              )
            }
            aria-label="Imagem anterior"
          >
            <ChevronLeft />
          </button>
          <span>
            {site.projects[active].title}
            <small>
              {active + 1} / {site.projects.length} · Projeto ilustrativo
            </small>
          </span>
          <button
            className="icon-button"
            onClick={() => setActive((active + 1) % site.projects.length)}
            aria-label="Próxima imagem"
          >
            <ChevronRight />
          </button>
        </div>
      </dialog>
    </section>
  );
}
