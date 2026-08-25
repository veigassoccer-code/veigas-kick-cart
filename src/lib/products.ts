export type Categoria = "campo" | "futsal" | "society";

export interface Produto {
  id: string;
  nome: string;
  marca: string;
  categoria: Categoria;
  preco: number;
  imagem_url: string;
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

export const TAMANHOS_PADRAO = [38, 39, 40, 41, 42];

export function formatPreco(valor: number): string {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatParcelas(valor: number, vezes = 12): string {
  return `${vezes}x de ${formatPreco(Number(valor) / vezes)}`;
}
