import { NextResponse } from 'next/server'

/**
 * Returns the Vapi API key + assistant ID to the browser.
 * The Vapi Web SDK accepts the API key directly — no custom JWT needed.
 * Kept server-side so the key never appears in the JS bundle.
 */
export async function GET() {
  const apiKey = process.env.VAPI_PRIVATE_KEY
  const assistantId = process.env.VAPI_ASSISTANT_ID

  if (!apiKey || !assistantId) {
    return NextResponse.json(
      { error: 'Server misconfigured — missing Vapi credentials.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ token: apiKey, assistantId })
}
