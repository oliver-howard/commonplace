'use client'
import { useRouter } from 'next/navigation'
import type { Post } from '@/types'
import { useTheme } from '@/hooks/useTheme'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ArticleView } from '@/components/ArticleView'

export function ArticlePageClient({ post, relatedPosts }: { post: Post; relatedPosts: Post[] }) {
  const { theme, toggle } = useTheme()
  const router = useRouter()

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased' }}>
      <Nav theme={theme} onToggleTheme={toggle} onGoHome={() => router.push('/')} />
      <main className="screen-enter" style={{ paddingTop: 64, minHeight: '100vh' }}>
        <ArticleView
          post={post}
          relatedPosts={relatedPosts}
          onGoHome={() => router.push('/')}
          onOpenPost={(id) => router.push(`/${id}`)}
        />
      </main>
      <Footer />
    </div>
  )
}
