export type Categoria = "campo" | "futsal" | "society";

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  imagem_url: string;
  imagens: string[];
  destaque: boolean;
}

export interface Variacao {
  id: string;
  produto_id: string;
  tamanho: number;
  estoque: number;
  link_yampi: string;
}

export const MARCAS = ["Nike", "Adidas", "Puma", "Mizuno", "Joma"] as const;

export const CATEGORIAS: { value: Categoria; label: string; tagline: string }[] = [
  { value: "campo", label: "Campo", tagline: "Potência no gramado" },
  { value: "futsal", label: "Futsal", tagline: "Agilidade em cada toque" },
  { value: "society", label: "Society", tagline: "Domine o Fut7" },
];

export const TAMANHOS_PADRAO = [36, 37, 38, 39, 40, 41, 42, 43];

export const WHATSAPP_LOJA = "5591999041093";

/** Marca e categoria são derivadas do nome do produto (busca por texto). */
export function getMarca(nome: string): string | null {
  const n = nome.toLowerCase();
  return MARCAS.find((m) => n.includes(m.toLowerCase())) ?? null;
}

export function getCategoria(nome: string): Categoria | null {
  const n = nome.toLowerCase();
  return CATEGORIAS.find((c) => n.includes(c.value))?.value ?? null;
}

/** Normaliza a galeria: garante ao menos a imagem principal. */
export function getImagens(produto: { imagem_url: string; imagens?: unknown }): string[] {
  const lista = Array.isArray(produto.imagens)
    ? produto.imagens.filter((u): u is string => typeof u === "string" && u.length > 0)
    : [];
  if (lista.length > 0) return lista;
  return produto.imagem_url ? [produto.imagem_url] : [];
}

export function formatPreco(valor: number): string {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatParcelas(valor: number, vezes = 12): string {
  return `${vezes}x de ${formatPreco(Number(valor) / vezes)}`;
}
