import { notFound } from 'next/navigation'
import { POSTS } from '@/data/posts'
import { ArticlePageClient } from './_client'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = POSTS.find(p => p.id === slug)
  if (!post) return notFound()
  const relatedPosts = POSTS.filter(p => p.id !== post.id).slice(0, 3)
  return <ArticlePageClient post={post} relatedPosts={relatedPosts} />
}
