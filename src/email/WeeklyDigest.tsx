import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export interface DigestPost {
  id: string
  title: string
  deck?: string | null
  author?: string | null
  date: string
  body?: string | null
}

interface Props {
  posts: DigestPost[]
  weekOf: string
  siteUrl: string
}

function extractExcerpt(body: string | null | undefined) {
  if (!body) return null
  const plain = body
    .replace(/```[\s\S]*?```/g, '')          // fenced code blocks (must go first)
    .replace(/~~~[\s\S]*?~~~/g, '')          // alt fenced code blocks
    .replace(/^[-*_]{3,}\s*$/gm, '')        // horizontal rules (---, ***, ___)
    .replace(/#{1,6}\s+[^\n]*/g, '')        // headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')      // bold
    .replace(/\*([^*]+)\*/g, '$1')          // italic
    .replace(/`[^`]+`/g, '')               // remaining inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/^\s*[-*+>]\s+/gm, '')        // list items and blockquote markers
    .replace(/\n+/g, ' ')
    .trim()

  const words = plain.split(/\s+/).filter(Boolean)
  return {
    head: words.slice(0, 40).join(' '),
    mid: words.slice(40, 52).join(' '),
    tail: words.slice(52, 60).join(' '),
    hasMore: words.length > 40,
  }
}

const s = {
  body: { backgroundColor: '#f4efe4', fontFamily: "'Inter', Arial, sans-serif", margin: 0, padding: 0 },
  container: { backgroundColor: '#fbf8f1', margin: '32px auto', padding: '40px 44px', maxWidth: '600px', borderRadius: '4px' },
  headerBorder: { borderTop: '2px solid #221d16', marginBottom: '24px' },
  brand: { fontFamily: "'Newsreader', Georgia, serif", fontSize: '22px', fontWeight: 500, color: '#221d16', margin: '16px 0 2px', letterSpacing: '-0.4px' },
  meta: { fontSize: '13px', color: '#9a9080', margin: '0 0 32px' },
  postTitle: { fontFamily: "'Newsreader', Georgia, serif", fontSize: '21px', fontWeight: 500, color: '#221d16', margin: '0 0 6px', lineHeight: '1.3', letterSpacing: '-0.3px' },
  deck: { fontFamily: "'Newsreader', Georgia, serif", fontSize: '15px', fontStyle: 'italic', color: '#6c6354', margin: '0 0 8px', lineHeight: '1.55' },
  author: { fontFamily: "'Inter', Arial, sans-serif", fontSize: '12px', color: '#9a9080', margin: '0 0 12px', letterSpacing: '0.02em' },
  excerpt: { fontFamily: "'Inter', Arial, sans-serif", fontSize: '14px', color: '#221d16', lineHeight: '1.7', margin: '0 0 10px' },
  midText: { color: '#9a9080' },
  tailText: { color: '#cec8bc' },
  readMore: { color: '#b67d18', textDecoration: 'none', fontSize: '13px', fontWeight: 500, fontFamily: "'Inter', Arial, sans-serif" },
  divider: { borderTop: '1px solid #e3d9c6', margin: '28px 0' },
  footer: { fontSize: '12px', color: '#9a9080', textAlign: 'center' as const, marginTop: '8px', lineHeight: '1.7' },
  unsubscribe: { color: '#9a9080', textDecoration: 'underline' },
}

export default function WeeklyDigest({ posts, weekOf, siteUrl }: Props) {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>{`Your weekly digest from Commonplace — ${posts.length} post${posts.length !== 1 ? 's' : ''} this week`}</Preview>
      <Body style={s.body}>
        <Container style={s.container}>
          <Hr style={s.headerBorder} />
          <Text style={s.brand}>Commonplace.</Text>
          <Text style={s.meta}>Weekly digest · {weekOf}</Text>

          {posts.map((post, i) => {
            const excerpt = extractExcerpt(post.body)
            const url = `${siteUrl}/${post.id}`
            return (
              <Section key={post.id}>
                <Link href={url} style={{ textDecoration: 'none' }}>
                  <Heading as="h2" style={s.postTitle}>{post.title}</Heading>
                </Link>
                {post.deck && <Text style={s.deck}>{post.deck}</Text>}
                {post.author && <Text style={s.author}>By {post.author}</Text>}
                {excerpt && (
                  <Text style={s.excerpt}>
                    {excerpt.head}
                    {excerpt.mid && <span style={s.midText}> {excerpt.mid}</span>}
                    {excerpt.tail && <span style={s.tailText}> {excerpt.tail}</span>}
                    {excerpt.hasMore && '…'}
                  </Text>
                )}
                <Link href={url} style={s.readMore}>Read more →</Link>
                {i < posts.length - 1 && <Hr style={s.divider} />}
              </Section>
            )
          })}

          <Hr style={{ ...s.divider, marginTop: '36px' }} />
          <Text style={s.footer}>
            You&apos;re receiving this because you subscribed to Commonplace.{'\n'}
            <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={s.unsubscribe}>Unsubscribe</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
