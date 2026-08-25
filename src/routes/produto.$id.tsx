import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronLeft, ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORIAS,
  TAMANHOS_PADRAO,
  formatParcelas,
  formatPreco,
  getCategoria,
  getImagens,
  getMarca,
  type Produto,
  type Variacao,
} from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produto/$id")({
  head: () => ({
    meta: [
      { title: "Produto — Veigas Soccer" },
      {
        name: "description",
        content: "Escolha o tamanho e garanta sua chuteira original com frete grátis.",
      },
      { property: "og:title", content: "Produto — Veigas Soccer" },
      {
        property: "og:description",
        content: "Escolha o tamanho e garanta sua chuteira original com frete grátis.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProdutoPage,
});

function ProdutoPage() {
  const { id } = Route.useParams();
  const [tamanhoSel, setTamanhoSel] = useState<number | null>(null);

  const { data: produto, isLoading: carregandoProduto } = useQuery({
    queryKey: ["produto", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as unknown as Produto;
    },
  });

  const { data: variacoes, isLoading: carregandoVariacoes } = useQuery({
    queryKey: ["variacoes", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("variacoes")
        .select("*")
        .eq("produto_id", id);
      if (error) throw error;
      return data as unknown as Variacao[];
    },
  });

  const mapaVariacoes = new Map((variacoes ?? []).map((v) => [v.tamanho, v]));
  const selecionada = tamanhoSel != null ? mapaVariacoes.get(tamanhoSel) : undefined;
  const podeComprar = selecionada != null && selecionada.estoque > 0;

  const comprar = () => {
    if (podeComprar && selecionada) {
      window.open(selecionada.link_yampi, "_blank", "noopener,noreferrer");
    }
  };

  if (carregandoProduto) {
    return (
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-xl bg-surface" />
        <div className="space-y-4">
          <div className="h-6 w-1/3 animate-pulse rounded bg-surface" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-surface" />
          <div className="h-8 w-1/2 animate-pulse rounded bg-surface" />
        </div>
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-3xl tracking-wide uppercase">Produto não encontrado</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Este produto pode ter sido removido do catálogo.
        </p>
        <Link
          to="/catalogo"
          className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-6 text-xs font-extrabold tracking-wider text-primary-foreground uppercase"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const categoriaLabel = CATEGORIAS.find((c) => c.value === produto.categoria)?.label;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/catalogo"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-border bg-surface">
          <img
            src={produto.imagem_url}
            alt={produto.nome}
            width={1024}
            height={1024}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-primary/15 px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-primary uppercase">
              {produto.marca}
            </span>
            {categoriaLabel && (
              <span className="rounded bg-secondary px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-secondary-foreground uppercase">
                {categoriaLabel}
              </span>
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl leading-tight tracking-wide uppercase sm:text-4xl">
            {produto.nome}
          </h1>

          <div className="mt-4">
            <p className="text-3xl font-extrabold text-primary">{formatPreco(produto.preco)}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              ou {formatParcelas(produto.preco)} sem juros
            </p>
          </div>

          {/* Seleção de tamanho */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold tracking-widest uppercase">
                Selecione o tamanho
              </h2>
              {selecionada && selecionada.estoque > 0 && (
                <span className="text-xs font-semibold text-primary">
                  {selecionada.estoque <= 3
                    ? `Últimas ${selecionada.estoque} unidades!`
                    : "Em estoque"}
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {TAMANHOS_PADRAO.map((tamanho) => {
                const variacao = mapaVariacoes.get(tamanho);
                const semEstoque = !variacao || variacao.estoque <= 0;
                const ativo = tamanhoSel === tamanho;
                return (
                  <button
                    key={tamanho}
                    type="button"
                    disabled={semEstoque || carregandoVariacoes}
                    onClick={() => setTamanhoSel(tamanho)}
                    aria-label={`Tamanho ${tamanho}${semEstoque ? " — esgotado" : ""}`}
                    className={cn(
                      "h-12 rounded-md border text-sm font-extrabold transition-colors",
                      ativo
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary",
                      semEstoque &&
                        "cursor-not-allowed border-border/50 text-muted-foreground/40 line-through hover:border-border/50",
                    )}
                  >
                    {tamanho}
                  </button>
                );
              })}
            </div>
            {tamanhoSel != null && !podeComprar && (
              <p className="mt-2 text-xs text-muted-foreground">
                Tamanho esgotado. Escolha outra numeração.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={comprar}
            disabled={!podeComprar}
            className={cn(
              "mt-8 h-14 w-full rounded-md text-sm font-extrabold tracking-[0.2em] uppercase transition-all",
              podeComprar
                ? "animate-pulse-glow bg-primary text-primary-foreground hover:opacity-90"
                : "cursor-not-allowed bg-secondary text-muted-foreground",
            )}
          >
            {podeComprar ? "Comprar agora" : "Selecione um tamanho"}
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Você será redirecionado para o checkout seguro.
          </p>

          <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
            <li className="flex items-center gap-3">
              <Truck className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">Frete grátis para todo o Brasil</span>
            </li>
            <li className="flex items-center gap-3">
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">
                Produto 100% original com nota fiscal
              </span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
              <span className="text-muted-foreground">Pagamento seguro via Yampi</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
