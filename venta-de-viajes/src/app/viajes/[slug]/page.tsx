import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { getTrip, trips } from "@/data/trips";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) return { title: "Viaje no encontrado" };
  return { title: `${trip.title} | Vuelta al Mundo`, description: trip.summary };
}

export default async function TripPage({ params }: PageProps) {
  const { slug } = await params;
  const trip = getTrip(slug);
  if (!trip) notFound();

  return (
    <article>
      <div className={`bg-gradient-to-br ${trip.gradient}`}>
        <div className="mx-auto max-w-6xl px-4 py-20 text-white">
          <Link href="/#catalogo" className="text-sm text-white/80 hover:text-white">
            ← Volver a los viajes
          </Link>
          <p className="mt-6 text-5xl" aria-hidden>
            {trip.emoji}
          </p>
          <h1 className="mt-2 text-4xl font-bold">{trip.title}</h1>
          <p className="mt-2 text-white/90">
            {trip.city}, {trip.country} · {trip.nights} noches · ★ {trip.rating.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Sobre el viaje</h2>
            <p className="mt-3 text-slate-700">{trip.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Qué vas a hacer</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {trip.highlights.map((item) => (
                <li key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-700">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Incluye</h2>
            <ul className="mt-3 space-y-2 text-slate-700">
              {trip.includes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden>✔</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <AddToCart trip={trip} />
        </aside>
      </div>
    </article>
  );
}
