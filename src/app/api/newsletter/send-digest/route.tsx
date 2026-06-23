import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { client } from '@/sanity/lib/client'
import { WEEKLY_POSTS_QUERY } from '@/sanity/lib/queries'
import WeeklyDigest from '@/email/WeeklyDigest'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (!process.env.DIGEST_SECRET || auth !== `Bearer ${process.env.DIGEST_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID
  const from = process.env.RESEND_FROM_EMAIL
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!audienceId || !from || !siteUrl) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const posts = await client.withConfig({ useCdn: false }).fetch(WEEKLY_POSTS_QUERY, { since })

  if (!posts?.length) {
    return NextResponse.json({ message: 'No posts this week', sent: 0 })
  }

  const weekOf = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  const html = await render(
    <WeeklyDigest posts={posts} weekOf={weekOf} siteUrl={siteUrl} />
  )

  const { data, error } = await resend.broadcasts.create({
    audienceId,
    from,
    subject: `Commonplace — Weekly Digest, ${weekOf}`,
    html,
    send: true,
  })

  if (error) {
    console.error('Broadcast create error:', error)
    return NextResponse.json({ error: 'Broadcast failed' }, { status: 500 })
  }

  return NextResponse.json({ broadcastId: data?.id, posts: posts.length })
}
