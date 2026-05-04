"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/src/store/userStore";
import { useProducts } from "@/src/hooks/useProducts";
import { useFavorites } from "@/src/hooks/useFavorites";
import { Card } from "@/src/components/card/card";
import { Modal } from "@/src/components/modal/modal";
import { Header } from "@/src/components/header/header";
import { Footer } from "@/src/components/footer/footer";
import { Loading } from "@/src/components/loading/loading";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Product } from "@/src/components/card/card.types";

type OrderType = "nome-asc" | "nome-desc" | "preco-asc" | "preco-desc";

export default function ProdutosPage() {
  const router: AppRouterInstance = useRouter();
  const getUser: () => void = useUserStore((store) => store.getUser);
  const token: string | null = useUserStore((store) => store.token);

  const [hydrated, setHydrated] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debounced, setDebounced] = useState<string>("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [order, setOrder] = useState<OrderType>("nome-asc");
  const [onlyFav, setOnlyFav] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const pageSize: number = 8;
  const { favorites, toggle } = useFavorites();
  const { data, isLoading } = useProducts();

  useEffect(() => {
    getUser();
    setHydrated(true);
  }, []);

  useEffect(() => {
    const time: NodeJS.Timeout = setTimeout(() => setDebounced(search), 350);
    return () => clearTimeout(time);
  }, [search]);

  useEffect(() => {
    if (hydrated && !token) router.replace("/login");
  }, [hydrated, token]);

  const baseData: Product[] = useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as Product[];
    if (Array.isArray((data)?.data)) return (data).data;
    if (Array.isArray((data)?.products)) return (data).products;
    return [];
  }, [data]);

  const processed: Product[] = useMemo(() => {
    let list: Product[] = [...baseData];

    if (debounced) {
      const s = debounced.toLowerCase();

      list = list.filter((p) =>
        p.nome?.toLowerCase().includes(s) ||
        p.codigo?.toString().includes(s)
      );
    }

    if (onlyFav) {
      list = list.filter((p) => favorites.includes(p.codigo));
    }

    switch (order) {
      case "preco-asc":
        list.sort((a, b) => Number(a.preco) - Number(b.preco));
        break;
      case "preco-desc":
        list.sort((a, b) => Number(b.preco) - Number(a.preco));
        break;
      case "nome-desc":
        list.sort((a, b) => b.nome.localeCompare(a.nome));
        break;
      default:
        list.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return list;
  }, [baseData, debounced, favorites, onlyFav, order]);

  const totalPages: number = Math.ceil(processed.length / pageSize);

  const paginated = processed.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (!hydrated) return null;
  if (!token) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex flex-1 min-h-0 flex-col" aria-label="Lista de produtos">
        <div className="flex flex-col flex-1 overflow-hidden">

          <section className="px-4 md:px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap" aria-label="Filtros de produtos">

            <div className="flex-1">
              <label htmlFor="search" className="sr-only">
                Buscar produtos
              </label>

              <input
                id="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Buscar..."
                className="border rounded w-full max-w-[180px] md:max-w-none md:w-[250px] px-2 py-1 text-xs md:text-base"
                aria-label="Buscar produtos por nome ou código"
              />
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex-1 md:flex-none">
                <label htmlFor="order" className="sr-only">
                  Ordenar produtos
                </label>

                <select
                  id="order"
                  value={order}
                  onChange={(e) => setOrder(e.target.value as OrderType)}
                  className="border p-2 rounded w-full text-sm"
                  aria-label="Ordenar produtos"
                >
                  <option value="nome-asc">A-Z</option>
                  <option value="nome-desc">Z-A</option>
                  <option value="preco-asc">Preço ↑</option>
                  <option value="preco-desc">Preço ↓</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded border">
                <label htmlFor="fav" className="flex items-center gap-2 cursor-pointer text-sm whitespace-nowrap">
                  <input
                    id="fav"
                    type="checkbox"
                    checked={onlyFav}
                    onChange={() => setOnlyFav(!onlyFav)}
                  />
                  Favoritos
                </label>
              </div>
            </div>
          </section>

          <section className="flex-1 overflow-y-auto px-4 md:px-6 pt-2 pb-6" aria-label="Lista de cards de produtos">

            {isLoading ? (
              <Loading message="Buscando produtos..." />
            ) : processed.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500">
                Nenhum produto encontrado
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {paginated.map((product) => (
                  <article key={product.codigo} data-testid="product-card">
                    <Card
                      product={product}
                      onClick={() => setSelected(product)}
                      isFavorite={favorites.includes(product.codigo)}
                      onToggleFavorite={() => toggle(product.codigo)}
                    />
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer
        page={page}
        totalPages={totalPages}
        onChangePage={setPage}
      />


      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <img
              src={selected.imagem}
              alt={`Imagem do produto ${selected.nome}`}
              className="w-full h-40 object-contain"
            />

            <h2 className="font-semibold mt-2">
              {selected.nome}
            </h2>

            <p className="text-sm text-gray-600">
              {selected.descricao}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}