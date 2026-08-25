import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MARCAS } from "@/lib/products";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function SocialLinks({ className }: { className?: string }) {
  const links = [
    { href: "https://instagram.com/veigassoccer", label: "Instagram", Icon: Instagram },
    { href: "https://tiktok.com/@veigassoccer", label: "TikTok", Icon: TikTokIcon },
    { href: "https://wa.me/5591999041093", label: "WhatsApp", Icon: WhatsAppIcon },
  ];
  return (
    <div className={className}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Icon className="h-4.5 w-4.5" />
        </a>
      ))}
    </div>
  );
}

const INFORMACOES: { label: string; to: string; params?: Record<string, string> }[] = [
  { label: "Busca", to: "/catalogo" },
  { label: "Contato", to: "/contato" },
  { label: "Aviso Legal", to: "/pagina/$slug", params: { slug: "aviso-legal" } },
  { label: "Perguntas Frequentes", to: "/pagina/$slug", params: { slug: "perguntas-frequentes" } },
  { label: "Política de Privacidade", to: "/pagina/$slug", params: { slug: "privacidade" } },
  { label: "Política de Troca e Devolução", to: "/pagina/$slug", params: { slug: "troca-e-devolucao" } },
  { label: "Políticas de Envio e Prazo de Entrega", to: "/pagina/$slug", params: { slug: "envio-e-prazo" } },
];

function InformacoesLinks() {
  return (
    <ul className="space-y-2 text-sm">
      {INFORMACOES.map((item) => (
        <li key={item.label}>
          <Link
            to={item.to}
            params={item.params}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Digite um e-mail válido.");
      return;
    }
    toast.success("Inscrição confirmada! Fique de olho nas novidades.");
    setEmail("");
  };
  return (
    <form onSubmit={onSubmit} className="mt-3 flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Seu melhor e-mail"
        className="h-11 min-w-0 flex-1 rounded-md border border-input bg-surface px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
      />
      <button
        type="submit"
        className="h-11 shrink-0 rounded-md bg-primary px-4 text-xs font-extrabold tracking-wider text-primary-foreground uppercase transition-opacity hover:opacity-90"
      >
        Assinar
      </button>
    </form>
  );
}

function LinksRapidos() {
  return (
    <ul className="space-y-2 text-sm">
      <li>
        <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
          Início
        </Link>
      </li>
      <li>
        <Link to="/catalogo" className="text-muted-foreground transition-colors hover:text-primary">
          Catálogo completo
        </Link>
      </li>
      {MARCAS.map((marca) => (
        <li key={marca}>
          <Link
            to="/catalogo"
            search={{ marca }}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Chuteiras {marca}
          </Link>
        </li>
      ))}
      <li>
        <Link to="/contato" className="text-muted-foreground transition-colors hover:text-primary">
          Contato
        </Link>
      </li>
    </ul>
  );
}

const SECOES = [
  { value: "info", titulo: "Informações", Conteudo: InformacoesLinks },
  { value: "links", titulo: "Links Rápidos", Conteudo: LinksRapidos },
  {
    value: "newsletter",
    titulo: "Assine nossa Newsletter",
    Conteudo: function NewsletterBloco() {
      return (
        <>
          <p className="text-sm text-muted-foreground">
            Receba lançamentos e promoções exclusivas.
          </p>
          <NewsletterForm />
        </>
      );
    },
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Marca + horários de suporte */}
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-display text-3xl tracking-wide">
              VEIGAS <span className="text-primary">SOCCER</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A loja de quem vive futebol. Chuteiras de campo, futsal e society com o melhor
              preço do Brasil.
            </p>
            <SocialLinks className="mt-5 flex gap-3" />
          </div>
          <div>
            <h3 className="text-xs font-extrabold tracking-widest text-primary uppercase">
              Horários de Suporte
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Atendimento de segunda a sexta, das 8h às 18h. Suporte via WhatsApp ou E-mail.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <a
                href="https://wa.me/5591999041093"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold transition-colors hover:text-primary"
              >
                <MessageCircle className="h-4 w-4 text-primary" /> +55 (91) 99904-1093
              </a>
              <a
                href="mailto:suporte@veigassoccer.com.br"
                className="flex items-center gap-2 font-semibold transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 text-primary" /> suporte@veigassoccer.com.br
              </a>
            </div>
          </div>
        </div>

        {/* Seções sanfonadas — mobile */}
        <Accordion type="multiple" className="mt-10 md:hidden">
          {SECOES.map(({ value, titulo, Conteudo }) => (
            <AccordionItem key={value} value={value} className="border-border">
              <AccordionTrigger className="text-sm font-extrabold tracking-wider text-primary uppercase">
                {titulo}
              </AccordionTrigger>
              <AccordionContent>
                <Conteudo />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Colunas — desktop */}
        <div className="mt-12 hidden grid-cols-3 gap-10 border-t border-border pt-10 md:grid">
          {SECOES.map(({ value, titulo, Conteudo }) => (
            <div key={value}>
              <h3 className="text-xs font-extrabold tracking-widest text-primary uppercase">
                {titulo}
              </h3>
              <div className="mt-4">
                <Conteudo />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border py-5">
        <p className="text-center text-xs text-muted-foreground">
          © Veigas Soccer. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
