import type { Viewport } from 'next'
import { StudioPageClient } from './_studio-client'

export const dynamic = 'force-static'

export const metadata = { robots: { index: false } }
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default function StudioPage() {
  return <StudioPageClient />
}
