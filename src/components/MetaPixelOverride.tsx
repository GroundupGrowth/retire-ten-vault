import { useEffect } from "react";
import { getDefaults, getSiteConfig } from "@/config/site";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const MetaPixelOverride = () => {
  useEffect(() => {
    const config = getSiteConfig();
    const defaults = getDefaults();
    if (!window.fbq) return;
    if (config.metaPixelId && config.metaPixelId !== defaults.metaPixelId) {
      window.fbq("init", config.metaPixelId);
      window.fbq("track", "PageView");
    }
  }, []);
  return null;
};

export default MetaPixelOverride;
