'use client'

import { useState } from 'react'
import { LayoutPreloader } from '@/components/ui/layout-preloader'

export default function PreloaderWrapper() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return <LayoutPreloader onComplete={() => setVisible(false)} />
}
