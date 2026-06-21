'use client'
import dynamic from 'next/dynamic'

const StudioLoader = dynamic(() => import('./_studio-loader'), { ssr: false })

export function StudioPageClient() {
  return <StudioLoader />
}
