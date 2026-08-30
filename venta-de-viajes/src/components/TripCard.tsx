import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { Trip } from "@/data/trips";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <Link
      href={`/viajes/${trip.slug}`}
      data-testid="trip-card"
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`flex h-40 items-center justify-center bg-gradient-to-br ${trip.gradient} text-5xl`}>
        <span aria-hidden>{trip.emoji}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
          <span>
            {trip.city}, {trip.country}
          </span>
          <span>★ {trip.rating.toFixed(1)}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700">{trip.title}</h3>
        <p className="flex-1 text-sm text-slate-600">{trip.summary}</p>
        <div className="mt-2 flex items-end justify-between">
          <span className="text-sm text-slate-500">{trip.nights} noches</span>
          <span className="text-xl font-semibold text-slate-900">
            {formatPrice(trip.price)}
            <span className="ml-1 text-xs font-normal text-slate-500">/ persona</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
