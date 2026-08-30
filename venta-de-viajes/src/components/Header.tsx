"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export function Header() {
  const { travelerCount } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          <span className="mr-2">🌍</span>Vuelta al Mundo
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/#catalogo" className="hover:text-slate-900">
            Viajes
          </Link>
          <Link
            href="/carrito"
            data-testid="cart-link"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            Carrito
            <span
              data-testid="cart-count"
              className="rounded-full bg-white px-2 text-xs font-semibold text-slate-900"
            >
              {travelerCount}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
