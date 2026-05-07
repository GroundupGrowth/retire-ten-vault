export type SiteConfig = {
  metaPixelId: string;
  bookingUrl: string;
};

const DEFAULTS: SiteConfig = {
  metaPixelId: "26667882816208192",
  bookingUrl:
    "https://api.leadconnectorhq.com/widget/bookings/insuranceandestates/barrybrooksby",
};

const STORAGE_KEY = "retire-ten-vault:config-overrides";

const readOverrides = (): Partial<SiteConfig> => {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<SiteConfig>) : {};
  } catch {
    return {};
  }
};

export const getSiteConfig = (): SiteConfig => ({
  ...DEFAULTS,
  ...readOverrides(),
});

export const getDefaults = (): SiteConfig => ({ ...DEFAULTS });

export const getOverrides = (): Partial<SiteConfig> => readOverrides();

export const setSiteOverrides = (overrides: Partial<SiteConfig>): void => {
  if (typeof window === "undefined") return;
  const filtered: Partial<SiteConfig> = {};
  (Object.keys(overrides) as (keyof SiteConfig)[]).forEach((k) => {
    const v = overrides[k];
    if (typeof v === "string" && v.trim().length > 0) filtered[k] = v;
  });
  if (Object.keys(filtered).length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};

export const clearSiteOverrides = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
};
