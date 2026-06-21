import { useState } from 'react';
import { POSTS, CATEGORIES } from '../data/posts';

interface FilterBarProps {
  filterCategory: string;
  filterAuthor: string;
  onSetCategory: (c: string) => void;
  onSetAuthor: (a: string) => void;
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  const base: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12.5,
    fontWeight: 500,
    borderRadius: 999,
    padding: '7px 15px',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s, color 0.2s',
    whiteSpace: 'nowrap',
    border: '1px solid',
  };

  const activeStyle: React.CSSProperties = {
    ...base,
    background: 'var(--accent)',
    color: 'var(--accent-on)',
    borderColor: 'var(--accent)',
  };

  const idleStyle: React.CSSProperties = {
    ...base,
    background: 'transparent',
    color: hovered ? 'var(--accent)' : 'var(--text-soft)',
    borderColor: hovered ? 'var(--accent)' : 'var(--border)',
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={active ? activeStyle : idleStyle}
    >
      {label}
    </button>
  );
}

export function FilterBar({ filterCategory, filterAuthor, onSetCategory, onSetAuthor }: FilterBarProps) {
  const authorNames = Array.from(new Set(POSTS.map(p => p.author)));
  const authorOptions = [{ label: 'All', value: 'All' }, ...authorNames.map(n => ({ label: n.split(' ')[0], value: n }))];

  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 32px 6px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
        {CATEGORIES.map(c => (
          <Chip key={c} label={c} active={filterCategory === c} onClick={() => onSetCategory(c)} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {authorOptions.map(a => (
          <Chip key={a.value} label={a.label} active={filterAuthor === a.value} onClick={() => onSetAuthor(a.value)} />
        ))}
      </div>
    </section>
  );
}
