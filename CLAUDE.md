# Midas Roofing — Website

Client website for Midas Roofing & Construction (Longwood, FL). Next.js 14 · Tailwind · framer-motion.

- **Live:** https://www.midasroofingpros.com (Vercel project `website`, team maazs-projects-a9edf41e)
- **Deploys:** push to `main` on `maazhasana123-ops/midas-roofing-website` → Vercel builds production automatically.
- ⚠️ `midasroofingfl.com` is NOT this site any more (it's served by Squarespace). Don't test against it.
- The heavy media (`roofanimation2.mp4`, `house roof1.jpg`, Wistia) dominate first load on slow links.

## "Talk to Midas" web-call receptionist
- `src/components/VapiWidget.tsx`, mounted in `src/app/layout.tsx`. Opened by the floating button or `window.dispatchEvent(new CustomEvent('openVapiModal'))`.
- Uses the VAPI **public** key + assistant id from Vercel production env (`NEXT_PUBLIC_VAPI_PUBLIC_KEY`, `NEXT_PUBLIC_VAPI_ASSISTANT_ID`), mirrored in `.env.local`.
  - Assistant `c5c65b18-…` lives in VAPI org `fa0dba70-9c72-401c-bcfe-470c86c67dd8`. **We don't hold that org's private key** (it isn't any of the Nouxel/Midas/Owl/Summit keys), so its prompt, logs and wallet can't be read from here. Find the login before you need to edit the agent.
  - Midas's own reactivation org (`44cb4e59`, key in `assets/credentials/Midas Roofing - Credentials.md`) has an older "Midas Roofing WEB assistant" `f340ea10-…`. That key is PRIVATE; never put it in a `NEXT_PUBLIC_` var (the old `.env.local` did, and VAPI rejects private keys on `/call/web` with 401).
- `@vapi-ai/web` is pinned to **3.1.0** (daily-js 0.94). On 2026-11-02 web calls were failing: 2.5.2 bundled daily-js 0.85.0, which Daily no longer supports, so calls hung or were ejected ("Meeting has ended") right after joining. When Daily flags a version, bump the SDK.
- `src/app/api/vapi-token/route.ts` is unused and would hand `VAPI_PRIVATE_KEY` to any browser if that env var were ever set. Delete it or never set that var.

## Testing a call
Headless Chrome with `--use-fake-ui-for-media-stream --use-fake-device-for-media-stream --mute-audio` + mic permission, open the modal, click `[aria-label="Start voice call"]`. Expect `POST api.vapi.ai/call/web` 201 → daily `call-machine/versioned/0.94.0` → "Live — speak freely". A console line "daily-js version X is no longer supported" means the SDK needs a bump.
