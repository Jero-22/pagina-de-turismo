"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { createReference, ORDER_STORAGE_KEY, type Order } from "@/lib/order";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  card: string;
  expiry: string;
  cvc: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = { fullName: "", email: "", phone: "", card: "", expiry: "", cvc: "" };

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (form.fullName.trim().length < 3) errors.fullName = "Ingresá tu nombre completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Ingresá un email válido.";
  if (form.phone.replace(/\D/g, "").length < 8) errors.phone = "Ingresá un teléfono válido.";
  if (form.card.replace(/\s/g, "").length !== 16) errors.card = "La tarjeta debe tener 16 dígitos.";
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errors.expiry = "Usá el formato MM/AA.";
  if (!/^\d{3,4}$/.test(form.cvc)) errors.cvc = "CVC inválido.";
  return errors;
}

export default function CheckoutPage() {
  const { lines, total, clear } = useCart();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [processing, setProcessing] = useState(false);

  const update = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0 || lines.length === 0) return;

    setProcessing(true);
    const order: Order = {
      reference: createReference(),
      email: form.email,
      fullName: form.fullName,
      total,
      items: lines.map((line) => ({
        title: line.trip.title,
        travelers: line.travelers,
        subtotal: line.subtotal,
      })),
    };

    window.setTimeout(() => {
      window.sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
      clear();
      router.push("/checkout/gracias");
    }, 1200);
  };

  if (lines.length === 0 && !processing) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">Tu carrito está vacío</h1>
        <p className="mt-2 text-slate-600">Agregá un viaje antes de continuar con el pago.</p>
        <Link
          href="/#catalogo"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Ver viajes
        </Link>
      </div>
    );
  }

  const field = (
    name: keyof FormState,
    label: string,
    placeholder: string,
    extra?: { inputMode?: "numeric" | "email" | "tel"; maxLength?: number; className?: string },
  ) => (
    <label className={`flex flex-col gap-1 text-sm font-medium text-slate-700 ${extra?.className ?? ""}`}>
      {label}
      <input
        name={name}
        value={form[name]}
        onChange={update(name)}
        placeholder={placeholder}
        inputMode={extra?.inputMode}
        maxLength={extra?.maxLength}
        data-testid={`field-${name}`}
        className="rounded-lg border border-slate-300 px-3 py-2 font-normal text-slate-900 outline-none focus:border-blue-500"
      />
      {errors[name] && <span className="text-xs font-normal text-red-600">{errors[name]}</span>}
    </label>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
      <p className="mt-1 text-sm text-slate-500">Pago simulado: no se procesa ningún cobro real.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Datos del pasajero</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field("fullName", "Nombre y apellido", "Ana Pérez", { className: "sm:col-span-2" })}
              {field("email", "Email", "ana@email.com", { inputMode: "email" })}
              {field("phone", "Teléfono", "+54 11 5555 5555", { inputMode: "tel" })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">Pago</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field("card", "Número de tarjeta", "4111 1111 1111 1111", {
                inputMode: "numeric",
                maxLength: 19,
                className: "sm:col-span-2",
              })}
              {field("expiry", "Vencimiento", "12/29", { maxLength: 5 })}
              {field("cvc", "CVC", "123", { inputMode: "numeric", maxLength: 4 })}
            </div>
          </section>

          <button
            type="submit"
            disabled={processing}
            data-testid="submit-order"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {processing ? "Procesando pago..." : `Pagar ${formatPrice(total)}`}
          </button>
        </form>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Tu reserva</h2>
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
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
