'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type Vapi from '@vapi-ai/web'

type CallState = 'idle' | 'loading' | 'active'

// Minimize icon SVG
function MinimizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function SoundWave({ active }: { active: boolean }) {
  const bars = [0.3, 0.6, 1, 0.75, 0.45, 0.85, 1, 0.55, 0.35]
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gold"
          style={{ height: 48, transformOrigin: 'center' }}
          animate={
            active
              ? { scaleY: [h * 0.35, h, h * 0.25, h * 1.1, h * 0.4, h] }
              : { scaleY: 0.07 }
          }
          transition={
            active
              ? {
                  duration: 1.1 + i * 0.06,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: 'easeInOut',
                }
              : { duration: 0.4, ease: 'easeOut' }
          }
        />
      ))}
    </div>
  )
}

export default function VapiWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [callState, setCallState] = useState<CallState>('idle')
  const vapiRef = useRef<Vapi | null>(null)
  // Credentials are fetched from our server-side proxy — never from NEXT_PUBLIC_ vars
  const tokenRef = useRef<string | null>(null)
  const assistantIdRef = useRef<string | null>(null)
  const [credentialsReady, setCredentialsReady] = useState(false)

  useEffect(() => {
    const handleOpen = () => { setIsOpen(true); setIsMinimized(false) }
    window.addEventListener('openVapiModal', handleOpen)
    return () => window.removeEventListener('openVapiModal', handleOpen)
  }, [])

  // Fetch the short-lived JWT token + assistant ID from our secure API route.
  // This runs once on mount — no secrets ever reach the browser bundle.
  useEffect(() => {
    fetch('/api/vapi-token')
      .then((res) => res.json())
      .then(({ token, assistantId }) => {
        if (token && assistantId) {
          tokenRef.current = token
          assistantIdRef.current = assistantId
          setCredentialsReady(true)
        }
      })
      .catch(() => {
        // Silently fail — widget just won't render (same behaviour as before)
      })
  }, [])

  // Lazily initialize the Vapi SDK instance in the browser using the JWT token
  const getVapi = useCallback(async (): Promise<Vapi | null> => {
    if (!tokenRef.current) return null
    if (vapiRef.current) return vapiRef.current

    const { default: VapiSDK } = await import('@vapi-ai/web')
    const instance = new VapiSDK(tokenRef.current)

    instance.on('call-start', () => setCallState('active'))
    instance.on('call-end', () => setCallState('idle'))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance.on('error' as any, () => setCallState('idle'))

    vapiRef.current = instance
    return instance
  }, [])

  const startCall = useCallback(async () => {
    if (!assistantIdRef.current) return
    setCallState('loading')
    try {
      const vapi = await getVapi()
      if (!vapi) { setCallState('idle'); return }
      await vapi.start(assistantIdRef.current)
    } catch {
      setCallState('idle')
    }
  }, [getVapi])

  const endCall = useCallback(() => {
    vapiRef.current?.stop()
    setCallState('idle')
  }, [])

  const closeModal = useCallback(() => {
    if (callState === 'active') endCall()
    setIsOpen(false)
  }, [callState, endCall])

  // Don't render until credentials are confirmed server-side
  if (!credentialsReady) return null

  return (
    <>
      {/* Custom floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-full px-5 py-3 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #b8922d 0%, #C9A84C 40%, #e8c66a 70%, #C9A84C 100%)',
          backgroundSize: '200% 200%',
          boxShadow: '0 4px 20px rgba(201,168,76,0.35)',
        }}
        whileHover={{
          scale: 1.04,
          boxShadow: '0 6px 28px rgba(201,168,76,0.5)',
        }}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Talk to Midas"
      >
        <svg viewBox="0 0 24 24" fill="#0a0a0a" className="w-4 h-4 flex-shrink-0">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
        </svg>
        <span className="font-jakarta font-bold text-sm text-[#0a0a0a] tracking-wide whitespace-nowrap">
          Talk to Midas
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="vapi-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-50 bg-dark/65 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Panel */}
            <motion.div
              key="vapi-panel"
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-24 right-6 z-50 w-[320px] rounded-2xl border border-gold/20 overflow-hidden"
              style={{
                background: 'rgba(8,8,8,0.97)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.08)',
              }}
            >
              {/* Gold glow top accent */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-32 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.15)_0%,_transparent_70%)]" />
              </div>

              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full border border-white/[0.07] flex items-center justify-center text-cream/25 hover:text-cream/65 hover:border-white/[0.15] transition-all duration-200 text-xs leading-none"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Header */}
              <div className="relative z-10 px-6 pt-6 pb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gold/[0.08] border border-gold/25 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta font-bold text-cream text-sm leading-tight">
                      Talk to Midas
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                      <span className="text-emerald-400 text-[11px] font-inter">Available 24/7</span>
                    </div>
                  </div>
                </div>

                {/* Intro text */}
                <p className="text-cream/60 text-sm font-inter leading-relaxed">
                  <span className="font-semibold text-cream/90">Got roofing questions? We are</span>{' '}
                  available 24/7. Ask about pricing, inspections, or book a time with the team. No
                  hold times.
                </p>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-gold/[0.08]" />

              {/* Voice UI */}
              <div className="relative z-10 px-6 py-6 flex flex-col items-center gap-4">
                <SoundWave active={callState === 'active'} />

                <p className="text-cream/30 text-xs font-inter tracking-wide text-center min-h-4">
                  {callState === 'idle' && 'No hold times — connect instantly'}
                  {callState === 'loading' && 'Connecting you now...'}
                  {callState === 'active' && 'Live — speak freely'}
                </p>

                {callState === 'active' ? (
                  <button
                    onClick={endCall}
                    className="w-full py-3.5 rounded-xl text-sm font-jakarta font-semibold text-red-400 border border-red-500/25 bg-red-500/[0.07] hover:bg-red-500/[0.15] hover:border-red-500/40 transition-all duration-200"
                  >
                    End Call
                  </button>
                ) : (
                  <button
                    onClick={startCall}
                    disabled={callState === 'loading'}
                    className="w-full py-3.5 rounded-xl text-sm font-jakarta font-bold text-[#0a0a0a] disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #e8c66a)' }}
                  >
                    <span className="relative z-10">
                      {callState === 'loading' ? 'Connecting...' : 'Start Call'}
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                )}

                <p className="text-cream/20 text-[10px] font-inter text-center">
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
