import { ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, Icon } from "../components/ui";
import { site } from "../config";
export default function Equipment() {
  return (
    <section className="section" id="equipamentos">
      <div className="container">
        <Reveal className="section-heading">
          <div>
            <Eyebrow>TECNOLOGIA PARA CADA ESPAÇO</Eyebrow>
            <h2>
              {site.copy.equipment[0]}
              <br />
              {site.copy.equipment[1]}
              <span>{site.copy.equipment[2]}</span>
            </h2>
          </div>
          <p>
            Da sua casa a grandes operações, encontre
            <br />a tecnologia que se conecta ao seu projeto.
          </p>
        </Reveal>
        <div className="equipment-grid">
          {site.equipment.map((e, i) => (
            <Reveal key={e.name} delay={(i % 4) * 0.05}>
              <a href="#contato" className={`equipment-card equipment-${i}`}>
                <Icon name={e.icon} size={35} />
                <ArrowUpRight className="corner-arrow" size={18} />
                <h3>{e.name}</h3>
                <p>{e.detail}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="brands-intro">
          <span>REFERÊNCIAS EM TECNOLOGIA</span>
          <p>Fabricantes reconhecidos no mercado de climatização.</p>
        </div>
        <div
          className="brands"
          tabIndex={0}
          role="region"
          aria-label="Fabricantes ilustrativos; deslize para explorar"
        >
          {site.brands.map((brand, i) => (
            <div className={`brand brand-${i}`} key={brand}>
              {brand}
            </div>
          ))}
        </div>
        <p className="fine-print centered">
          Marcas apresentadas como referências ilustrativas. Sem vínculo,
          parceria ou autorização oficial.
        </p>
      </div>
    </section>
  );
}
