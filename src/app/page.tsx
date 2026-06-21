import { sanityFetch } from '@/sanity/lib/live'
import { ALL_POSTS_QUERY } from '@/sanity/lib/queries'
import { HomePageClient } from './_client'
import type { Post } from '@/types'

export default async function HomePage() {
  const { data } = await sanityFetch({ query: ALL_POSTS_QUERY })
  const raw = data as Array<Post & { date: string }> | null

  const posts: Post[] = (raw ?? []).map(p => ({
    ...p,
    date: p.date
      ? new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : '',
  }))

  return <HomePageClient posts={posts} />
}
