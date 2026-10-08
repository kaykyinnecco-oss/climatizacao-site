import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal, Eyebrow } from "../components/ui";
import { site } from "../config";
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  return (
    <section className="section testimonials">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>EXPERIÊNCIAS DE CONFORTO</Eyebrow>
            <h2>
              {site.copy.testimonials[0]}
              <br />
              {site.copy.testimonials[1]}
              <span>{site.copy.testimonials[2]}</span>
            </h2>
          </div>
          <div className="review-controls">
            <button
              className="icon-button"
              aria-label="Depoimentos anteriores"
              onClick={() => setIndex((index + 2) % 3)}
            >
              <ChevronLeft />
            </button>
            <button
              className="icon-button"
              aria-label="Próximos depoimentos"
              onClick={() => setIndex((index + 1) % 3)}
            >
              <ChevronRight />
            </button>
          </div>
        </Reveal>
        <div className="reviews" aria-live="polite">
          {[0, 1, 2].map((offset) => {
            const t = site.testimonials[(index + offset) % 3];
            return (
              <article className="review-card" key={offset}>
                <div
                  className="stars"
                  role="img"
                  aria-label="5 estrelas ilustrativas"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="quote" key={t.name}>
                  “{t.text}”
                </p>
                <div className="review-person">
                  <span>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.service}</small>
                  </div>
                </div>
                <span className="demo-label">DEPOIMENTO DEMONSTRATIVO</span>
              </article>
            );
          })}
        </div>
        <p className="fine-print centered">
          Nomes e relatos fictícios, criados exclusivamente para demonstrar o
          layout. Não são avaliações verificadas.
        </p>
      </div>
    </section>
  );
}
