"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { readLastOrder, type Order } from "@/lib/order";

export default function ThankYouPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setOrder(readLastOrder());
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">No encontramos tu reserva</h1>
        <p className="mt-2 text-slate-600">Puede que ya hayas cerrado esta sesión de compra.</p>
        <Link
          href="/#catalogo"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Ver viajes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <p className="text-5xl" aria-hidden>
          🎉
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">¡Reserva confirmada!</h1>
        <p className="mt-2 text-slate-600">
          Gracias {order.fullName.split(" ")[0]}. Enviamos el detalle a {order.email}.
        </p>
        <p className="mt-6 inline-block rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
          Código de reserva: <span data-testid="order-reference">{order.reference}</span>
        </p>

        <dl className="mt-8 space-y-2 text-left text-sm text-slate-600">
          {order.items.map((item) => (
            <div key={item.title} className="flex justify-between gap-4">
              <dt>
                {item.title} × {item.travelers}
              </dt>
              <dd>{formatPrice(item.subtotal)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900">
          <span>Total pagado</span>
          <span>{formatPrice(order.total)}</span>
        </div>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
