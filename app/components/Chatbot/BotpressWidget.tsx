"use client";

import Script from "next/script";

export default function BotpressWidget() {
  const configSrc = process.env.NEXT_PUBLIC_BOTPRESS_WEBCHAT_SRC;

  return (
    <>
      <Script
        id="bp-inject"
        src="https://cdn.botpress.cloud/webchat/v3.3/inject.js"
        strategy="afterInteractive"
      />

      {configSrc && (
        <Script
          id="bp-config"
          src={configSrc}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}