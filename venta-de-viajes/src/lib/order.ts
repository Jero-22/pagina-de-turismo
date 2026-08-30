export const ORDER_STORAGE_KEY = "viajes.lastOrder";

export type Order = {
  reference: string;
  email: string;
  fullName: string;
  total: number;
  items: { title: string; travelers: number; subtotal: number }[];
};

export function readLastOrder(): Order | null {
  try {
    const raw = window.sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const order = parsed as Partial<Order>;
    if (typeof order.reference !== "string" || typeof order.total !== "number" || !Array.isArray(order.items)) {
      return null;
    }
    return {
      reference: order.reference,
      email: typeof order.email === "string" ? order.email : "",
      fullName: typeof order.fullName === "string" ? order.fullName : "",
      total: order.total,
      items: order.items,
    };
  } catch {
    return null;
  }
}

export function createReference(): string {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `VM-${new Date().getFullYear()}-${random}`;
}
