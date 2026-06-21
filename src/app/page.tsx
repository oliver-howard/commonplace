'use client'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/hooks/useTheme'
import { POSTS } from '@/data/posts'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { LayoutB } from '@/components/LayoutB'

export default function HomePage() {
  const { theme, toggle } = useTheme()
  const router = useRouter()

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <Nav theme={theme} onToggleTheme={toggle} onGoHome={() => router.push('/')} />
      <main className="screen-enter" style={{ paddingTop: 64, minHeight: '100vh' }}>
        <LayoutB posts={POSTS} onOpenPost={(id) => router.push(`/${id}`)} />
      </main>
      <Footer />
    </div>
  )
}
