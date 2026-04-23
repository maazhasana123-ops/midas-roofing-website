'use client'

import { useState, useEffect, useCallback, useRef, Component } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type Vapi from '@vapi-ai/web'

// ─── Types ───────────────────────────────────────────────────────────────────
type CallState = 'idle' | 'loading' | 'active' | 'error' | 'mic-denied'

// ─── Env vars (NEXT_PUBLIC_ = safe for client bundle) ─────────────────────
const VAPI_KEY = process.env.NEXT_PUBLIC_VAPI_KEY ?? ''
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID ?? ''

// ─── ErrorBoundary — prevents VAPI / Daily.js crashes from killing the page ──
class VapiErrorBoundary extends Component<
  { children: ReactNode },
  { crashed: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { crashed: false }
  }
  static getDerivedStateFromError() {
    return { crashed: true }
  }
  componentDidCatch(err: Error) {
    console.error('[VapiWidget crash]', err)
  }
  render() {
    // If Daily.js or VAPI crashed the subtree, render nothing — page stays intact
    if (this.state.crashed) return null
    return this.props.children
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function MicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
    </svg>
  )
}

function PhoneOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A2 2 0 0 1 10.68 13.31z" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

// ─── Sound wave — bars animate by actual volume when active ──────────────────
function SoundWave({ active, volume }: { active: boolean; volume: number }) {
  const bars = [0.3, 0.55, 0.85, 1, 0.75, 0.95, 0.6, 0.4, 0.7, 0.5, 0.8, 0.35]
  return (
    <div className="flex items-center justify-center gap-[3px] h-14" aria-hidden="true">
      {bars.map((base, i) => {
        const liveScale = active ? Math.max(0.12, base * (0.4 + volume * 0.7)) : 0.06
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              height: 48,
              transformOrigin: 'center',
              background: active
                ? 'linear-gradient(to top, #C9A84C, #e8c66a)'
                : 'rgba(201,168,76,0.25)',
            }}
            animate={{ scaleY: liveScale }}
            transition={
              active
                ? { duration: 0.18, ease: 'easeOut' }
                : { duration: 0.5, ease: 'easeOut', delay: i * 0.02 }
            }
          />
        )
      })}
    </div>
  )
}

