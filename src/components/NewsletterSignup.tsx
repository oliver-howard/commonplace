'use client'
import { useState } from 'react'

export function NewsletterSection() {
  return (
    <section style={{ borderTop: '1px solid var(--hair)', paddingTop: 36, marginTop: 56 }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>
        Newsletter
      </div>
      <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: 20, lineHeight: 1.5, color: 'var(--text-soft)', margin: '0 0 20px', maxWidth: '44ch' }}>
        Get new posts in your inbox each week.
      </p>
      <NewsletterSignup />
    </section>
  )
}

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-soft)', margin: 0 }}>
        You&apos;re subscribed.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === 'loading'}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          padding: '8px 12px',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          color: 'var(--text)',
          backgroundColor: 'var(--bg-elev)',
          outline: 'none',
          flexGrow: 1,
          minWidth: '200px',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 500,
          padding: '8px 16px',
          backgroundColor: 'var(--text)',
          color: 'var(--bg)',
          border: 'none',
          borderRadius: '4px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
          whiteSpace: 'nowrap',
        }}
      >
        {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--callout-red)', margin: 0, width: '100%' }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  )
}
