import { Wind, Check } from "lucide-react";
import { Reveal, Photo, Eyebrow, Button } from "../components/ui";
import { site } from "../config";
export default function About() {
  return (
    <section className="section about" id="sobre">
      <div className="container about-grid">
        <Reveal className="about-visual">
          <Photo
            src={site.images.about}
            alt="Ambiente de alto padrão com split integrado à parede de madeira"
          />
          <div className="image-caption">
            <Wind size={30} />
            <span>
              Mais do que climatizar.<strong>Elevar o seu bem-estar.</strong>
            </span>
          </div>
        </Reveal>
        <Reveal className="about-copy">
          <Eyebrow>A ESSÊNCIA AERIS</Eyebrow>
          <h2>
            {site.copy.about[0]}
            <br />
            {site.copy.about[1]}
            <span>{site.copy.about[2]}</span>
          </h2>
          {site.copy.aboutParagraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="differences">
            {site.differences.map((d) => (
              <span key={d}>
                <Check size={17} />
                {d}
              </span>
            ))}
          </div>
          <Button className="button-dark">Vamos conversar</Button>
        </Reveal>
      </div>
    </section>
  );
}
