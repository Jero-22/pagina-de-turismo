import Link from "next/link";
import { Catalog } from "@/components/Catalog";

const benefits = [
  { icon: "✈️", title: "Vuelos incluidos", text: "Tarifas negociadas con equipaje despachado." },
  { icon: "🏨", title: "Hoteles seleccionados", text: "Alojamientos 4★ céntricos y bien puntuados." },
  { icon: "🗺️", title: "Excursiones guiadas", text: "Guías locales en español en cada destino." },
  { icon: "🛟", title: "Asistencia 24/7", text: "Soporte durante todo el viaje, todos los días." },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <p className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm">
            Salidas garantizadas todo el año
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Tu próximo viaje, con todo resuelto
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Paquetes a más de 30 destinos con vuelos, hoteles y excursiones incluidas. Elegí, armá tu carrito y
            reservá en minutos.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#catalogo"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-blue-50"
            >
              Ver viajes
            </Link>
            <Link
              href="/carrito"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Mi carrito
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="flex gap-3">
              <span className="text-2xl" aria-hidden>
                {benefit.icon}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{benefit.title}</p>
                <p className="text-sm text-slate-600">{benefit.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Catalog />
    </>
  );
}
