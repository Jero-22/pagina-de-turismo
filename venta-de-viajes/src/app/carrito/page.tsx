"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { lines, total, removeItem, setTravelers } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Tu carrito</h1>

      {lines.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">Todavía no agregaste viajes.</p>
          <Link
            href="/#catalogo"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Explorar viajes
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <ul className="space-y-4" data-testid="cart-items">
            {lines.map((line) => (
              <li
                key={line.slug}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
              >
                <div
                  className={`flex h-20 w-full items-center justify-center rounded-xl bg-gradient-to-br ${line.trip.gradient} text-3xl sm:w-28`}
                >
                  <span aria-hidden>{line.trip.emoji}</span>
                </div>
                <div className="flex-1">
                  <Link href={`/viajes/${line.slug}`} className="text-lg font-semibold text-slate-900 hover:underline">
                    {line.trip.title}
                  </Link>
                  <p className="text-sm text-slate-500">
                    {line.trip.city}, {line.trip.country} · {line.trip.nights} noches
                  </p>
                  <p className="text-sm text-slate-500">{formatPrice(line.trip.price)} por persona</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-slate-600">
                    Viajeros
                    <select
                      value={line.travelers}
                      onChange={(event) => setTravelers(line.slug, Number(event.target.value))}
                      className="ml-2 rounded-lg border border-slate-300 px-2 py-1 text-slate-900"
                    >
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                        <option key={count} value={count}>
                          {count}
                        </option>
                      ))}
                    </select>
                  </label>
                  <span className="w-24 text-right font-semibold text-slate-900">{formatPrice(line.subtotal)}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(line.slug)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Resumen</h2>
            <dl className="mt-4 space-y-2 text-sm text-slate-600">
              {lines.map((line) => (
                <div key={line.slug} className="flex justify-between gap-4">
                  <dt>
                    {line.trip.title} × {line.travelers}
                  </dt>
                  <dd>{formatPrice(line.subtotal)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span data-testid="cart-total">{formatPrice(total)}</span>
            </div>
            <Link
              href="/checkout"
              data-testid="go-to-checkout"
              className="mt-6 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white hover:bg-blue-700"
            >
              Continuar al pago
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
