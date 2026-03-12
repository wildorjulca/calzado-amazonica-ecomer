"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  publicKey: string;
  amount: number;
  email: string;
  title?: string;
  currency?: string;
  onClose?: () => void;
}

declare global {
  interface Window {
    Culqi: any;
  }
}

const CulqiCustomCheckout = ({
  publicKey,
  amount,
  email,
  title = "Pago con Culqi",
  currency = "PEN",
}: Props) => {
  const scriptsLoadedRef = useRef(false);

  const initializeCulqi = () => {
    if (!window.Culqi) return;

    window.Culqi.publicKey = publicKey;
    window.Culqi.settings({
      title,
      currency,
      amount: amount * 100,
    });

    window.Culqi.options({
      lang: "es",
      modal: true,
      installments: false,
    });
  };

  const handleOpenCheckout = () => {
    if (!window.Culqi) return;
    window.Culqi.open();
  };

  useEffect(() => {
    if (scriptsLoadedRef.current) return;

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = reject;
        document.body.appendChild(script);
      });

    const loadScripts = async () => {
      try {
        await loadScript("https://3ds.culqi.com");
        await loadScript("https://js.culqi.com/checkout-js");
        scriptsLoadedRef.current = true;
        initializeCulqi();
      } catch (err) {
        console.error("Error cargando Culqi", err);
      }
    };

    loadScripts();
  }, []);

  return (
    <button onClick={handleOpenCheckout}>
      Pagar S/ {amount}
    </button>
  );
};

export default CulqiCustomCheckout;