import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Vuelta al Mundo | Paquetes de viaje",
  description: "Comprá paquetes de viaje con vuelos, alojamiento y excursiones incluidas.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
              <p>Vuelta al Mundo — demo de e-commerce de viajes. Los pagos son simulados.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
