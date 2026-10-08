import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AirVent,
  ArrowUpRight,
  Wind,
  ShieldCheck,
  Wrench,
  Sparkles,
  Ruler,
  Building2,
  Network,
  ClipboardCheck,
  Grid2X2,
  PanelTop,
  Snowflake,
  Store,
} from "lucide-react";
import { site } from "../config";
const icons: Record<string, typeof Wind> = {
  air: AirVent,
  shield: ShieldCheck,
  wrench: Wrench,
  sparkles: Sparkles,
  ruler: Ruler,
  building: Building2,
  network: Network,
  clipboard: ClipboardCheck,
  grid: Grid2X2,
  panel: PanelTop,
  wind: Wind,
  snow: Snowflake,
  store: Store,
};
export function Icon({
  name,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = icons[name] || Wind;
  return <Component {...props} strokeWidth={1.5} />;
}
export function Logo() {
  return (
    <a className="logo" href="#inicio" aria-label={`${site.name} — início`}>
      <img src={site.logo} alt="" width="39" height="39" />
      <span>
        {site.name}
        <small>{site.tagline}</small>
      </span>
    </a>
  );
}
export function Button({
  children = site.copy.quoteButton,
  className = "",
  href = "#contato",
}: {
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a className={`button ${className}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`photo ${className} ${loaded ? "loaded" : ""} ${failed ? "failed" : ""}`}
    >
      <img
        ref={(el) => {
          if (el?.complete && el.naturalWidth) setLoaded(true);
        }}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setLoaded(true);
          setFailed(true);
        }}
      />
      {failed && <span>Imagem indisponível</span>}
    </div>
  );
}
export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </div>
  );
}