function IdleWave() {
  const bars = [0.15, 0.3, 0.5, 0.7, 0.9, 1, 0.9, 0.7, 0.5, 0.3, 0.2, 0.15]
  return (
    <div className="flex items-center justify-center gap-[3px] h-14" aria-hidden="true">
      {bars.map((base, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ height: 48, transformOrigin: 'center', background: 'rgba(201,168,76,0.2)' }}
          animate={{ scaleY: [base * 0.08, base * 0.18, base * 0.08] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Extract a plain string from any VAPI error payload ──────────────────────
// The SDK emits objects like {message, error, statusCode} — React cannot render
// objects as children, so we must always reduce to a string before storing.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractVapiError(e: any): string {
  if (!e) return 'Connection failed. Please try again.'
  if (typeof e === 'string') return e
  // statusCode 401 = wrong/missing API key
  if (e.statusCode === 401 || e.error?.statusCode === 401) {
    return 'Authentication failed (401). Please check the VAPI API key in Vercel environment variables.'
  }
  // Try every known location a message string could live
  const candidates = [
    e.message,
    e.error?.message,
    e.error?.error,
    e.statusCode ? `Error ${e.statusCode}` : null,
  ]
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c
  }
  return 'Connection failed. Please try again.'
}

// ─── Inner widget (inside ErrorBoundary) ──────────────────────────────────────
function VapiWidgetInner() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [callState, setCallState] = useState<CallState>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [volume, setVolume] = useState(0)
  const vapiRef = useRef<Vapi | null>(null)

  // ── Listen for external trigger ───────────────────────────────────────────
  useEffect(() => {
    const handleOpen = () => { setIsOpen(true); setIsMinimized(false) }
    window.addEventListener('openVapiModal', handleOpen)
    return () => window.removeEventListener('openVapiModal', handleOpen)
  }, [])

  // ── Lazy-init Vapi SDK once ───────────────────────────────────────────────
  const getVapi = useCallback(async (): Promise<Vapi | null> => {
    if (vapiRef.current) return vapiRef.current
    if (!VAPI_KEY) {
      console.error('[VapiWidget] NEXT_PUBLIC_VAPI_KEY is not set.')
      return null
    }

    // Dynamic import keeps Daily.js out of the SSR bundle entirely
    const { default: VapiSDK } = await import('@vapi-ai/web')
    const instance = new VapiSDK(VAPI_KEY)

    instance.on('call-start', () => {
      setCallState('active')
      setErrorMsg(null)
    })

    instance.on('call-end', () => {
      setCallState('idle')
      setVolume(0)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance.on('volume-level' as any, (v: number) => {
      setVolume(v)
    })

    // call-start-failed: specific event for failed connection attempt
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance.on('call-start-failed' as any, (e: any) => {
      console.error('[Vapi call-start-failed]', e)
      setCallState('error')
      setErrorMsg(extractVapiError(e))
      setVolume(0)
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance.on('error' as any, (e: any) => {
      console.error('[Vapi error]', e)
      setCallState('error')
      setErrorMsg(extractVapiError(e))
      setVolume(0)
    })

    vapiRef.current = instance
    return instance
  }, [])

  // ── Start call ───────────────────────────────────────────────────────────
  const startCall = useCallback(async () => {
    if (!VAPI_ASSISTANT_ID) {
      setCallState('error')
      setErrorMsg('Assistant not configured. Contact support.')
      return
    }
    setCallState('loading')
    setErrorMsg(null)

    // Check mic permission before touching Vapi at all
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setCallState('mic-denied')
      setErrorMsg('Microphone access is required. Please allow mic access in your browser settings and try again.')
      return
    }

    try {
      const vapi = await getVapi()
      if (!vapi) {
        setCallState('error')
        setErrorMsg('Failed to load voice SDK. Refresh the page and try again.')
        return
      }
      await vapi.start(VAPI_ASSISTANT_ID)
    } catch (err: unknown) {
      // Only set error here if the event handlers haven't already done so
      // (SDK emits call-start-failed before throwing in most cases)
      const msg = err instanceof Error ? err.message : 'Could not connect. Please try again.'
      console.error('[Vapi start threw]', err)
      setCallState((prev) => prev === 'loading' ? 'error' : prev)
      setErrorMsg((prev) => prev ?? msg)
    }
  }, [getVapi])

  // ── End call ─────────────────────────────────────────────────────────────
  const endCall = useCallback(() => {
    vapiRef.current?.stop()
    setCallState('idle')
    setVolume(0)
  }, [])

  const minimizeModal = useCallback(() => {
    setIsMinimized(true)
    setIsOpen(false)
  }, [])

  const closeModal = useCallback(() => {
    if (callState === 'active') endCall()
    setIsOpen(false)
    setIsMinimized(false)
    setErrorMsg(null)
  }, [callState, endCall])

  const expandModal = useCallback(() => {
    setIsMinimized(false)
    setIsOpen(true)
  }, [])

  const retry = useCallback(() => {
    setCallState('idle')
    setErrorMsg(null)
    startCall()
  }, [startCall])

  const statusLabel =
    callState === 'idle' ? 'No hold times — connect instantly'
    : callState === 'loading' ? 'Connecting...'
    : callState === 'active' ? 'Live — speak freely'
    : ''

  const isLive = isMinimized && callState === 'active'

  return (
    <>
      {/* ─── Floating Action Button ──────────────────────────────────────────
          fixed bottom-6 right-5 z-[9999] — always visible on every page,
          no scrolling needed, above all page stacking contexts.
      ─────────────────────────────────────────────────────────────────── */}
      <motion.button
        onClick={isMinimized ? expandModal : () => { setIsOpen(true); setIsMinimized(false) }}
        className="fixed bottom-6 right-5 sm:right-6 z-[9999] flex items-center gap-2.5 rounded-full px-5 py-3 select-none"
        style={{
          background: 'linear-gradient(135deg, #b8922d 0%, #C9A84C 40%, #e8c66a 70%, #C9A84C 100%)',
          boxShadow: isLive
            ? '0 4px 24px rgba(52,211,153,0.45), 0 4px 20px rgba(201,168,76,0.3)'
            : '0 4px 24px rgba(201,168,76,0.4), 0 2px 12px rgba(0,0,0,0.4)',
        }}
        whileHover={{ scale: 1.04, boxShadow: '0 6px 32px rgba(201,168,76,0.55), 0 2px 16px rgba(0,0,0,0.4)' }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 24, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label={isMinimized ? 'Expand call' : 'Talk to Midas'}
      >
        {isLive && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#080808] animate-pulse" />
        )}
        <MicIcon className="w-4 h-4 text-[#080808] flex-shrink-0" />
        <span className="font-jakarta font-bold text-sm text-[#080808] tracking-wide whitespace-nowrap">
          {isMinimized && callState === 'active' ? 'Live Call' : 'Talk to Midas'}
        </span>
        {isOpen && !isMinimized && (
          <ChevronDownIcon className="w-3.5 h-3.5 text-[#080808]/70" />
        )}
      </motion.button>

      {/* ─── Modal ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="vapi-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
              onClick={callState === 'active' ? minimizeModal : closeModal}
              aria-hidden="true"
            />

            <motion.div
              key="vapi-panel"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-[72px] right-5 sm:right-6 z-[9998] rounded-2xl overflow-hidden"
              style={{
                width: 'min(340px, calc(100vw - 40px))',
                background: 'rgba(8,8,8,0.97)',
                backdropFilter: 'blur(28px)',
                border: '1px solid rgba(201,168,76,0.15)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(201,168,76,0.06)',
              }}
              role="dialog"
              aria-label="Talk to Midas voice assistant"
              aria-modal="true"
            >
              {/* Ambient glow */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden" aria-hidden="true">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-36 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.12)_0%,_transparent_70%)]" />
              </div>

              {/* Header */}
              <div className="relative z-10 px-5 pt-5 pb-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gold/[0.08] border border-gold/25 flex items-center justify-center flex-shrink-0">
                      <MicIcon className="w-4 h-4 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-jakarta font-bold text-cream text-sm leading-tight truncate">
                        Talk to Midas
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                        <span className="text-emerald-400 text-[11px] font-inter">Available 24/7</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={minimizeModal}
                    className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center text-cream/30 hover:text-cream/70 hover:border-white/20 transition-all duration-200 flex-shrink-0 mt-0.5"
                    aria-label="Minimize"
                  >
                    <ChevronDownIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-cream/55 text-sm font-inter leading-relaxed mt-3">
                  <span className="font-semibold text-cream/85">Got roofing questions?</span>{' '}
                  Ask about pricing, inspections, or book a time with the team. No hold times.
                </p>
              </div>

              <div className="mx-5 h-px bg-gold/[0.07]" />

              {/* Body */}
              <div className="relative z-10 px-5 py-5 flex flex-col items-center gap-4">
                {callState === 'active'
                  ? <SoundWave active volume={volume} />
                  : <IdleWave />
                }

                {(callState === 'error' || callState === 'mic-denied') ? (
                  <div className="w-full rounded-xl border border-red-500/20 bg-red-500/[0.06] px-4 py-3 text-center">
                    <p className="text-red-400 text-xs font-inter leading-relaxed">
                      {errorMsg ?? 'Something went wrong.'}
                    </p>
                  </div>
                ) : (
                  <p className="text-cream/30 text-xs font-inter tracking-wide text-center min-h-[16px]">
                    {statusLabel}
                  </p>
                )}

                {callState === 'active' ? (
                  <button
                    onClick={endCall}
                    className="w-full py-3.5 rounded-xl text-sm font-jakarta font-semibold text-red-400 border border-red-500/25 bg-red-500/[0.07] hover:bg-red-500/[0.18] hover:border-red-500/45 transition-all duration-200 flex items-center justify-center gap-2"
                    aria-label="End call"
                  >
                    <PhoneOffIcon className="w-4 h-4" />
                    End Call
                  </button>
                ) : callState === 'error' || callState === 'mic-denied' ? (
                  <button
                    onClick={retry}
                    className="w-full py-3.5 rounded-xl text-sm font-jakarta font-bold text-[#080808] relative overflow-hidden group"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #e8c66a)' }}
                  >
                    <span className="relative z-10">Try Again</span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                ) : (
                  <button
                    onClick={startCall}
                    disabled={callState === 'loading'}
                    className="w-full py-3.5 rounded-xl text-sm font-jakarta font-bold text-[#080808] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #e8c66a)' }}
                    aria-label="Start voice call"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {callState === 'loading' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Connecting...
                        </>
                      ) : (
                        <>
                          <MicIcon className="w-4 h-4" />
                          Start Call
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                )}

                <p className="text-cream/18 text-[10px] font-inter text-center">
                  AI-powered · Midas Roofing &amp; Construction
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Default export — wrapped in ErrorBoundary ────────────────────────────────
export default function VapiWidget() {
  return (
    <VapiErrorBoundary>
      <VapiWidgetInner />
    </VapiErrorBoundary>
  )
}
