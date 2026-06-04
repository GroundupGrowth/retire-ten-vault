declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export type CheckoutProduct = {
  contentId: string;
  contentName: string;
  value: number;
  currency?: string;
};

export const trackInitiateCheckout = (product: CheckoutProduct): void => {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "InitiateCheckout", {
    value: product.value,
    currency: product.currency ?? "USD",
    content_ids: [product.contentId],
    content_name: product.contentName,
    content_type: "product",
    num_items: 1,
  });
};

export const trackViewContent = (product: CheckoutProduct): void => {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "ViewContent", {
    value: product.value,
    currency: product.currency ?? "USD",
    content_ids: [product.contentId],
    content_name: product.contentName,
    content_type: "product",
  });
};

export const trackCustom = (name: string, params?: Record<string, unknown>): void => {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", name, params);
};

export const EBOOK_PRODUCT: CheckoutProduct = {
  contentId: "lrdr-ebook-pdf",
  contentName: "Live Rich Die Rich — PDF eBook",
  value: 19.97,
  currency: "USD",
};

export const SIGNED_COPY_PRODUCT: CheckoutProduct = {
  contentId: "lrdr-signed-paperback",
  contentName: "Live Rich Die Rich — Signed Paperback",
  value: 33.95,
  currency: "USD",
};
