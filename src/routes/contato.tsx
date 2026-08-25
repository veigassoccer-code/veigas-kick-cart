import { createFileRoute, Link } from "@tanstack/react-router";
import { Headphones, Mail, MapPin } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { SocialLinks } from "@/components/store/Footer";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contate-nos — Veigas Soccer" },
      {
        name: "description",
        content:
          "Estamos à disposição para suporte via WhatsApp e e-mail, de segunda a sexta-feira, das 08h às 18h. Fale com a Veigas Soccer.",
      },
      { property: "og:title", content: "Contate-nos — Veigas Soccer" },
      {
        property: "og:description",
        content: "Suporte via WhatsApp e e-mail, de segunda a sexta-feira, das 08h às 18h.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContatoPage,
});

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FormularioContato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (nome.trim().length < 3) {
      toast.error("Digite seu nome completo.");
      return;
    }
    if (!email.includes("@")) {
      toast.error("Digite um e-mail válido.");
      return;
    }
    if (mensagem.trim().length < 10) {
      toast.error("Escreva uma mensagem um pouco maior.");
      return;
    }
    toast.success("Mensagem enviada! Responderemos em até 1 dia útil.");
    setNome("");
    setEmail("");
    setMensagem("");
  };

  const inputClass =
    "h-12 w-full rounded-full border border-input bg-surface px-5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome completo"
          maxLength={100}
          className={inputClass}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          maxLength={255}
          className={inputClass}
        />
      </div>
      <textarea
        required
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Deixe aqui a sua mensagem"
        rows={6}
        maxLength={1000}
        className="w-full resize-none rounded-3xl border border-input bg-surface px-5 py-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        className="h-12 w-full rounded-full bg-primary text-sm font-extrabold tracking-wider text-primary-foreground uppercase transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
      >
        Enviar mensagem
      </button>
    </form>
  );
}

function ContatoPage() {
  return (
    <section className="page-content-light flex-1">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Migalha de pão + título */}
        <header className="mb-10 text-center">
          <nav aria-label="Migalha de pão" className="text-xs font-bold tracking-widest uppercase">
            <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
              Lar
            </Link>
            <span className="mx-2 text-muted-foreground">·</span>
            <span className="text-primary">Contato</span>
          </nav>
          <h1 className="mt-3 font-display text-4xl tracking-wide uppercase sm:text-5xl">
            Contate-nos
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Estamos à disposição para suporte via WhatsApp e e-mail, de segunda a sexta-feira, das
            08h às 18h. Conte conosco para o que precisar!
          </p>
        </header>

        {/* Mapa de Belém/PA */}
        <div className="overflow-hidden rounded-xl border border-border">
          <iframe
            title="Mapa de Belém/PA"
            src="https://www.google.com/maps?q=Bel%C3%A9m%2C%20Par%C3%A1%2C%20Brasil&output=embed"
            loading="lazy"
            className="h-72 w-full sm:h-96"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Cliente de suporte */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Headphones className="h-5 w-5 text-primary" />
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-extrabold tracking-wider uppercase">
                Cliente de suporte
              </h2>
              <a
                href="https://wa.me/5591999041093"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 text-sm font-semibold transition-colors hover:text-primary"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-primary" /> +55 (91) 99904-1093
              </a>
              <a
                href="mailto:suporte@veigassoccer.com.br"
                className="mt-1.5 flex items-center gap-2 text-sm font-semibold break-all transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" /> suporte@veigassoccer.com.br
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <MapPin className="h-5 w-5 text-primary" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold tracking-wider uppercase">Localização</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Belém, Pará — Brasil. Atendimento online para todo o país.
              </p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-sm font-extrabold tracking-wider text-primary uppercase">
            Envie sua mensagem
          </h2>
          <div className="mt-5">
            <FormularioContato />
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs font-extrabold tracking-widest text-muted-foreground uppercase">
            Siga a Veigas Soccer
          </p>
          <SocialLinks className="mt-4 flex justify-center gap-3" />
        </div>
      </div>
    </section>
  );
}
