import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Missing revalidation secret' }, { status: 500 })
  }

  const body = await req.text()
  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? ''

  const valid = await isValidSignature(body, signature, secret)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const payload = JSON.parse(body) as { slug?: { current?: string } }
  const slug = payload?.slug?.current

  revalidatePath('/')
  if (slug) {
    revalidatePath(`/${slug}`)
  }

  return NextResponse.json({ revalidated: true, slug: slug ?? null })
}
