import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FAQ } from "@/components/store/FAQ";

interface PaginaInstitucional {
  titulo: string;
  descricao: string;
  paragrafos?: string[];
  faq?: boolean;
}

const PAGINAS: Record<string, PaginaInstitucional> = {
  "aviso-legal": {
    titulo: "Aviso Legal",
    descricao: "Informações legais da loja Veigas Soccer.",
    paragrafos: [
      "A Veigas Soccer é uma loja virtual especializada em chuteiras de campo, futsal e society, atendendo todo o Brasil.",
      "Todas as transações realizadas neste site são processadas com segurança pela plataforma de pagamentos Yampi. Não armazenamos dados de cartão de crédito em nossos servidores.",
      "Os preços, promoções e condições de pagamento exibidos neste site são válidos exclusivamente para compras realizadas online e podem ser alterados sem aviso prévio.",
      "Em caso de dúvidas, entre em contato pelo WhatsApp +55 (91) 99904-1093 ou pelo e-mail suporte@veigassoccer.com.br.",
    ],
  },
  "perguntas-frequentes": {
    titulo: "Perguntas Frequentes",
    descricao: "Tire suas dúvidas sobre pagamento, entrega, qualidade e acompanhamento de pedidos.",
    faq: true,
  },
  privacidade: {
    titulo: "Política de Privacidade",
    descricao: "Como a Veigas Soccer coleta, usa e protege os seus dados.",
    paragrafos: [
      "A Veigas Soccer respeita a sua privacidade e trata os seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
      "Coletamos apenas os dados necessários para processar o seu pedido e entregar o seu produto: nome, e-mail, telefone e endereço de entrega.",
      "Os dados de pagamento são processados diretamente pela Yampi, em ambiente criptografado, e nunca ficam armazenados em nossos sistemas.",
      "Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins de marketing.",
      "Você pode solicitar a qualquer momento a correção ou exclusão dos seus dados pelo e-mail suporte@veigassoccer.com.br.",
    ],
  },
  "troca-e-devolucao": {
    titulo: "Política de Troca e Devolução",
    descricao: "Regras para troca ou devolução do seu pedido.",
    paragrafos: [
      "Você tem até 7 dias corridos, a partir da data de recebimento, para solicitar a troca ou devolução do produto, conforme o Código de Defesa do Consumidor.",
      "O produto deve estar sem sinais de uso, na embalagem original e acompanhado de todos os acessórios.",
      "Para iniciar uma solicitação, fale com nosso suporte pelo WhatsApp +55 (91) 99904-1093 ou pelo e-mail suporte@veigassoccer.com.br, informando o número do pedido.",
      "Após o recebimento e análise do produto devolvido, o reembolso é processado em até 7 dias úteis pelo mesmo meio de pagamento utilizado na compra.",
      "Produtos com defeito de fabricação têm garantia de 90 dias.",
    ],
  },
  "envio-e-prazo": {
    titulo: "Políticas de Envio e Prazo de Entrega",
    descricao: "Prazos, frete e rastreamento do seu pedido.",
    paragrafos: [
      "O frete é grátis para todo o Brasil, em qualquer valor de pedido.",
      "O prazo de entrega é de 20 a 30 dias úteis após a confirmação do pagamento, variando conforme a região de destino.",
      "Assim que o pedido for postado, você recebe o código de rastreio por e-mail e WhatsApp para acompanhar cada etapa da entrega.",
      "Trabalhamos com envio direto do fornecedor (dropshipping), o que garante estoque sempre disponível e os melhores preços.",
      "Em caso de atraso ou extravio, nosso suporte acompanha a ocorrência até a solução definitiva.",
    ],
  },
};

export const Route = createFileRoute("/pagina/$slug")({
  beforeLoad: ({ params }) => {
    if (!PAGINAS[params.slug]) throw notFound();
  },
  head: ({ params }) => {
    const pagina = PAGINAS[params.slug];
    return {
      meta: [
        { title: `${pagina?.titulo ?? "Página"} — Veigas Soccer` },
        { name: "description", content: pagina?.descricao ?? "" },
        { property: "og:title", content: `${pagina?.titulo ?? "Página"} — Veigas Soccer` },
        { property: "og:description", content: pagina?.descricao ?? "" },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: PaginaInstitucionalPage,
});

function PaginaInstitucionalPage() {
  const { slug } = Route.useParams();
  const pagina = PAGINAS[slug];
  if (!pagina) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-10 text-center">
        <nav aria-label="Migalha de pão" className="text-xs font-bold tracking-widest uppercase">
          <Link to="/" className="text-muted-foreground transition-colors hover:text-primary">
            Lar
          </Link>
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="text-primary">{pagina.titulo}</span>
        </nav>
        <h1 className="mt-3 font-display text-4xl tracking-wide uppercase sm:text-5xl">
          {pagina.titulo}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">{pagina.descricao}</p>
      </header>

      {pagina.faq ? (
        <FAQ />
      ) : (
        <div className="space-y-5">
          {pagina.paragrafos?.map((p) => (
            <p key={p.slice(0, 24)} className="text-sm leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
