'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type Vapi from '@vapi-ai/web'

type CallState = 'idle' | 'loading' | 'active'

function SoundWave({ active }: { active: boolean }) {
  const bars = [0.3, 0.6, 1, 0.75, 0.45, 0.85, 1, 0.55, 0.35]
  return (
    <div className="flex items-center justify-center gap-[3px] h-12">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gold"
          style={{ height: 48, transformOrigin: 'center' }}
          animate={active ? { scaleY: [h * 0.35, h, h * 0.25, h * 1.1, h * 0.4, h] } : { scaleY: 0.07 }}
          transition={
            active
              ? { duration: 1.1 + i * 0.06, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }
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
  const [callError, setCallError] = useState<string | null>(null)
  const [credentialsReady, setCredentialsReady] = useState(false)
  const vapiRef = useRef<Vapi | null>(null)
  const tokenRef = useRef<string | null>(null)
  const assistantIdRef = useRef<string | null>(null)

  // Fetch credentials once on mount
  useEffect(() => {
    fetch('/api/vapi-token')
      .then((r) => r.json())
      .then(({ token, assistantId }) => {
        if (token && assistantId) {
          tokenRef.current = token
          assistantIdRef.current = assistantId
          setCredentialsReady(true)
        }
      })
      .catch(console.error)
  }, [])

  // openVapiModal event from other buttons on the page
  useEffect(() => {
    const handleOpen = () => { setIsOpen(true); setIsMinimized(false) }
    window.addEventListener('openVapiModal', handleOpen)
    return () => window.removeEventListener('openVapiModal', handleOpen)
  }, [])

  const getVapi = useCallback(async (): Promise<Vapi | null> => {
    if (!tokenRef.current) return null
    if (vapiRef.current) return vapiRef.current
    const { default: VapiSDK } = await import('@vapi-ai/web')
    const instance = new VapiSDK(tokenRef.current)
    instance.on('call-start', () => { setCallState('active'); setCallError(null) })
    instance.on('call-end', () => setCallState('idle'))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance.on('error' as any, (e: any) => {
      const msg = e?.message ?? e?.error?.message ?? 'Connection failed'
      console.error('[Vapi]', e)
      setCallError(msg)
      setCallState('idle')
    })
    vapiRef.current = instance
    return instance
  }, [])

  const startCall = useCallback(async () => {
    if (!assistantIdRef.current) return
    setCallState('loading')
    setCallError(null)
    try {
      const vapi = await getVapi()
      if (!vapi) { setCallState('idle'); return }
      await vapi.start(assistantIdRef.current)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      console.error('[Vapi start]', e)
      setCallError(msg)
      setCallState('idle')
    }
  }, [getVapi])

  const endCall = useCallback(() => {
    vapiRef.current?.stop()
    setCallState('idle')
  }, [])

  const openModal = useCallback(() => { setIsOpen(true); setIsMinimized(false) }, [])
  const minimizeModal = useCallback(() => { setIsMinimized(true); setIsOpen(false) }, [])
  const closeModal = useCallback(() => {
    endCall()
    setIsOpen(false)
    setIsMinimized(false)
  }, [endCall])

  if (!credentialsReady) return null

  const isLive = isMinimized && callState === 'active'

  return (
    <>
      {/* Floating button */}
      <button
        onClick={isMinimized ? openModal : openModal}
        className="fixed bottom-6 right-6 z-40 relative flex items-center gap-2.5 rounded-full px-5 py-3"
        style={{
          background: 'linear-gradient(135deg, #b8922d 0%, #C9A84C 40%, #e8c66a 70%, #C9A84C 100%)',
          boxShadow: isLive
            ? '0 4px 24px rgba(52,211,153,0.45), 0 2px 12px rgba(201,168,76,0.25)'
            : '0 4px 20px rgba(201,168,76,0.35)',
        }}
      >
        {isLive && (
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-pulse"
            style={{ border: '2px solid #080808' }}
          />
        )}
        <svg viewBox="0 0 24 24" fill="#0a0a0a" className="w-4 h-4 flex-shrink-0">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
        </svg>
        <span className="font-jakarta font-bold text-sm text-[#0a0a0a] tracking-wide whitespace-nowrap">
          Talk to Midas
        </span>
      </button>

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
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(8,8,8,0.65)', backdropFilter: 'blur(6px)' }}
              onClick={callState === 'active' ? minimizeModal : closeModal}
            />

            {/* Panel */}
            <motion.div
              key="vapi-panel"
              initial={{ opacity: 0, y: 14, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-24 right-6 z-50 w-[320px] rounded-2xl border border-white/10 overflow-hidden"
              style={{
                background: 'rgba(8,8,8,0.97)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
              }}
            >
              {/* Top gold glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
              />

              {/* Minimize button */}
              <button
                onClick={minimizeModal}
                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,240,232,0.35)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-3.5 h-3.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              {/* Header */}
              <div className="px-6 pt-6 pb-5">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)' }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta font-bold text-cream text-sm leading-tight">Talk to Midas</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-emerald-400 text-[11px] font-inter">Available 24/7</span>
                    </div>
                  </div>
                </div>
                <p className="text-cream/60 text-sm font-inter leading-relaxed">
                  <span className="font-semibold text-cream/90">Got roofing questions?</span>{' '}
                  Ask about pricing, inspections, or book a time with the team. No hold times.
                </p>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px" style={{ background: 'rgba(201,168,76,0.08)' }} />

              {/* Voice UI */}
              <div className="px-6 py-6 flex flex-col items-center gap-4">
                <SoundWave active={callState === 'active'} />

                <p
                  className="text-xs font-inter tracking-wide text-center"
                  style={{ color: callError ? '#f87171' : 'rgba(245,240,232,0.3)', minHeight: '1rem' }}
                >
                  {callError
                    ? callError
                    : callState === 'idle'
                    ? 'No hold times — connect instantly'
                    : callState === 'loading'
                    ? 'Connecting you now...'
                    : 'Live — speak freely'}
                </p>

                {callState === 'active' ? (
                  <button
                    onClick={endCall}
                    className="w-full py-3.5 rounded-xl text-sm font-jakarta font-semibold"
                    style={{
                      color: '#f87171',
                      border: '1px solid rgba(239,68,68,0.25)',
                      background: 'rgba(239,68,68,0.07)',
                    }}
                  >
                    End Call
                  </button>
                ) : (
                  <button
                    onClick={startCall}
                    disabled={callState === 'loading'}
                    className="w-full py-3.5 rounded-xl text-sm font-jakarta font-bold text-[#0a0a0a] disabled:opacity-50"
                    style={{ background: 'linear-gradient(135deg, #C9A84C, #e8c66a)' }}
                  >
                    {callState === 'loading' ? 'Connecting...' : 'Start Call'}
                  </button>
                )}

                <p className="text-[10px] font-inter text-center" style={{ color: 'rgba(245,240,232,0.2)' }}>
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
