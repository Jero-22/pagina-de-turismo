export type Continent = "América" | "Europa" | "Asia" | "África" | "Oceanía";

export type Trip = {
  slug: string;
  title: string;
  city: string;
  country: string;
  continent: Continent;
  nights: number;
  price: number;
  rating: number;
  gradient: string;
  emoji: string;
  summary: string;
  description: string;
  highlights: string[];
  includes: string[];
};

export const trips: Trip[] = [
  {
    slug: "bariloche-lagos-y-montanas",
    title: "Bariloche: lagos y montañas",
    city: "San Carlos de Bariloche",
    country: "Argentina",
    continent: "América",
    nights: 5,
    price: 890,
    rating: 4.7,
    gradient: "from-sky-500 to-emerald-500",
    emoji: "🏔️",
    summary: "Circuito Chico, Cerro Catedral y navegación por el Nahuel Huapi.",
    description:
      "Cinco noches entre bosques andino-patagónicos, lagos de agua turquesa y chocolaterías. Ideal para combinar trekking suave, gastronomía y paisajes de postal.",
    highlights: ["Circuito Chico en bicicleta", "Cerro Catedral", "Navegación a Isla Victoria", "Ruta del chocolate"],
    includes: ["Vuelos ida y vuelta", "Hotel 4★ con desayuno", "Traslados aeropuerto", "2 excursiones guiadas"],
  },
  {
    slug: "rio-de-janeiro-playa-y-samba",
    title: "Río de Janeiro: playa y samba",
    city: "Río de Janeiro",
    country: "Brasil",
    continent: "América",
    nights: 4,
    price: 740,
    rating: 4.5,
    gradient: "from-amber-400 to-rose-500",
    emoji: "🏖️",
    summary: "Copacabana, Pan de Azúcar y Cristo Redentor en cuatro noches.",
    description:
      "Una escapada corta a la ciudad maravillosa: mañanas de playa, tardes de mirador y noches de música en vivo en Lapa.",
    highlights: ["Cristo Redentor", "Pan de Azúcar en teleférico", "Escalera Selarón", "Noche de samba en Lapa"],
    includes: ["Vuelos ida y vuelta", "Hotel frente al mar", "Traslados", "City tour de día completo"],
  },
  {
    slug: "roma-y-la-costa-amalfitana",
    title: "Roma y la Costa Amalfitana",
    city: "Roma",
    country: "Italia",
    continent: "Europa",
    nights: 8,
    price: 2150,
    rating: 4.9,
    gradient: "from-orange-400 to-red-600",
    emoji: "🏛️",
    summary: "Historia milenaria y pueblos colgados sobre el Mediterráneo.",
    description:
      "Cuatro noches en Roma para recorrer el Coliseo, el Vaticano y el Trastevere, y cuatro más en Amalfi con excursiones a Positano, Capri y Pompeya.",
    highlights: ["Coliseo y Foro Romano", "Museos Vaticanos", "Positano y Capri", "Ruinas de Pompeya"],
    includes: ["Vuelos ida y vuelta", "8 noches en hoteles 4★", "Tren Roma–Nápoles", "Entradas sin fila"],
  },
  {
    slug: "islandia-auroras-boreales",
    title: "Islandia: auroras boreales",
    city: "Reikiavik",
    country: "Islandia",
    continent: "Europa",
    nights: 6,
    price: 2480,
    rating: 4.8,
    gradient: "from-indigo-500 to-cyan-400",
    emoji: "🌌",
    summary: "Círculo Dorado, glaciares y caza de auroras en 4x4.",
    description:
      "Seis noches de invierno islandés: cascadas congeladas, playas de arena negra, aguas termales y salidas nocturnas para ver la aurora boreal.",
    highlights: ["Círculo Dorado", "Laguna Azul", "Cuevas de hielo", "Salida nocturna de auroras"],
    includes: ["Vuelos ida y vuelta", "4x4 con seguro", "Alojamientos rurales", "Guía de auroras"],
  },
  {
    slug: "japon-esencial",
    title: "Japón esencial",
    city: "Tokio",
    country: "Japón",
    continent: "Asia",
    nights: 10,
    price: 3290,
    rating: 4.9,
    gradient: "from-pink-400 to-fuchsia-600",
    emoji: "🗼",
    summary: "Tokio, Kioto y Osaka con Japan Rail Pass incluido.",
    description:
      "Diez noches recorriendo el contraste entre la megaciudad y los templos milenarios, con tren bala entre destinos y una jornada en Nara.",
    highlights: ["Shibuya y Akihabara", "Fushimi Inari", "Templo Kiyomizu-dera", "Ciervos de Nara"],
    includes: ["Vuelos ida y vuelta", "Japan Rail Pass 7 días", "Hoteles céntricos", "Ryokan una noche"],
  },
  {
    slug: "tailandia-de-norte-a-sur",
    title: "Tailandia de norte a sur",
    city: "Bangkok",
    country: "Tailandia",
    continent: "Asia",
    nights: 12,
    price: 2090,
    rating: 4.6,
    gradient: "from-lime-400 to-teal-600",
    emoji: "🛕",
    summary: "Bangkok, Chiang Mai y las islas del mar de Andamán.",
    description:
      "Doce noches para ver templos dorados, mercados flotantes, selva del norte y terminar en playas de arena blanca en Krabi.",
    highlights: ["Gran Palacio", "Santuario de elefantes", "Mercado nocturno", "Islas Phi Phi"],
    includes: ["Vuelos ida y vuelta", "Vuelos internos", "Hoteles y resort", "Excursión en long-tail boat"],
  },
  {
    slug: "safari-en-tanzania",
    title: "Safari en Tanzania",
    city: "Arusha",
    country: "Tanzania",
    continent: "África",
    nights: 7,
    price: 3850,
    rating: 4.9,
    gradient: "from-yellow-500 to-amber-700",
    emoji: "🦁",
    summary: "Serengeti, Ngorongoro y Tarangire con guía especializado.",
    description:
      "Siete noches de safari fotográfico en los parques más famosos de África oriental, con lodges en plena sabana y salidas al amanecer.",
    highlights: ["Cráter del Ngorongoro", "Gran migración", "Baobabs de Tarangire", "Amanecer en globo (opcional)"],
    includes: ["Vuelos ida y vuelta", "4x4 con techo abierto", "Pensión completa", "Entradas a parques"],
  },
  {
    slug: "marruecos-imperial",
    title: "Marruecos imperial",
    city: "Marrakech",
    country: "Marruecos",
    continent: "África",
    nights: 6,
    price: 1180,
    rating: 4.4,
    gradient: "from-red-400 to-orange-700",
    emoji: "🐪",
    summary: "Medinas, zocos y una noche en campamento del Sahara.",
    description:
      "Seis noches entre Marrakech, Fez y el desierto: riads tradicionales, té a la menta y una noche bajo las estrellas en Merzouga.",
    highlights: ["Plaza Jemaa el-Fna", "Curtidurías de Fez", "Dunas de Erg Chebbi", "Valle del Draa"],
    includes: ["Vuelos ida y vuelta", "Riads con desayuno", "Transporte privado", "Noche en campamento"],
  },
  {
    slug: "nueva-zelanda-aventura",
    title: "Nueva Zelanda aventura",
    city: "Queenstown",
    country: "Nueva Zelanda",
    continent: "Oceanía",
    nights: 14,
    price: 4560,
    rating: 4.8,
    gradient: "from-emerald-400 to-blue-700",
    emoji: "🥾",
    summary: "Isla Sur en campervan: fiordos, glaciares y adrenalina.",
    description:
      "Catorce noches recorriendo la Isla Sur con campervan, desde Christchurch hasta Milford Sound, con trekkings y deportes de aventura.",
    highlights: ["Milford Sound", "Glaciar Franz Josef", "Lago Tekapo", "Puenting en Queenstown"],
    includes: ["Vuelos ida y vuelta", "Campervan 14 días", "Seguro de aventura", "Crucero por el fiordo"],
  },
  {
    slug: "sydney-y-gran-barrera",
    title: "Sídney y Gran Barrera de Coral",
    city: "Sídney",
    country: "Australia",
    continent: "Oceanía",
    nights: 11,
    price: 4190,
    rating: 4.7,
    gradient: "from-cyan-400 to-indigo-600",
    emoji: "🐠",
    summary: "Ciudad, playas y snorkel en el arrecife más grande del mundo.",
    description:
      "Once noches entre la bahía de Sídney y Cairns, con dos jornadas completas de snorkel y buceo en la Gran Barrera de Coral.",
    highlights: ["Ópera de Sídney", "Bondi Beach", "Snorkel en el arrecife", "Bosque de Daintree"],
    includes: ["Vuelos ida y vuelta", "Vuelo interno a Cairns", "Hoteles 4★", "2 días de arrecife"],
  },
  {
    slug: "cusco-y-machu-picchu",
    title: "Cusco y Machu Picchu",
    city: "Cusco",
    country: "Perú",
    continent: "América",
    nights: 6,
    price: 1340,
    rating: 4.8,
    gradient: "from-stone-400 to-emerald-700",
    emoji: "⛰️",
    summary: "Valle Sagrado, tren panorámico y ciudadela inca al amanecer.",
    description:
      "Seis noches para aclimatarse en Cusco, recorrer el Valle Sagrado y llegar a Machu Picchu temprano, antes de los grupos grandes.",
    highlights: ["Machu Picchu", "Valle Sagrado", "Mercado de Pisac", "Montaña de 7 colores (opcional)"],
    includes: ["Vuelos ida y vuelta", "Tren a Aguas Calientes", "Entradas y guía", "Hoteles con desayuno"],
  },
  {
    slug: "grecia-atenas-y-cicladas",
    title: "Grecia: Atenas y Cícladas",
    city: "Atenas",
    country: "Grecia",
    continent: "Europa",
    nights: 9,
    price: 1890,
    rating: 4.7,
    gradient: "from-sky-400 to-blue-800",
    emoji: "⛵",
    summary: "Acrópolis, Mykonos y atardeceres en Santorini.",
    description:
      "Nueve noches combinando la Atenas clásica con dos islas de las Cícladas, con ferries rápidos y hoteles con vista al Egeo.",
    highlights: ["Acrópolis y Partenón", "Playas de Mykonos", "Oia al atardecer", "Crucero por la caldera"],
    includes: ["Vuelos ida y vuelta", "Ferries entre islas", "Hoteles con vista", "Crucero de un día"],
  },
];

export function getTrip(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug);
}

export const continents: Continent[] = ["América", "Europa", "Asia", "África", "Oceanía"];
