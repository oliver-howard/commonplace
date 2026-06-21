import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { POST_BY_SLUG_QUERY, ALL_POSTS_QUERY } from '@/sanity/lib/queries'
import { ArticlePageClient } from './_client'
import type { Post } from '@/types'

function formatDate(iso: string) {
  return iso
    ? new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : ''
}

function sanityToPost(p: Post & { date: string }): Post {
  return { ...p, date: formatDate(p.date) }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: rawPost } = await sanityFetch({ query: POST_BY_SLUG_QUERY, params: { slug } })
  const sanityPost = rawPost as (Post & { date: string }) | null

  if (!sanityPost) return notFound()

  const post = sanityToPost(sanityPost)
  const { data: rawAll } = await sanityFetch({ query: ALL_POSTS_QUERY })
  const related: Post[] = ((rawAll ?? []) as Array<Post & { date: string }>)
    .filter(p => p.id !== slug)
    .slice(0, 3)
    .map(sanityToPost)

  return <ArticlePageClient post={post} relatedPosts={related} />
}
