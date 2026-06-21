export function EmptyState() {
  return (
    <section style={{ maxWidth: 1180, margin: '0 auto', padding: '90px 32px 140px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 30, lineHeight: 1.2, color: 'var(--text-soft)', marginBottom: 12 }}>
        Nothing here yet.
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'var(--text-faint)' }}>
        No stories match this filter — try another topic or writer.
      </div>
    </section>
  );
}
