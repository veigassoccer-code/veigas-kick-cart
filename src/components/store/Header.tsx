import { Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MARCAS, CATEGORIAS } from "@/lib/products";
import logoAsset from "@/assets/veigas-soccer-logo.jpg.asset.json";

const TOPBAR_TEXT =
  "ENCONTRE AQUI CHUTEIRAS A PARTIR DE R$ 419,90 | FRETE GRÁTIS PARA TODO O BRASIL";

function DrawerLink({
  to,
  search,
  children,
  className = "",
}: {
  to: string;
  search?: Record<string, string>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SheetClose asChild>
      <Link
        to={to}
        search={search ?? {}}
        className={`block px-5 py-3.5 text-sm font-extrabold tracking-wider text-primary uppercase transition-colors hover:bg-accent ${className}`}
      >
        {children}
      </Link>
    </SheetClose>
  );
}

function MarcaItem({ marca }: { marca: string }) {
  const [aberta, setAberta] = useState(false);

  // Joma leva direto para Futsal
  if (marca === "Joma") {
    return (
      <DrawerLink to="/catalogo" search={{ marca, categoria: "futsal" }}>
        {marca}
      </DrawerLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setAberta((v) => !v)}
        aria-expanded={aberta}
        className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-extrabold tracking-wider text-primary uppercase transition-colors hover:bg-accent"
      >
        {marca}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${aberta ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          aberta ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {CATEGORIAS.map((cat) => (
            <SheetClose key={cat.value} asChild>
              <Link
                to="/catalogo"
                search={{ marca, categoria: cat.value }}
                className="block border-t border-foreground/10 px-8 py-3 text-xs font-bold tracking-wider text-foreground uppercase transition-colors hover:text-primary"
              >
                {cat.label}
              </Link>
            </SheetClose>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Faixa de aviso promocional */}
      <div className="overflow-hidden bg-primary py-1.5">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[11px] font-bold tracking-widest text-primary-foreground uppercase"
            >
              {Array(4).fill(TOPBAR_TEXT).join("  •  ")}
            </span>
          ))}
        </div>
      </div>

      {/* Cabeçalho principal */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4">
          {/* Menu hambúrguer */}
          <Sheet>
            <SheetTrigger
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-primary"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
<SheetContent
              side="left"
              className="w-[85vw] max-w-sm border-border bg-background p-0 [&>button]:hidden"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              {/* Faixa vermelha superior */}
              <div className="flex items-center justify-between bg-primary px-5 py-4">
                <span className="font-display text-lg tracking-widest text-primary-foreground uppercase">
                  Menu
                </span>
                <SheetClose
                  aria-label="Fechar menu"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground transition-opacity hover:opacity-80"
                >
                  <X className="h-5 w-5" />
                </SheetClose>
              </div>

              <nav className="flex flex-col divide-y divide-foreground/10" aria-label="Menu">
                <DrawerLink to="/">Início</DrawerLink>
                <DrawerLink to="/catalogo">Catálogo</DrawerLink>

                {MARCAS.map((marca) => (
                  <MarcaItem key={marca} marca={marca} />
                ))}

                <DrawerLink to="/contato">Contato</DrawerLink>

                <button
                  type="button"
                  onClick={() => toast.info("Sua lista de desejos está vazia.")}
                  className="flex items-center gap-3 px-5 py-3.5 text-left text-sm font-extrabold tracking-wider text-primary uppercase transition-colors hover:bg-accent"
                >
                  <Heart className="h-4 w-4" /> Lista de desejos
                </button>
                <button
                  type="button"
                  onClick={() => toast.info("Em breve: área do cliente.")}
                  className="flex items-center gap-3 px-5 py-3.5 text-left text-sm font-extrabold tracking-wider text-primary uppercase transition-colors hover:bg-accent"
                >
                  <User className="h-4 w-4" /> Entrar / Cadastrar
                </button>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo centralizada */}
          <Link
            to="/"
            className="flex items-center justify-center gap-2 justify-self-center"
            aria-label="Veigas Soccer — Início"
          >
            <img src={logoAsset.url} alt="" width={512} height={512} className="h-9 w-9 object-contain" />
            <span className="font-display text-xl tracking-wide text-foreground sm:text-2xl">
              VEIGAS <span className="text-primary">SOCCER</span>
            </span>
          </Link>

          {/* Ações à direita */}
          <div className="flex items-center gap-1 justify-self-end">
            <Link
              to="/catalogo"
              aria-label="Pesquisar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-primary"
            >
              <Search className="h-5 w-5" />
            </Link>
            <button
              type="button"
              aria-label="Sacola de compras"
              onClick={() => toast.info("Sua sacola está vazia.")}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0.5 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-primary-foreground">
                0
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
