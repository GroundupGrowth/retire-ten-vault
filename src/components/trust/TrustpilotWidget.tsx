import { useEffect, useRef } from "react";

const SCRIPT_SRC =
  "https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: HTMLElement, deferImageLoading?: boolean) => void;
    };
  }
}

const TrustpilotWidget = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const render = () => {
      if (cancelled) return;
      if (window.Trustpilot && ref.current) {
        window.Trustpilot.loadFromElement(ref.current, true);
      }
    };

    if (window.Trustpilot) {
      render();
      return () => {
        cancelled = true;
      };
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", render);

    return () => {
      cancelled = true;
      script?.removeEventListener("load", render);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="trustpilot-widget"
      data-locale="en-US"
      data-template-id="53aa8807dec7e10d38f59f32"
      data-businessunit-id="5eced1756efff500018631d5"
      data-style-height="150px"
      data-style-width="100%"
      data-token="afac0f22-bdca-48a3-9dfa-21cfdf869c2f"
    >
      <a
        href="https://www.trustpilot.com/review/insuranceandestates.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Trustpilot
      </a>
    </div>
  );
};

export default TrustpilotWidget;
