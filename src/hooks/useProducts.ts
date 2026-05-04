import { useQuery } from "@tanstack/react-query";
import { listProducts } from "@/src/services/products/productService";
import { useUserStore } from "@/src/store/userStore";

export const useProducts = () => {
  const token: string | null = useUserStore((s) => s.token);

  return useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      if (!token) throw new Error("Sem token");

      return listProducts(token, "");
    },

    enabled: !!token,

    staleTime: 1000 * 60 * 5,
  });
};