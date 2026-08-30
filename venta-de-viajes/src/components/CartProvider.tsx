"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getTrip, type Trip } from "@/data/trips";

const STORAGE_KEY = "viajes.cart";

export type CartItem = {
  slug: string;
  travelers: number;
};

export type CartLine = CartItem & {
  trip: Trip;
  subtotal: number;
};

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  total: number;
  travelerCount: number;
  addItem: (slug: string, travelers: number) => void;
  setTravelers: (slug: string, travelers: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((entry) => {
      if (typeof entry !== "object" || entry === null) return [];
      const { slug, travelers } = entry as { slug?: unknown; travelers?: unknown };
      if (typeof slug !== "string" || typeof travelers !== "number") return [];
      if (!getTrip(slug)) return [];
      return [{ slug, travelers: Math.min(10, Math.max(1, Math.round(travelers))) }];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((slug: string, travelers: number) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === slug);
      if (existing) {
        return current.map((item) =>
          item.slug === slug ? { ...item, travelers: Math.min(10, item.travelers + travelers) } : item,
        );
      }
      return [...current, { slug, travelers }];
    });
  }, []);

  const setTravelers = useCallback((slug: string, travelers: number) => {
    setItems((current) =>
      current.map((item) =>
        item.slug === slug ? { ...item, travelers: Math.min(10, Math.max(1, travelers)) } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap<CartLine>((item) => {
      const trip = getTrip(item.slug);
      if (!trip) return [];
      return [{ ...item, trip, subtotal: trip.price * item.travelers }];
    });
    return {
      items,
      lines,
      total: lines.reduce((sum, line) => sum + line.subtotal, 0),
      travelerCount: lines.reduce((sum, line) => sum + line.travelers, 0),
      addItem,
      setTravelers,
      removeItem,
      clear,
    };
  }, [items, addItem, setTravelers, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
