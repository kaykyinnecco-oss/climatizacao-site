import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Leaf,
  Snowflake,
} from "lucide-react";
import { Photo, Eyebrow, Button } from "../components/ui";
import { site } from "../config";
export default function Hero() {
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 35]);
  return (
    <section ref={heroRef} id="inicio" className="hero">
      <motion.div
        className="hero-parallax"
        style={{ y: reduced ? 0 : parallax }}
      >
        <Photo
          priority
          src={site.images.hero}
          alt="Sala contemporânea com luz natural e ar-condicionado split"
          className="hero-background"
        />
      </motion.div>
      <div className="hero-overlay" />
      <div className="container hero-content">
        <motion.div
          className="hero-copy"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Eyebrow light>O CONFORTO ESTÁ NOS DETALHES</Eyebrow>
          <h1>
            {site.hero.title.split(site.hero.highlight).map((part, i) => (
              <span key={i}>
                {i > 0 && <em>{site.hero.highlight}</em>}
                {part}
              </span>
            ))}
          </h1>
          <p>{site.hero.description}</p>
          <div className="hero-actions">
            <Button />
            <a className="text-link" href="#servicos">
              Conheça nossas soluções <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-credibility">
            <span>
              <ShieldCheck />
              Cuidado técnico
            </span>
            <span>
              <Leaf />
              Eficiência energética
            </span>
          </div>
        </motion.div>
        <motion.div
          className="hero-product"
          initial={reduced ? false : { opacity: 0, x: 100, rotateY: -12 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.35, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="product-label">
            <span />
            TECNOLOGIA QUE VOCÊ SENTE
          </div>
          <img
            src={site.images.split}
            alt="Aparelho split branco com saída de ar aberta"
            width="1000"
            height="367"
            fetchPriority="high"
          />
          <svg
            className="airflow"
            viewBox="0 0 500 250"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="air" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#c6e8ff" stopOpacity=".45" />
                <stop offset="1" stopColor="#c6e8ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M${110 + i * 43} 0 C ${80 + i * 52} 90,${50 + i * 60} 130,${20 + i * 75} 240`}
                stroke="url(#air)"
                strokeWidth="1.3"
                style={{ animationDelay: `${i * 0.22}s` }}
              />
            ))}
          </svg>
          <div className="comfort-tag">
            <Snowflake size={21} />
            <div>
              Seu ambiente. Seu equilíbrio.
              <small>Conforto em todas as estações.</small>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="container hero-bottom">
        <span>
          RESIDENCIAL <i /> COMERCIAL <i /> CORPORATIVO
        </span>
        <a href="#servicos" aria-label="Explorar serviços">
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
}
