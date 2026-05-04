export interface Product {
  codigo: string;
  codigo_categoria: string;
  descricao: string;
  imagem: string;
  nome: string;
  preco: string;
  referencia: string;
}

export interface CardProps {
  isFavorite: boolean;
  onClick: () => void;
  onToggleFavorite: () => void;
  product: Product;
}