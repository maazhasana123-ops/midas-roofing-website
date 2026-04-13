export default function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-2">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
      <div className="w-1 h-1 rotate-45 bg-gold/70" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  )
}
