import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { PackageSearch } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIAS, MARCAS, type Produto } from "@/lib/products";
import { ProductCard } from "@/components/store/ProductCard";
import { cn } from "@/lib/utils";

type CatalogoSearch = {
  marca?: string;
  categoria?: string;
};

export const Route = createFileRoute("/catalogo")({
  validateSearch: (search: Record<string, unknown>): CatalogoSearch => ({
    ...(typeof search["marca"] === "string" ? { marca: search["marca"] as string } : {}),
    ...(typeof search["categoria"] === "string"
      ? { categoria: search["categoria"] as string }
      : {}),
  }),
  head: () => ({
    meta: [
      { title: "Catálogo — Veigas Soccer" },
      {
        name: "description",
        content:
          "Catálogo completo de chuteiras Nike, Adidas, Puma, Mizuno e Joma. Campo, futsal e society com frete grátis.",
      },
      { property: "og:title", content: "Catálogo — Veigas Soccer" },
      {
        property: "og:description",
        content: "Todas as chuteiras da Veigas Soccer em um só lugar.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: CatalogoPage,
});

function CatalogoPage() {
  const { marca, categoria } = Route.useSearch();

  const { data: produtos, isLoading, isError } = useQuery({
    queryKey: ["produtos", "catalogo"],
    queryFn: async () => {
      const { data, error } = await supabase.from("produtos").select("*");
      if (error) throw error;
      return data as unknown as Produto[];
    },
  });

  const produtosFiltrados = useMemo(() => {
    const termoMarca = marca?.toLowerCase().trim();
    const termoCategoria = categoria?.toLowerCase().trim();

    return (produtos ?? []).filter((produto) => {
      const nome = produto.nome.toLowerCase();
      const combinaMarca = !termoMarca || termoMarca === "todas" || nome.includes(termoMarca);
      const combinaCategoria =
        !termoCategoria || termoCategoria === "todas" || nome.includes(termoCategoria);

      return combinaMarca && combinaCategoria;
    });
  }, [produtos, marca, categoria]);

  const filtros = (m?: string, c?: string) => ({
    ...(m ? { marca: m } : {}),
    ...(c ? { categoria: c } : {}),
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <p className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
          Veigas Soccer
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-wide uppercase sm:text-5xl">
          Catálogo
        </h1>
      </header>

      {/* Filtros por marca */}
      <div className="mb-4">
        <p className="mb-3 text-[11px] font-extrabold tracking-widest text-muted-foreground uppercase">
          Marcas
        </p>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          <Link
            to="/catalogo"
            search={filtros(undefined, categoria)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold tracking-wider uppercase transition-colors",
              !marca
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            Todas
          </Link>
          {MARCAS.map((m) => (
            <Link
              key={m}
              to="/catalogo"
              search={filtros(m, categoria)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold tracking-wider uppercase transition-colors",
                marca === m
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {m}
            </Link>
          ))}
        </div>
      </div>

      {/* Filtros por categoria */}
      <div className="mb-8">
        <p className="mb-3 text-[11px] font-extrabold tracking-widest text-muted-foreground uppercase">
          Categorias
        </p>
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
          <Link
            to="/catalogo"
            search={filtros(marca, undefined)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold tracking-wider uppercase transition-colors",
              !categoria
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            Todas
          </Link>
          {CATEGORIAS.map((c) => (
            <Link
              key={c.value}
              to="/catalogo"
              search={filtros(marca, c.value)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-extrabold tracking-wider uppercase transition-colors",
                categoria === c.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Grade de produtos */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-surface" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-16 text-center">
          <PackageSearch className="h-10 w-10 text-muted-foreground" />
          <p className="max-w-sm text-sm text-muted-foreground">
            Não foi possível carregar o catálogo agora. Tente atualizar a página.
          </p>
        </div>
      ) : produtosFiltrados.length > 0 ? (
        <>
          <p className="mb-4 text-xs text-muted-foreground">
            {produtosFiltrados.length}{" "}
            {produtosFiltrados.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {produtosFiltrados.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-16 text-center">
          <PackageSearch className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Nenhum produto encontrado com esses filtros.
          </p>
          <Link
            to="/catalogo"
            className="rounded-md bg-primary px-5 py-2.5 text-xs font-extrabold tracking-wider text-primary-foreground uppercase"
          >
            Limpar filtros
          </Link>
        </div>
      )}
    </div>
  );
}
