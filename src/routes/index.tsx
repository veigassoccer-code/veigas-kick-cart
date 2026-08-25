import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CATEGORIAS, type Produto } from "@/lib/products";
import { ProductCard } from "@/components/store/ProductCard";
import { FAQ } from "@/components/store/FAQ";
import heroBoot from "@/assets/hero-boot.jpg";
import catCampo from "@/assets/cat-campo.jpg";
import catFutsal from "@/assets/cat-futsal.jpg";
import catSociety from "@/assets/cat-society.jpg";
import social1 from "@/assets/social-1.jpg";
import social2 from "@/assets/social-2.jpg";
import social3 from "@/assets/social-3.jpg";
import social4 from "@/assets/social-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veigas Soccer — Chuteiras Originais a partir de R$ 419,90" },
      {
        name: "description",
        content:
          "Seja bem-vindo à Veigas Soccer. Chuteiras de campo, futsal e society das melhores marcas, 100% originais, com frete grátis para todo o Brasil.",
      },
      { property: "og:title", content: "Veigas Soccer — Chuteiras Originais" },
      {
        property: "og:description",
        content:
          "Chuteiras Nike, Adidas, Puma, Mizuno e Joma com os melhores preços e frete grátis para todo o Brasil.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const CATEGORIA_IMAGENS = { campo: catCampo, futsal: catFutsal, society: catSociety } as const;

function useDestaques() {
  return useQuery({
    queryKey: ["produtos", "destaques"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("destaque", true)
        .order("preco", { ascending: false });
      if (error) throw error;
      return data as unknown as Produto[];
    },
  });
}

function HeroSection() {
  return (
    <section className="dark relative overflow-hidden bg-black">
      <img
        src={heroBoot}
        alt="Chuteira profissional Veigas Soccer em destaque"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="hero-gradient absolute inset-0" />
      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 pt-24 pb-14">
        <p className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
          A loja de quem vive futebol
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[1.02] tracking-wide uppercase sm:text-6xl md:text-7xl">
          Sejam muito
          <br />
          bem-vindos à
          <br />
          <span className="text-primary">Veigas Soccer</span>
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Chuteiras originais das maiores marcas do mundo, com os melhores preços e frete grátis
          para todo o Brasil.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/catalogo"
            className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-extrabold tracking-wider text-primary-foreground uppercase transition-opacity hover:opacity-90"
          >
            Ver catálogo <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#destaques"
            className="inline-flex h-12 items-center rounded-md border border-foreground/25 px-6 text-sm font-extrabold tracking-wider uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Mais vendidas
          </a>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
            Escolha seu jogo
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide uppercase sm:text-4xl">
            Categorias
          </h2>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {CATEGORIAS.map((cat) => (
          <Link
            key={cat.value}
            to="/catalogo"
            search={{ categoria: cat.value }}
            className="group dark relative aspect-[3/4] overflow-hidden rounded-xl border border-border bg-black sm:aspect-[4/5]"
          >
            <img
              src={CATEGORIA_IMAGENS[cat.value]}
              alt={`Chuteiras de ${cat.label}`}
              loading="lazy"
              width={768}
              height={1024}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-5">
              <h3 className="font-display text-3xl tracking-wide uppercase">{cat.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{cat.tagline}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-primary uppercase">
                Explorar <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function DestaquesSection() {
  const { data: produtos, isLoading } = useDestaques();

  return (
    <section id="destaques" className="scroll-mt-24 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
              Destaques
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-wide uppercase sm:text-4xl">
              Mais vendidas
            </h2>
          </div>
          <Link
            to="/catalogo"
            className="hidden items-center gap-1.5 text-xs font-extrabold tracking-wider text-primary uppercase sm:inline-flex"
          >
            Ver todas <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4">
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] w-60 shrink-0 animate-pulse rounded-xl bg-surface"
              />
            ))}
          </div>
        ) : (
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {(produtos ?? []).map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
        <div className="mt-8 sm:hidden">
          <Link
            to="/catalogo"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-primary text-sm font-extrabold tracking-wider text-primary uppercase"
          >
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BenefitsBar() {
  const items = [
    { Icon: Truck, titulo: "Frete grátis", texto: "Para todo o Brasil" },
    { Icon: ShieldCheck, titulo: "Compra segura", texto: "Checkout Yampi" },
    { Icon: BadgeCheck, titulo: "100% original", texto: "Com nota fiscal" },
  ];
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
        {items.map(({ Icon, titulo, texto }) => (
          <div key={titulo} className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Icon className="h-5 w-5 text-primary" />
            </span>
            <div>
              <p className="text-sm font-extrabold tracking-wider uppercase">{titulo}</p>
              <p className="text-xs text-muted-foreground">{texto}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SocialProofSection() {
  const fotos = [
    { src: social1, alt: "Cliente amarrando sua chuteira vermelha no campo" },
    { src: social2, alt: "Cliente dominando a bola com chuteira society" },
    { src: social3, alt: "Cliente jogando futsal com tênis vermelho" },
    { src: social4, alt: "Grupo de amigos com chuteiras Veigas Soccer após a partida" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl tracking-wide uppercase sm:text-4xl">
          Quem joga, <span className="text-primary">sabe.</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Confira quem já garantiu a ferramenta com a gente.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {fotos.map((foto) => (
          <div
            key={foto.src}
            className="overflow-hidden rounded-xl border border-border transition-colors hover:border-primary"
          >
            <img
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              width={768}
              height={1024}
              className="aspect-[3/4] h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="border-t border-border bg-card">
      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="mb-8 text-center">
          <p className="text-xs font-extrabold tracking-[0.3em] text-primary uppercase">
            Tire suas dúvidas
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-wide uppercase sm:text-4xl">
            Perguntas frequentes
          </h2>
        </div>
        <FAQ />
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsBar />
      <CategoriesSection />
      <DestaquesSection />
      <SocialProofSection />
      <FAQSection />
    </>
  );
}
