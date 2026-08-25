import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MARCAS, CATEGORIAS } from "@/lib/products";

const TOPBAR_TEXT =
  "ENCONTRE AQUI CHUTEIRAS A PARTIR DE R$ 419,90 | FRETE GRÁTIS PARA TODO O BRASIL";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Topbar promocional */}
      <div className="overflow-hidden bg-primary py-1.5" aria-hidden={false}>
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

      {/* Navegação principal */}
      <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link
            to="/"
            className="font-display text-2xl tracking-wide text-foreground"
            aria-label="Veigas Soccer — Início"
          >
            VEIGAS <span className="text-primary">SOCCER</span>
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Navegação principal">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-bold tracking-wider uppercase transition-colors hover:text-primary"
            >
              Início
            </Link>
            <Link
              to="/catalogo"
              activeProps={{ className: "text-primary" }}
              className="text-sm font-bold tracking-wider uppercase transition-colors hover:text-primary"
            >
              Catálogo
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-bold tracking-wider uppercase transition-colors outline-none hover:text-primary data-[state=open]:text-primary">
                Marcas <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="border-border bg-popover">
                {MARCAS.map((marca) => (
                  <DropdownMenuItem key={marca} asChild>
                    <Link
                      to="/catalogo"
                      search={{ marca }}
                      className="cursor-pointer font-semibold"
                    >
                      {marca}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/contato"
              activeProps={{ className: "text-primary" }}
              className="text-sm font-bold tracking-wider uppercase transition-colors hover:text-primary"
            >
              Contato
            </Link>
          </nav>

          {/* Mobile */}
          <Sheet>
            <SheetTrigger
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] border-border bg-background p-0">
              <SheetHeader className="border-b border-border p-5">
                <SheetTitle className="font-display text-xl tracking-wide text-foreground">
                  VEIGAS <span className="text-primary">SOCCER</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 p-4" aria-label="Menu móvel">
                <SheetTrigger asChild>
                  <Link
                    to="/"
                    className="rounded-md px-3 py-3 text-sm font-bold tracking-wider uppercase hover:bg-accent"
                  >
                    Início
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    to="/catalogo"
                    className="rounded-md px-3 py-3 text-sm font-bold tracking-wider uppercase hover:bg-accent"
                  >
                    Catálogo
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    to="/contato"
                    className="rounded-md px-3 py-3 text-sm font-bold tracking-wider uppercase hover:bg-accent"
                  >
                    Contato
                  </Link>
                </SheetTrigger>

                <p className="mt-5 px-3 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                  Marcas
                </p>
                {MARCAS.map((marca) => (
                  <SheetTrigger key={marca} asChild>
                    <Link
                      to="/catalogo"
                      search={{ marca }}
                      className="rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-accent"
                    >
                      {marca}
                    </Link>
                  </SheetTrigger>
                ))}

                <p className="mt-5 px-3 text-[11px] font-bold tracking-widest text-muted-foreground uppercase">
                  Categorias
                </p>
                {CATEGORIAS.map((cat) => (
                  <SheetTrigger key={cat.value} asChild>
                    <Link
                      to="/catalogo"
                      search={{ categoria: cat.value }}
                      className="rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-accent"
                    >
                      {cat.label}
                    </Link>
                  </SheetTrigger>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
