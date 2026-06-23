import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Next.js 16 moved these to dist/api but ships no package.json exports
      // field, so Turbopack can't auto-discover the subpath files.
      'next/headers': 'next/dist/api/headers',
      'next/navigation': 'next/dist/api/navigation',
      'next/constants': 'next/dist/api/constants',
    },
  },
}

export default nextConfig
