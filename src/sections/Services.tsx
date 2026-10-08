import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, Icon } from "../components/ui";
import { site } from "../config";
export default function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>SOLUÇÕES COMPLETAS</Eyebrow>
            <h2>
              {site.copy.services[0]}
              <br />
              {site.copy.services[1]}
              <span>{site.copy.services[2]}</span>
            </h2>
          </div>
          <p>
            Do primeiro projeto ao cuidado contínuo.
            <br />A solução certa para cada ambiente.
          </p>
        </Reveal>
        <div className="services-grid">
          {site.services.map((s, i) => (
            <Reveal delay={(i % 4) * 0.055} key={s.title}>
              <a
                className="service-card"
                href={`#contato`}
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("select-service", { detail: s.title }),
                  )
                }
              >
                <div className="card-top">
                  <Icon name={s.icon} size={29} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="service-arrow">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
