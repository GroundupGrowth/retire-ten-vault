declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackCustom = (name: string, params?: Record<string, unknown>): void => {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("trackCustom", name, params);
};

/**
 * Fired the moment a visitor opens the booking calendar — the intent signal
 * one step before a completed booking. Meta "Contact" + a GA event.
 * The completed booking still fires "Schedule" on /thank-you.
 */
export const trackBookCallIntent = (): void => {
  if (typeof window === "undefined") return;
  window.fbq?.("track", "Contact");
  window.gtag?.("event", "book_call_intent", {
    event_category: "engagement",
    event_label: "booking_calendar_opened",
  });
};
