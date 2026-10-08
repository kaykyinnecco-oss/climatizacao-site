import { type CSSProperties } from "react";
import { MotionConfig } from "motion/react";
import { Wind, Leaf, BadgeCheck, Phone, ArrowUpRight } from "lucide-react";
import { site } from "./config";
import { Reveal, Eyebrow, Button, Logo } from "./components/ui";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import About from "./sections/About";
import Equipment from "./sections/Equipment";
import Projects from "./sections/Projects";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div
        style={
          {
            "--navy": site.colors.navy,
            "--secondary": site.colors.secondary,
            "--orange": site.colors.accent,
            "--soft": site.colors.soft,
          } as CSSProperties
        }
      >
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="main">
          <Hero />
          <div className="promise-strip">
            <div className="container">
              <span>
                <BadgeCheck />
                Excelência em cada detalhe
              </span>
              <span>
                <Wind />
                Conforto em todas as estações
              </span>
              <span>
                <Leaf />
                Soluções com mais eficiência
              </span>
            </div>
          </div>
          <Services />
          <About />
          <Equipment />
          <Projects />
          <Testimonials />
          <section className="cta-section">
            <div className="container">
              <Reveal>
                <Eyebrow light>O PRÓXIMO PASSO É SIMPLES</Eyebrow>
                <h2>{site.copy.ctaTitle}</h2>
                <p>{site.copy.ctaDescription}</p>
              </Reveal>
              <Button>Falar com um especialista</Button>
              <Wind className="cta-wind" strokeWidth={0.6} />
            </div>
          </section>
          <Contact />
        </main>
        <footer>
          <div className="container footer-main">
            <div>
              <Logo />
              <p>O clima ideal para viver melhor.</p>
            </div>
            <div className="footer-links">
              <a href="#servicos">Serviços</a>
              <a href="#projetos">Projetos</a>
              <a href="#contato">
                Fale com a gente <ArrowUpRight size={15} />
              </a>
            </div>
            <a className="back-top" href="#inicio">
              Voltar ao topo <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="container footer-bottom">
            <span>
              © {new Date().getFullYear()} {site.name}. Empresa fictícia · Site
              demonstrativo.
            </span>
            <span>
              Design & desenvolvimento <strong>K-AGENCY ↗</strong>
            </span>
          </div>
        </footer>
        <a
          className="floating-contact"
          href="#contato"
          aria-label="Ir ao formulário de orçamento"
        >
          <Phone size={21} />
          <span>Vamos conversar</span>
        </a>
      </div>
    </MotionConfig>
  );
}
export default App;
