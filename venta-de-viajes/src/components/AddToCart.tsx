"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import type { Trip } from "@/data/trips";

export function AddToCart({ trip }: { trip: Trip }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [travelers, setTravelers] = useState(2);
  const [added, setAdded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">Desde</p>
      <p className="text-3xl font-semibold text-slate-900">
        {formatPrice(trip.price)}
        <span className="ml-1 text-sm font-normal text-slate-500">por persona</span>
      </p>

      <label className="mt-6 flex flex-col gap-1 text-sm font-medium text-slate-700">
        Viajeros
        <select
          value={travelers}
          onChange={(event) => setTravelers(Number(event.target.value))}
          data-testid="travelers-select"
          className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900 outline-none focus:border-blue-500"
        >
          {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>
              {count} {count === 1 ? "viajero" : "viajeros"}
            </option>
          ))}
        </select>
      </label>

      <p className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>Total estimado</span>
        <span className="text-lg font-semibold text-slate-900" data-testid="estimated-total">
          {formatPrice(trip.price * travelers)}
        </span>
      </p>

      <button
        type="button"
        data-testid="add-to-cart"
        onClick={() => {
          addItem(trip.slug, travelers);
          setAdded(true);
        }}
        className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Agregar al carrito
      </button>

      {added && (
        <button
          type="button"
          onClick={() => router.push("/carrito")}
          className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Ir al carrito
        </button>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Reserva sin cargo. Cancelación gratuita hasta 30 días antes de la salida.
      </p>
    </div>
  );
}
