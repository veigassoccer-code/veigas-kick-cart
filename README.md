# Veigas Soccer Store

Crie uma e-commerce mobile-first completo e moderno para a loja "Veigas Soccer" utilizando a conexão com o Supabase.

1. Identidade Visual e Cores:
- Fundo dark/preto puro (#000000) com detalhes em Vermelho Vibrante (#FF0000) e texto em Branco (#FFFFFF).
- Estilo esportivo, moderno e premium de artigos de futebol.

2. Cabeçalho e Navegação:
- Topbar vermelha: "ENCONTRE AQUI CHUTEIRAS A PARTIR DE R$ 419,90 | FRETE GRÁTIS PARA TODO O BRASIL".
- Menu de navegação completo contendo: Início, Catálogo, Contato, Filtros por Marcas (Nike, Adidas, Puma, Mizuno, Joma).

3. Banner Principal e Destaques:
- Banner Hero de boas-vindas: "SEJAM MUITO BEM-VINDOS À VEIGAS SOCCER".
- Categorias divididas: CAMPO ("Potência no gramado"), FUTSAL ("Agilidade em cada toque"), SOCIETY ("Domine o Fut7").
- Seções de "DESTAQUES" / "Mais Vendidas".
- Seção de prova social: "QUEM JOGA, SABE. Confira quem já garantiu a ferramenta com a gente." com galeria de fotos.

4. Perguntas Frequentes (FAQ Accordion):
- "Quais são as formas de pagamento?"
- "O site é seguro?"
- "Em quanto tempo minha chuteira chega?"
- "As chuteiras são originais?"
- "Como acompanho o meu pedido?"

5. Rodapé (Footer):
- Informações de Suporte: "Atendimento de segunda a sexta, das 8h às 18h. Suporte via WhatsApp ou E-mail."
- Contato: "+55 (91) 99904-1093" e "suporte@veigassoccer.com.br"
- Ícones de redes sociais (Instagram, TikTok, WhatsApp) e seções sanfonadas: "Informações", "Links Rápidos" e "Assine nossa Newsletter".
- Copyright: "© Veigas Soccer. Todos os direitos reservados."

6. Integração com Banco de Dados (Supabase):
- Conecte os cards de produtos à tabela `produtos` para exibir foto (`imagem_url`), nome (`nome`) e preço (`preco`).
- Na página/modal do produto, carregue os tamanhos (38 ao 42) da tabela `variacoes` verificando o campo `estoque`.
- Desabilite tamanhos sem estoque.
- Ao selecionar um tamanho disponível e clicar no botão vermelho "COMPRAR AGORA", redirecione o cliente para o link armazenado no campo `link_yampi` correspondente àquela variação.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ca4234a4-9402-42af-b8c5-9365a0733275).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
