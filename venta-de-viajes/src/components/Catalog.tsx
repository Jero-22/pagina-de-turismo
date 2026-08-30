"use client";

import { useMemo, useState } from "react";
import { TripCard } from "@/components/TripCard";
import { continents, trips, type Continent } from "@/data/trips";
import { formatPrice } from "@/lib/format";

type SortKey = "recomendado" | "precio-asc" | "precio-desc" | "duracion";

const PRICE_STEP = 50;
const MAX_PRICE = Math.ceil(Math.max(...trips.map((trip) => trip.price)) / PRICE_STEP) * PRICE_STEP;

export function Catalog() {
  const [query, setQuery] = useState("");
  const [continent, setContinent] = useState<Continent | "todos">("todos");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState<SortKey>("recomendado");

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = trips.filter((trip) => {
      const matchesQuery =
        normalized.length === 0 ||
        [trip.title, trip.city, trip.country, trip.summary].some((field) =>
          field.toLowerCase().includes(normalized),
        );
      const matchesContinent = continent === "todos" || trip.continent === continent;
      return matchesQuery && matchesContinent && trip.price <= maxPrice;
    });

    switch (sort) {
      case "precio-asc":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "precio-desc":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "duracion":
        return [...filtered].sort((a, b) => b.nights - a.nights);
      default:
        return [...filtered].sort((a, b) => b.rating - a.rating);
    }
  }, [query, continent, maxPrice, sort]);

  return (
    <section id="catalogo" className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-semibold text-slate-900">Nuestros viajes</h2>
        <p className="text-slate-600">Paquetes con vuelos, alojamiento y excursiones incluidas.</p>
      </div>

      <div className="mb-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 md:col-span-2">
          Buscar destino
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Japón, playa, Roma..."
            data-testid="search-input"
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900 outline-none focus:border-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Continente
          <select
            value={continent}
            onChange={(event) => setContinent(event.target.value as Continent | "todos")}
            data-testid="continent-select"
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="todos">Todos</option>
            {continents.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
          Ordenar por
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            data-testid="sort-select"
            className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="recomendado">Recomendados</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="duracion">Duración</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 md:col-span-4">
          Precio máximo por persona: {formatPrice(maxPrice)}
          <input
            type="range"
            min={500}
            max={MAX_PRICE}
            step={PRICE_STEP}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            data-testid="price-range"
            className="accent-blue-600"
          />
        </label>
      </div>

      <p className="mb-4 text-sm text-slate-500" data-testid="results-count">
        {results.length} {results.length === 1 ? "viaje encontrado" : "viajes encontrados"}
      </p>

      {results.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No encontramos viajes con esos filtros. Probá ampliar el presupuesto o cambiar el continente.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((trip) => (
            <TripCard key={trip.slug} trip={trip} />
          ))}
        </div>
      )}
    </section>
  );
}
