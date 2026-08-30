# Venta de viajes

Tienda de paquetes de viaje hecha con Next.js (App Router), TypeScript y Tailwind CSS.

## Funcionalidades

- Catálogo de 12 paquetes con búsqueda, filtro por continente, tope de precio y orden.
- Página de detalle por viaje con highlights, qué incluye y selector de viajeros.
- Carrito persistente en `localStorage`, editable desde `/carrito`.
- Checkout con validación de formulario y pago **simulado** (no se procesa ningún cobro), más página de confirmación con código de reserva.

## Desarrollo

```bash
cd venta-de-viajes
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```
