const BASE_URL =
  "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/produtos";

export const listProducts: (token: string, search?: string) => Promise<any> = async (
  token: string,
  search?: string
) => {
  const res: Response = await fetch(`${BASE_URL}/listar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome_produto: search ?? "",
      codigo_produto: search ?? "",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Erro ao buscar produtos");
  }

  return data;
};

export const filterProducts: (token: string, body: {
    nome_produto?: string;
    codigo_produto?: string;
}) => Promise<any> = async (
  token: string,
  body: { nome_produto?: string; codigo_produto?: string }
) => {
  const res: Response = await fetch(`${BASE_URL}/listar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      nome_produto: body?.nome_produto ?? "",
      codigo_produto: body?.codigo_produto ?? "",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Erro ao filtrar produtos");
  }

  return data;
};