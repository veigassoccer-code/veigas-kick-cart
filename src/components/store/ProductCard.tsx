import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { formatParcelas, formatPreco, getImagens, getMarca, type Produto } from "@/lib/products";

export function ProductCard({ produto }: { produto: Produto }) {
  const navigate = useNavigate();
  const marca = getMarca(produto.nome);
  const imagem = getImagens(produto)[0] ?? produto.imagem_url;

  const irParaProduto = () =>
    navigate({ to: "/produto/$id", params: { id: produto.id } });

  return (
    <div className="group flex w-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary">
      {/* Foto em fundo claro com botões flutuantes */}
      <div className="relative aspect-square overflow-hidden bg-white">
        <Link
          to="/produto/$id"
          params={{ id: produto.id }}
          aria-label={produto.nome}
          className="block h-full w-full"
        >
          <img
            src={imagem}
            alt={produto.nome}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {produto.destaque && (
          <span className="absolute top-3 left-3 rounded bg-primary px-2 py-1 text-[10px] font-extrabold tracking-wider text-primary-foreground uppercase">
            Mais vendida
          </span>
        )}
        <button
          type="button"
          aria-label="Adicionar à lista de desejos"
          onClick={() => toast.success("Adicionado à lista de desejos!")}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-primary"
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Comprar agora"
          onClick={irParaProduto}
          className="absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
        >
          <ShoppingBag className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Nome e preço */}
      <Link
        to="/produto/$id"
        params={{ id: produto.id }}
        className="flex flex-1 flex-col gap-1 p-3 sm:p-4"
      >
        {marca && (
          <span className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase">
            {marca}
          </span>
        )}
        <h3 className="line-clamp-2 min-h-10 text-sm leading-snug font-bold text-card-foreground">
          {produto.nome}
        </h3>
        <div className="mt-auto pt-2">
          <p className="text-lg font-extrabold text-primary">{formatPreco(produto.preco)}</p>
          <p className="text-xs text-muted-foreground">ou {formatParcelas(produto.preco)}</p>
        </div>
      </Link>
    </div>
  );
}
