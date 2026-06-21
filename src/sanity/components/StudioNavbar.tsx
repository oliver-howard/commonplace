import type { NavbarProps } from 'sanity'

export function StudioNavbar(props: NavbarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', justifyContent: 'center' }}>
      <a
        href="/"
        style={{
          position: 'absolute',
          left: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '0 16px',
          fontSize: '13px',
          fontWeight: 500,
          color: 'var(--card-fg-color)',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          opacity: 0.7,
          flexShrink: 0,
          zIndex: 1,
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.7')}
      >
        ← Site
      </a>
      {props.renderDefault(props)}
    </div>
  )
}
