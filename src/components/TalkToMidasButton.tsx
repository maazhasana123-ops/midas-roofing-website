'use client'

export default function TalkToMidasButton({ className }: { className?: string }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openVapiModal'))
  }

  return (
    <button onClick={handleClick} className={className ?? 'btn-outline-gold'}>
      Talk to Midas
    </button>
  )
}
