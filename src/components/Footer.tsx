export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div style={{
        maxWidth: 1180,
        margin: '0 auto',
        padding: '48px 32px',
      }}>
        <div style={{ maxWidth: '30ch' }}>
          <div style={{
            fontFamily: "'Newsreader', serif",
            fontWeight: 600,
            fontSize: 21,
            letterSpacing: '-0.015em',
            color: 'var(--text)',
            marginBottom: 10,
          }}>
            Commonplace<span style={{ color: 'var(--accent)' }}>.</span>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, color: 'var(--text-faint)' }}>
            © 2026 · A shared commonplace book
          </div>
        </div>
      </div>
    </footer>
  );
}
