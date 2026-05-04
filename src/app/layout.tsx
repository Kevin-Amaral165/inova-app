import "./globals.css";
import { Providers } from "./providers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Innovation Brindes",
    template: "%s | Innovation Brindes",
  },
  description:
    "Sistema de gestão de produtos e pedidos da Innovation Brindes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}