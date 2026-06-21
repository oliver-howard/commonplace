'use client'
import { useState } from 'react';
import { PortableText } from '@portabletext/react';
import type { Post } from '../types';
import { ImageSlot } from './ImageSlot';

interface ArticleViewProps {
  post: Post;
  relatedPosts: Post[];
  onGoHome: () => void;
  onOpenPost: (id: string) => void;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 19, lineHeight: 1.78, color: 'var(--text)', margin: '0 0 24px' }}>
        {children}
      </p>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: 27, lineHeight: 1.15, letterSpacing: '-0.012em', color: 'var(--text)', margin: '40px 0 16px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.012em', color: 'var(--text)', margin: '40px 0 16px' }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 27, lineHeight: 1.38, color: 'var(--text)', borderLeft: '3px solid var(--accent)', paddingLeft: 26, margin: '38px 0' }}>
        {children}
      </blockquote>
    ),
  },
}

function RelatedCard({ post, onOpen }: { post: Post; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 9 }}
    >
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>
        {post.category}
      </div>
      <h4 style={{
        fontFamily: "'Newsreader', serif",
        fontWeight: 500,
        fontSize: 21,
        lineHeight: 1.16,
        letterSpacing: '-0.012em',
        margin: 0,
        color: 'var(--text)',
        width: 'fit-content',
        backgroundImage: 'linear-gradient(var(--accent),var(--accent))',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 100%',
        backgroundSize: hovered ? '100% 1.5px' : '0% 1.5px',
        transition: 'background-size 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {post.title}
      </h4>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-soft)' }}>
        {post.author} · {post.read}
      </span>
    </div>
  );
}

export function ArticleView({ post, relatedPosts, onGoHome, onOpenPost }: ArticleViewProps) {
  return (
    <article style={{ maxWidth: 880, margin: '0 auto', padding: '48px 32px 80px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <BackLink onGoHome={onGoHome} />

        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 18 }}>
          {post.category}
        </div>
        <h1 style={{ fontFamily: "'Newsreader', serif", fontWeight: 500, fontSize: 'clamp(34px, 4.4vw, 58px)', lineHeight: 1.04, letterSpacing: '-0.022em', margin: '0 0 20px', color: 'var(--text)' }}>
          {post.title}
        </h1>
        <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 'clamp(19px, 1.7vw, 23px)', lineHeight: 1.5, color: 'var(--text-soft)', margin: '0 0 30px' }}>
          {post.deck}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 30, borderBottom: '1px solid var(--hair)' }}>
          <span style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--avatar-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Newsreader', serif", fontSize: 17, color: 'var(--text-soft)', flex: 'none' }}>
            {post.initials}
          </span>
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{post.author}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: 'var(--text-soft)' }}>{post.read} read · {post.date}</div>
          </div>
        </div>
      </div>

      <ImageSlot id={`hero-${post.id}`} src={post.coverImage} style={{ width: '100%', aspectRatio: '16/9', display: 'block', margin: '36px 0 44px' }} radius={8} />

      <div className="post-body" style={{ maxWidth: 680, margin: '0 auto' }}>
        {post.body && post.body.length > 0
          ? <PortableText value={post.body} components={portableTextComponents} />
          : null
        }
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '38px 0 0' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-soft)', border: '1px solid var(--border)', borderRadius: 999, padding: '6px 14px' }}>
            {post.category}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', borderTop: '1px solid var(--hair)', paddingTop: 32, marginTop: 40 }}>
          <span style={{ width: 50, height: 50, borderRadius: '50%', background: 'var(--avatar-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Newsreader', serif", fontSize: 19, color: 'var(--text-soft)', flex: 'none' }}>
            {post.initials}
          </span>
          <div>
            <div style={{ fontFamily: "'Newsreader', serif", fontWeight: 600, fontSize: 19, color: 'var(--text)' }}>{post.author}</div>
          </div>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section style={{ maxWidth: 880, margin: '56px auto 0', borderTop: '1px solid var(--hair)', paddingTop: 36 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 24 }}>
            Keep reading
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 34 }}>
            {relatedPosts.map(p => (
              <RelatedCard key={p.id} post={p} onOpen={() => onOpenPost(p.id)} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function BackLink({ onGoHome }: { onGoHome: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      onClick={onGoHome}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: hovered ? 'var(--accent)' : 'var(--text-soft)',
        textDecoration: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        marginBottom: 38,
        transition: 'color 0.2s',
      }}
    >
      ← Back to the front page
    </a>
  );
}
