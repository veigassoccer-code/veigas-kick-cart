import { Link } from "@tanstack/react-router";
import { formatParcelas, formatPreco, type Produto } from "@/lib/products";

export function ProductCard({ produto }: { produto: Produto }) {
  return (
    <Link
      to="/produto/$id"
      params={{ id: produto.id }}
      className="group flex w-60 shrink-0 snap-start flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary sm:w-full"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={produto.imagem_url}
          alt={produto.nome}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {produto.destaque && (
          <span className="absolute top-3 left-3 rounded bg-primary px-2 py-1 text-[10px] font-extrabold tracking-wider text-primary-foreground uppercase">
            Mais vendida
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase">
          {produto.marca}
        </span>
        <h3 className="line-clamp-2 min-h-10 text-sm leading-snug font-bold text-card-foreground">
          {produto.nome}
        </h3>
        <div className="mt-auto pt-2">
          <p className="text-lg font-extrabold text-primary">{formatPreco(produto.preco)}</p>
          <p className="text-xs text-muted-foreground">ou {formatParcelas(produto.preco)}</p>
          <span className="mt-3 inline-flex h-9 w-full items-center justify-center rounded-md bg-primary text-xs font-extrabold tracking-wider text-primary-foreground uppercase transition-opacity group-hover:opacity-90">
            Comprar
          </span>
        </div>
      </div>
    </Link>
  );
}
