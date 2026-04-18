'use client'

import Script from 'next/script'

export default function VapiWidget() {
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID

  // Don't render anything if keys aren't configured
  if (!publicKey || !assistantId) return null

  return (
    <>
      <Script
        src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
        strategy="lazyOnload"
      />
      {/* @ts-expect-error - vapi-widget is a custom web component */}
      <vapi-widget
        public-key={publicKey}
        assistant-id={assistantId}
        mode="voice"
        theme="dark"
        position="bottom-right"
        size="compact"
        radius="large"
        base-color="#0a0a0a"
        accent-color="#C9A84C"
        button-base-color="#C9A84C"
        button-accent-color="#0a0a0a"
        main-label="Talk to Midas"
        start-button-text="Start Call"
        end-button-text="End Call"
        empty-voice-message="Click to speak with a Midas roofing specialist"
      />
    </>
  )
}
