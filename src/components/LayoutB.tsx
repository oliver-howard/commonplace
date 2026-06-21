import { useState } from 'react';
import type { Post } from '../types';
import { CURRENTLY } from '../data/currently';
import { ImageSlot } from './ImageSlot';

interface LayoutBProps {
  posts: Post[];
  onOpenPost: (id: string) => void;
}

function HoverTitle({ children, fontSize = 24, style }: { children: React.ReactNode; fontSize?: number; style?: React.CSSProperties }) {
  const [hovered, setHovered] = useState(false);
  return (
    <h3
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Newsreader', serif",
        fontWeight: 500,
        fontSize,
        lineHeight: 1.14,
        letterSpacing: '-0.012em',
        margin: '0 0 9px',
        color: 'var(--text)',
        width: 'fit-content',
        backgroundImage: 'linear-gradient(var(--accent),var(--accent))',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0 100%',
        backgroundSize: hovered ? '100% 1.5px' : '0% 1.5px',
        transition: 'background-size 0.35s cubic-bezier(0.22,1,0.36,1)',
        ...style,
      }}
    >
      {children}
    </h3>
  );
}

export function LayoutB({ posts, onOpenPost }: LayoutBProps) {
  const p0 = posts[0];
  const mainStack = posts.slice(1, 5);
  const railList = posts.slice(0, 6).map((p, i) => ({ ...p, num: String(i + 1).padStart(2, '0') }));
  const categories = ['Updates', 'Ponderings', 'Opinions', 'Field Notes'];

  if (!p0) return null;

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '36px 32px 96px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 66, alignItems: 'start' }}>
      {/* Main column */}
      <div>
        <div onClick={() => onOpenPost(p0.id)} style={{ cursor: 'pointer' }}>
          <ImageSlot id={`img-${p0.id}`} style={{ width: '100%', aspectRatio: '16/10', display: 'block', marginBottom: 26 }} radius={8} />
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
            {p0.category} · Featured
          </div>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontWeight: 500, fontSize: 'clamp(32px, 3.6vw, 52px)', lineHeight: 1.04, letterSpacing: '-0.02em', margin: '0 0 16px', color: 'var(--text)' }}>
            {p0.title}
          </h1>
          <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 21, lineHeight: 1.5, color: 'var(--text-soft)', maxWidth: '46ch', margin: '0 0 20px' }}>
            {p0.deck}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--avatar-bg)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Newsreader', serif", fontSize: 12, color: 'var(--text-soft)', flex: 'none' }}>
              {p0.initials}
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'var(--text-soft)' }}>
              {p0.author} · {p0.read} · {p0.date}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 44, borderTop: '1px solid var(--hair)' }}>
          {mainStack.map(post => (
            <div
              key={post.id}
              onClick={() => onOpenPost(post.id)}
              style={{ display: 'grid', gridTemplateColumns: '138px 1fr', gap: 24, padding: '26px 0', borderBottom: '1px solid var(--hair)', cursor: 'pointer', alignItems: 'center' }}
            >
              <ImageSlot id={`img-${post.id}`} style={{ width: 138, aspectRatio: '1.4/1', display: 'block' }} radius={6} />
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10.5, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 9 }}>
                  {post.category}
                </div>
                <HoverTitle>{post.title}</HoverTitle>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-soft)' }}>
                  {post.author} · {post.read}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 4 }}>
          Latest
        </div>
        <div>
          {railList.map(post => (
            <RailItem key={post.id} post={post} onOpen={() => onOpenPost(post.id)} />
          ))}
        </div>

        {/* Currently widget */}
        <div style={{ marginTop: 36, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 16, padding: 22 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4 }}>
            Currently
          </div>
          {CURRENTLY.map(c => (
            <div key={c.who} style={{ padding: '13px 0', borderTop: '1px solid var(--hair)' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                {c.who} <span style={{ color: 'var(--text-soft)', fontWeight: 400 }}>· {c.where}</span>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'var(--text-soft)', marginTop: 2 }}>{c.weather}</div>
              <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 14, color: 'var(--accent)', marginTop: 3 }}>{c.doing}</div>
            </div>
          ))}
        </div>

        {/* Browse categories */}
        <div style={{ marginTop: 30 }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 14 }}>
            Browse
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map(cat => (
              <CategoryPill key={cat} label={cat} />
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

function RailItem({ post, onOpen }: { post: Post & { num: string }; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, padding: '17px 0', borderTop: '1px solid var(--hair)', cursor: 'pointer', alignItems: 'baseline' }}
    >
      <span style={{ fontFamily: "'Newsreader', serif", fontSize: 17, color: 'var(--text-faint)', fontWeight: 400 }}>{post.num}</span>
      <div>
        <h4 style={{
          fontFamily: "'Newsreader', serif",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.22,
          letterSpacing: '-0.01em',
          margin: '0 0 5px',
          color: 'var(--text)',
          width: 'fit-content',
          backgroundImage: 'linear-gradient(var(--accent),var(--accent))',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 100%',
          backgroundSize: hovered ? '100% 1px' : '0% 1px',
          transition: 'background-size 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}>
          {post.title}
        </h4>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: 'var(--text-soft)' }}>{post.author}</span>
      </div>
    </div>
  );
}

function CategoryPill({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        color: hovered ? 'var(--accent)' : 'var(--text-soft)',
        border: '1px solid',
        borderColor: hovered ? 'var(--accent)' : 'var(--border)',
        borderRadius: 999,
        padding: '6px 14px',
        cursor: 'pointer',
        transition: 'border-color 0.2s, color 0.2s',
      }}
    >
      {label}
    </span>
  );
}
