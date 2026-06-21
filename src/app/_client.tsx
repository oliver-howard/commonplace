'use client'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/hooks/useTheme'
import type { Post } from '@/types'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { HomeFeed } from '@/components/HomeFeed'

export function HomePageClient({ posts }: { posts: Post[] }) {
  const { theme, toggle } = useTheme()
  const router = useRouter()

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <Nav theme={theme} onToggleTheme={toggle} onGoHome={() => router.push('/')} />
      <main className="screen-enter" style={{ paddingTop: 64, minHeight: '100vh' }}>
        <HomeFeed posts={posts} onOpenPost={(id) => router.push(`/${id}`)} />
      </main>
      <Footer />
    </div>
  )
}
