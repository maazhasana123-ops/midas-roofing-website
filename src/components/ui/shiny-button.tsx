'use client'

import React from 'react'
import Link from 'next/link'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs))
}

// ── Shared base ──────────────────────────────────────────────────────────────
const base =
  'relative inline-flex items-center justify-center gap-2 font-jakarta font-semibold tracking-wide select-none cursor-pointer whitespace-nowrap transition-[box-shadow,transform] duration-200 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark'

// ── Solid gold (primary) — filled gradient, dark text (gold coin) ─────────────
const solidStyles =
  'rounded-full overflow-hidden ' +
  '[color:#080808] ' +
  'bg-[linear-gradient(325deg,#C9A84C_0%,#F0D070_55%,#C9A84C_90%)] ' +
  'bg-[length:280%_auto] bg-left ' +
  'shadow-[0px_0px_20px_rgba(201,168,76,0.45),0px_5px_8px_-2px_rgba(0,0,0,0.5),inset_0px_1px_0px_rgba(255,255,255,0.25)] ' +
  'hover:bg-right hover:shadow-[0px_0px_36px_rgba(201,168,76,0.7),0px_8px_20px_-4px_rgba(0,0,0,0.5),inset_0px_1px_0px_rgba(255,255,255,0.3)] ' +
  'hover:-translate-y-[2px] hover:duration-700 '

// ── Outline gold (secondary) — transparent at rest, fills on hover ────────────
const outlineStyles =
  'rounded-full border border-gold/60 bg-transparent ' +
  '[color:#C9A84C] ' +
  'hover:[color:#080808] hover:border-transparent ' +
  'hover:bg-[linear-gradient(325deg,#C9A84C_0%,#F0D070_55%,#C9A84C_90%)] ' +
  'hover:shadow-[0px_0px_28px_rgba(201,168,76,0.55),0px_6px_16px_-4px_rgba(0,0,0,0.5),inset_0px_1px_0px_rgba(255,255,255,0.25)] ' +
  'hover:-translate-y-[2px] hover:duration-700 '

// ─────────────────────────────────────────────────────────────────────────────
// ShinyButton — renders a <button>
// ─────────────────────────────────────────────────────────────────────────────
interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function ShinyButton({
  children = 'Get Started',
  variant = 'solid',
  size = 'md',
  className,
  ...props
}: ShinyButtonProps) {
  const sizeClass =
    size === 'sm' ? 'text-xs px-5 py-2.5 h-10' :
    size === 'lg' ? 'text-base px-10 py-5 h-14' :
                    'text-sm px-8 py-4 h-12'

  return (
    <button
      type="button"
      className={cn(
        base,
        sizeClass,
        variant === 'outline' ? outlineStyles : solidStyles,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ShinyLink — same visual, but renders a Next.js <Link> for navigation
// ─────────────────────────────────────────────────────────────────────────────
interface ShinyLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: React.ReactNode
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function ShinyLink({
  href,
  children = 'Get Started',
  variant = 'solid',
  size = 'md',
  className,
  ...props
}: ShinyLinkProps) {
  const sizeClass =
    size === 'sm' ? 'text-xs px-5 py-2.5 h-10' :
    size === 'lg' ? 'text-base px-10 py-5 h-14' :
                    'text-sm px-8 py-4 h-12'

  return (
    <Link
      href={href}
      className={cn(
        base,
        sizeClass,
        variant === 'outline' ? outlineStyles : solidStyles,
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export default ShinyButton
