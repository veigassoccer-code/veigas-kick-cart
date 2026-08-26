import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, ChevronLeft, ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  CATEGORIAS,
  TAMANHOS_PADRAO,
  WHATSAPP_LOJA,
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
  const [fotoSel, setFotoSel] = useState(0);

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

  const { data: variacoes } = useQuery({
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
  // Dropshipping: estoque ilimitado — qualquer tamanho da grade libera a compra
  const podeComprar = tamanhoSel != null;

  const comprar = () => {
    if (!podeComprar || !produto) return;
    const link = selecionada?.link_yampi?.trim();
    const destino =
      link && link.length > 0
        ? link
        : `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(
            `Olá! Quero comprar a ${produto.nome} (tamanho ${tamanhoSel}).`,
          )}`;
    window.open(destino, "_blank", "noopener,noreferrer");
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

  const fotos = getImagens(produto);
  const fotoAtual = Math.min(fotoSel, fotos.length - 1);
  const marca = getMarca(produto.nome);
  const categoria = getCategoria(produto.nome);
  const categoriaLabel = CATEGORIAS.find((c) => c.value === categoria)?.label;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        to="/catalogo"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Galeria de fotos */}
        <div className="min-w-0">
          <div className="relative w-full max-w-full overflow-hidden rounded-xl border border-border bg-white">
            <img
              key={fotos[fotoAtual]}
              src={fotos[fotoAtual]}
              alt={`${produto.nome} — foto ${fotoAtual + 1} de ${fotos.length}`}
              width={1024}
              height={1024}
              className="aspect-square h-full w-full object-contain p-4"
            />
            {fotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setFotoSel((fotoAtual - 1 + fotos.length) % fotos.length)}
                  aria-label="Foto anterior"
                  className="absolute top-1/2 left-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setFotoSel((fotoAtual + 1) % fotos.length)}
                  aria-label="Próxima foto"
                  className="absolute top-1/2 right-2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <span className="absolute right-3 bottom-3 rounded bg-background/70 px-2 py-0.5 text-[10px] font-bold text-foreground backdrop-blur">
                  {fotoAtual + 1}/{fotos.length}
                </span>
              </>
            )}
          </div>
          {fotos.length > 1 && (
            <div className="no-scrollbar mt-3 scroll-smooth overflow-x-auto pb-2">
              <div className="mx-auto flex w-max gap-2">
                {fotos.map((foto, i) => (
                  <button
                    key={foto + i}
                    type="button"
                    onClick={() => setFotoSel(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === fotoAtual}
                    className={cn(
                      "h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-colors",
                      i === fotoAtual ? "border-primary" : "border-border hover:border-primary/60",
                    )}
                  >
                    <img
                      src={foto}
                      alt=""
                      loading="lazy"
                      width={160}
                      height={160}
                      className="h-full w-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {marca && (
              <span className="rounded bg-primary/15 px-2.5 py-1 text-[10px] font-extrabold tracking-widest text-primary uppercase">
                {marca}
              </span>
            )}
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

          {/* Seleção de tamanho — dropshipping: grade completa sempre disponível */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold tracking-widest uppercase">
                Selecione o tamanho
              </h2>
              {tamanhoSel != null && (
                <span className="text-xs font-semibold text-primary">Em estoque</span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {TAMANHOS_PADRAO.map((tamanho) => {
                const ativo = tamanhoSel === tamanho;
                return (
                  <button
                    key={tamanho}
                    type="button"
                    onClick={() => setTamanhoSel(tamanho)}
                    aria-label={`Tamanho ${tamanho}`}
                    aria-pressed={ativo}
                    className={cn(
                      "h-12 rounded-lg border text-sm font-extrabold transition-all",
                      ativo
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_16px_-2px_var(--color-primary)]"
                        : "border-border bg-card text-foreground hover:border-primary",
                    )}
                  >
                    {tamanho}
                  </button>
                );
              })}
            </div>
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
            {podeComprar && !selecionada?.link_yampi?.trim()
              ? "Você será atendido pelo WhatsApp para finalizar a compra."
              : "Você será redirecionado para o checkout seguro."}
          </p>

          <ul className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
            <li className="flex items-center gap-3">
              <Truck className="h-5 w-5 shrink-0 text-primary" />
              <span className="font-semibold text-foreground">
                Frete grátis para todo o Brasil
              </span>
            </li>
            <li className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
              <span className="font-semibold text-foreground">
                Produto 100% original com nota fiscal
              </span>
            </li>
            <li className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
              <span className="font-semibold text-foreground">Pagamento seguro via Yampi</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
