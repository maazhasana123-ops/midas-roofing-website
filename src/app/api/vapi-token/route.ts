import { NextResponse } from 'next/server'
import crypto from 'crypto'

/**
 * Server-side API route that generates a short-lived JWT token for the Vapi
 * Web SDK. This keeps the real Private Key and Assistant ID hidden from the
 * browser — only this server-side code reads them from env vars.
 *
 * The browser calls GET /api/vapi-token, receives a temporary JWT + the
 * assistant ID, and uses them to initiate a WebRTC call via the Vapi SDK.
 */

// ── helpers ──────────────────────────────────────────────────────────

function base64url(input: string | Buffer): string {
  const b64 = Buffer.from(input).toString('base64')
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function signJwt(
  payload: Record<string, unknown>,
  secret: string,
  expiresInSeconds = 3600,
): string {
  const header = { alg: 'HS256', typ: 'JWT' }

  const now = Math.floor(Date.now() / 1000)
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  }

  const encodedHeader = base64url(JSON.stringify(header))
  const encodedPayload = base64url(JSON.stringify(fullPayload))
  const data = `${encodedHeader}.${encodedPayload}`

  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')

  return `${data}.${signature}`
}

// ── route handler ────────────────────────────────────────────────────

export async function GET() {
  const privateKey = process.env.VAPI_PRIVATE_KEY
  const orgId = process.env.VAPI_ORG_ID
  const assistantId = process.env.VAPI_ASSISTANT_ID

  if (!privateKey || !orgId || !assistantId) {
    return NextResponse.json(
      { error: 'Server misconfigured — missing Vapi credentials.' },
      { status: 500 },
    )
  }

  // Create a "public"-scoped JWT so the browser can only start web calls.
  const token = signJwt(
    {
      orgId,
      token: { tag: 'public' },
    },
    privateKey,
    3600, // 1 hour expiry
  )

  return NextResponse.json({
    token,
    assistantId,
  })
}
