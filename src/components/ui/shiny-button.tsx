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

// ── Solid gold (primary) ─────────────────────────────────────────────────────
// Shiny gradient sweeps left-to-right on hover, gold inner glow on focus
const solidStyles =
  'rounded-sm text-dark overflow-hidden ' +
  'bg-[linear-gradient(325deg,#B8912A_0%,#F0D070_45%,#E8C46A_55%,#B8912A_90%)] ' +
  'bg-[length:280%_auto] bg-left ' +
  'shadow-[0px_0px_18px_rgba(201,168,76,0.35),0px_4px_8px_-2px_rgba(0,0,0,0.4),inset_3px_3px_8px_rgba(240,208,112,0.45),inset_-3px_-3px_8px_rgba(140,100,20,0.3)] ' +
  'hover:bg-right hover:shadow-[0px_0px_32px_rgba(201,168,76,0.65),0px_8px_24px_-4px_rgba(0,0,0,0.45),inset_3px_3px_8px_rgba(240,208,112,0.45),inset_-3px_-3px_8px_rgba(140,100,20,0.3)] ' +
  'hover:-translate-y-[2px] hover:duration-700 '

// ── Outline gold (secondary) ─────────────────────────────────────────────────
// Border + text gold → fills with shiny gradient on hover
const outlineStyles =
  'rounded-sm border border-gold text-gold overflow-hidden ' +
  'bg-[linear-gradient(325deg,#B8912A_0%,#F0D070_45%,#E8C46A_55%,#B8912A_90%)] ' +
  'bg-[length:280%_auto] bg-[position:200%_center] ' +
  'shadow-[inset_0_0_0_1px_rgba(201,168,76,0.5)] ' +
  'hover:text-dark hover:bg-[position:right_center] ' +
  'hover:shadow-[0px_0px_28px_rgba(201,168,76,0.5),0px_6px_20px_-4px_rgba(0,0,0,0.4),inset_3px_3px_6px_rgba(240,208,112,0.35),inset_-3px_-3px_6px_rgba(140,100,20,0.25)] ' +
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
