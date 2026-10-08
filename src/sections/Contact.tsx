import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  BadgeCheck,
} from "lucide-react";
import { Reveal, Eyebrow } from "../components/ui";
import { prepareDemoQuote, validateQuote, type Quote } from "../contact";
import { site } from "../config";
export default function Contact() {
  const [errors, setErrors] = useState<Partial<Record<keyof Quote, string>>>(
    {},
  );
  const [success, setSuccess] = useState(false);
  const service = useRef<HTMLSelectElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: Event) => {
      if (service.current) service.current.value = (e as CustomEvent).detail;
    };
    window.addEventListener("select-service", handler);
    return () => window.removeEventListener("select-service", handler);
  }, []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Quote;
    const result = validateQuote(data);
    setErrors(result);
    setSuccess(false);
    if (Object.keys(result).length) {
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    if (prepareDemoQuote(data).valid) {
      setSuccess(true);
      requestAnimationFrame(() => status.current?.focus());
    }
  }
  return (
    <section className="section contact" id="contato">
      <div className="container contact-grid">
        <Reveal>
          <Eyebrow>VAMOS CRIAR O CLIMA IDEAL</Eyebrow>
          <h2>
            {site.copy.contact[0]}
            <br />
            {site.copy.contact[1]}
            <span>{site.copy.contact[2]}</span>
          </h2>
          <p>{site.copy.contactDescription}</p>
          <div className="contact-details">
            {[
              [Phone, "WhatsApp", site.contact.whatsapp],
              [Mail, "E-mail", site.contact.email],
              [MapPin, "Onde atendemos", site.contact.location],
              [Clock, "Atendimento", site.contact.hours],
            ].map(([I, title, value]) => {
              const Component = I as typeof Phone;
              return (
                <div key={String(title)}>
                  <Component size={20} />
                  <span>
                    <small>{String(title)}</small>
                    {String(value)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="contact-note">
            <ShieldCheck size={19} />
            <p>
              Site demonstrativo. Os contatos são ilustrativos e nenhum dado
              preenchido será enviado ou armazenado.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <form
            ref={form}
            noValidate
            onSubmit={submit}
            onChange={() => setSuccess(false)}
          >
            <h3>Vamos falar sobre o seu ambiente?</h3>
            <p>Preencha os campos para testar a experiência.</p>
            <div className="form-grid">
              {[
                ["name", "Nome", "Seu nome", "text"],
                ["phone", "WhatsApp", "(11) 99999-9999", "tel"],
                ["email", "E-mail", "voce@exemplo.com", "email"],
                ["city", "Cidade", "Sua cidade", "text"],
              ].map(([name, label, placeholder, type]) => (
                <label key={name} htmlFor={name}>
                  {label}
                  <input
                    aria-label={label}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required
                    maxLength={150}
                    autoComplete={
                      {
                        name: "name",
                        phone: "tel",
                        email: "email",
                        city: "address-level2",
                      }[name]
                    }
                    aria-invalid={!!errors[name as keyof Quote]}
                    aria-describedby={
                      errors[name as keyof Quote] ? `${name}-error` : undefined
                    }
                  />
                  {errors[name as keyof Quote] && (
                    <span className="error" id={`${name}-error`}>
                      {errors[name as keyof Quote]}
                    </span>
                  )}
                </label>
              ))}
              <label className="full" htmlFor="service">
                Tipo de serviço
                <select
                  aria-label="Tipo de serviço"
                  id="service"
                  ref={service}
                  name="service"
                  required
                  aria-invalid={!!errors.service}
                  aria-describedby={
                    errors.service ? "service-error" : undefined
                  }
                >
                  <option value="">Selecione uma solução</option>
                  {site.services.map((s) => (
                    <option key={s.title}>{s.title}</option>
                  ))}
                </select>
                {errors.service && (
                  <span id="service-error" className="error">
                    {errors.service}
                  </span>
                )}
              </label>
              <label className="full" htmlFor="message">
                Mensagem
                <textarea
                  aria-label="Mensagem"
                  name="message"
                  id="message"
                  placeholder="Conte um pouco sobre o seu ambiente e o que você precisa…"
                  required
                  rows={4}
                  maxLength={2000}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <span id="message-error" className="error">
                    {errors.message}
                  </span>
                )}
              </label>
            </div>
            <button className="button submit" type="submit">
              Solicitar orçamento
              <ArrowUpRight size={19} />
            </button>
            <p className="form-disclaimer">
              Demonstração interativa • Sem envio de informações
            </p>
            {success && (
              <div className="success" role="status" ref={status} tabIndex={-1}>
                <BadgeCheck />
                <div>
                  <strong>Teste concluído com sucesso!</strong>
                  <p>
                    Os campos foram validados. Nenhum dado foi enviado ou
                    armazenado. Em uma versão real, a solicitação seguiria para
                    a equipe.
                  </p>
                </div>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
