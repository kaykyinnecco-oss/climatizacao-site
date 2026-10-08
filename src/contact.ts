// Integration boundary: replace this adapter only when real submission is configured.
// No request, storage, analytics or transmission of personal information occurs in demo mode.
export type Quote = {
  name: string;
  phone: string;
  email: string;
  city: string;
  service: string;
  message: string;
};
export function validateQuote(
  data: Quote,
): Partial<Record<keyof Quote, string>> {
  const errors: Partial<Record<keyof Quote, string>> = {};
  if (data.name.trim().length < 2)
    errors.name = "Informe seu nome (mínimo de 2 caracteres).";
  if (!/^\d{10,11}$/.test(data.phone.replace(/\D/g, "")))
    errors.phone = "Informe um WhatsApp com DDD (10 ou 11 dígitos).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Informe um e-mail válido.";
  if (data.city.trim().length < 2) errors.city = "Informe sua cidade.";
  if (!data.service) errors.service = "Selecione um serviço.";
  if (data.message.trim().length < 10)
    errors.message =
      "Conte um pouco sobre seu projeto (mínimo de 10 caracteres).";
  return errors;
}
export function prepareDemoQuote(data: Quote) {
  return {
    mode: "demo" as const,
    valid: Object.keys(validateQuote(data)).length === 0,
  };
}
