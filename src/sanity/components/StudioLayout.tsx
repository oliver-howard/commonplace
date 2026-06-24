import { type LayoutProps } from 'sanity'

// CSS directly overrides @sanity/ui's --card-* custom properties.
// Sanity cards use data-scheme + data-tone attributes; targeting those
// attributes with !important wins over the styled-component class rules.
const LIGHT = {
  bg: '#ddd3be',
  bgElev: '#f4efe4',
  fg: '#2e2519',
  border: '#faf7f2',
  mutedFg: '#6c6354',
  focusRing: '#d99a2b',
  accent: '#b67d18',
  codeBg: '#ece3d2',
  shadow: 'rgba(34,29,22,0.12)',
}

const DARK = {
  bg: '#221d16',
  bgElev: '#2e2519',
  fg: '#ece3d2',
  border: '#4a4033',
  mutedFg: '#c8bba3',
  focusRing: '#d99a2b',
  accent: '#d99a2b',
  codeBg: '#2e2519',
  shadow: 'rgba(0,0,0,0.4)',
}

const THEME_CSS = `
  [data-scheme="light"][data-tone="default"],
  [data-scheme="light"][data-tone="transparent"],
  [data-scheme="light"][data-tone="neutral"] {
    --card-bg-color: ${LIGHT.bg} !important;
    --card-muted-bg-color: ${LIGHT.bgElev} !important;
    --card-fg-color: ${LIGHT.fg} !important;
    --card-muted-fg-color: ${LIGHT.mutedFg} !important;
    --card-border-color: ${LIGHT.border} !important;
    --card-icon-color: ${LIGHT.mutedFg} !important;
    --card-accent-fg-color: ${LIGHT.accent} !important;
    --card-link-fg-color: ${LIGHT.accent} !important;
    --card-focus-ring-color: ${LIGHT.focusRing} !important;
    --card-code-bg-color: ${LIGHT.codeBg} !important;
    --card-shadow-umbra-color: ${LIGHT.shadow} !important;
    --card-shadow-penumbra-color: ${LIGHT.shadow} !important;
    --card-shadow-ambient-color: ${LIGHT.shadow} !important;
    --card-skeleton-color-from: ${LIGHT.border} !important;
    --card-skeleton-color-to: ${LIGHT.bgElev} !important;
  }

  [data-scheme="dark"][data-tone="default"],
  [data-scheme="dark"][data-tone="transparent"],
  [data-scheme="dark"][data-tone="neutral"] {
    --card-bg-color: ${DARK.bg} !important;
    --card-muted-bg-color: ${DARK.bgElev} !important;
    --card-fg-color: ${DARK.fg} !important;
    --card-muted-fg-color: ${DARK.mutedFg} !important;
    --card-border-color: ${DARK.border} !important;
    --card-icon-color: ${DARK.mutedFg} !important;
    --card-accent-fg-color: ${DARK.accent} !important;
    --card-link-fg-color: ${DARK.accent} !important;
    --card-focus-ring-color: ${DARK.focusRing} !important;
    --card-code-bg-color: ${DARK.codeBg} !important;
    --card-shadow-umbra-color: ${DARK.shadow} !important;
    --card-shadow-penumbra-color: ${DARK.shadow} !important;
    --card-shadow-ambient-color: ${DARK.shadow} !important;
    --card-skeleton-color-from: ${DARK.border} !important;
    --card-skeleton-color-to: ${DARK.bgElev} !important;
  }

  [data-scheme="light"] body,
  [data-scheme="light"][data-ui="Card"] {
    background-color: ${LIGHT.bg};
  }

  [data-scheme="dark"] body,
  [data-scheme="dark"][data-ui="Card"] {
    background-color: ${DARK.bg};
  }
`

export function StudioLayout({ renderDefault, ...props }: LayoutProps) {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: THEME_CSS }} />
      {renderDefault({ renderDefault, ...props })}
    </>
  )
}
