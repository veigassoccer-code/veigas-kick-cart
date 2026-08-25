import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail } from "lucide-react";
import { SocialLinks } from "@/components/store/Footer";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Veigas Soccer" },
      {
        name: "description",
        content:
          "Fale com a Veigas Soccer: suporte via WhatsApp +55 (91) 99904-1093 ou e-mail suporte@veigassoccer.com.br, de segunda a sexta, das 8h às 18h.",
      },
      { property: "og:title", content: "Contato — Veigas Soccer" },
      {
        property: "og:description",
        content: "Suporte via WhatsApp ou e-mail, de segunda a sexta, das 8h às 18h.",
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

const CANAIS = [
  {
    titulo: "WhatsApp",
    valor: "+55 (91) 99904-1093",
    descricao: "Resposta rápida no horário de atendimento",
    href: "https://wa.me/5591999041093",
    Icon: WhatsAppIcon,
  },
  {
    titulo: "E-mail",
    valor: "suporte@veigassoccer.com.br",
    descricao: "Respondemos em até 1 dia útil",
    href: "mailto:suporte@veigassoccer.com.br",
    Icon: Mail,
  },
];

function ContatoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 text-center">
        <p className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
          Fale com a gente
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-wide uppercase sm:text-5xl">
          Contato
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Atendimento de segunda a sexta, das 8h às 18h. Suporte via WhatsApp ou E-mail.
        </p>
      </header>

      <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
        {CANAIS.map(({ titulo, valor, descricao, href, Icon }) => (
          <a
            key={titulo}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
              <Icon className="h-5 w-5 text-primary" />
            </span>
            <h2 className="mt-4 text-sm font-extrabold tracking-wider uppercase">{titulo}</h2>
            <p className="mt-1 font-semibold break-all text-primary">{valor}</p>
            <p className="mt-1 text-xs text-muted-foreground">{descricao}</p>
          </a>
        ))}
      </div>

      <div className="mx-auto mt-6 flex max-w-2xl items-center gap-4 rounded-xl border border-border bg-card p-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
          <Clock className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h2 className="text-sm font-extrabold tracking-wider uppercase">
            Horário de atendimento
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Segunda a sexta, das 8h às 18h (horário de Brasília).
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs font-extrabold tracking-widest text-muted-foreground uppercase">
          Siga a Veigas Soccer
        </p>
        <SocialLinks className="mt-4 flex justify-center gap-3" />
      </div>
    </div>
  );
}
