import type { CSSProperties } from 'react';

const PALETTE = [
  '#d4cbb8', '#c9bfac', '#bfb5a0', '#d8d0be',
  '#cec4b0', '#e0d8c6', '#c4b9a4',
];

function colorFor(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

interface ImageSlotProps {
  id: string;
  style?: CSSProperties;
  radius?: number;
}

export function ImageSlot({ id, style, radius = 6 }: ImageSlotProps) {
  return (
    <div
      style={{
        background: colorFor(id),
        borderRadius: radius,
        ...style,
      }}
    />
  );
}
