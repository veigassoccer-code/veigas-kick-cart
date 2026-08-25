import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    pergunta: "Quais são as formas de pagamento?",
    resposta:
      "Aceitamos Pix (com aprovação imediata), cartão de crédito em até 12x e boleto bancário. Todo o pagamento é processado com segurança pela Yampi.",
  },
  {
    pergunta: "O site é seguro?",
    resposta:
      "Sim. Nossa loja usa criptografia SSL de ponta a ponta e o checkout é processado pela Yampi, uma das plataformas de pagamento mais seguras do Brasil. Seus dados nunca ficam expostos.",
  },
  {
    pergunta: "Em quanto tempo minha chuteira chega?",
    resposta:
      "O prazo de entrega é de 20 a 30 dias úteis após a confirmação do pagamento, dependendo da sua região. E o melhor: o frete é grátis para todo o Brasil.",
  },
  {
    pergunta: "Qual a qualidade das chuteiras?",
    resposta:
      "Trabalhamos apenas com chuteiras padrão premium, com acabamento de alto nível, materiais resistentes e conforto profissional. Todos os pedidos acompanham garantia.",
  },
  {
    pergunta: "Como acompanho o meu pedido?",
    resposta:
      "Assim que o pedido for enviado, você recebe o código de rastreio por e-mail e WhatsApp. Qualquer dúvida, nosso suporte atende de segunda a sexta, das 8h às 18h.",
  },
];

export function FAQ() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {FAQS.map((faq, i) => (
        <AccordionItem key={faq.pergunta} value={`faq-${i}`} className="border-border">
          <AccordionTrigger className="text-left text-sm font-bold tracking-wide uppercase hover:text-primary">
            {faq.pergunta}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {faq.resposta}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
