import { useState } from 'react';
import logoWhite from '../assets/logo-white.png';
export default function ComingSoon() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <div style={{ minHeight: '100dvh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 'var(--space-6)', textAlign: 'center', padding: 'var(--space-6)' }}>
      <img src={logoWhite} alt="SCARVENGE" style={{ height: '80px', marginBottom: 'var(--space-4)' }} />
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', color: '#FFF', letterSpacing: 'var(--tracking-tight)' }}>Something is Hunting</h1>
      <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '380px', lineHeight: 'var(--leading-relaxed)' }}>
        The next drop is coming. Be first to know.
      </p>
      {done ? (
        <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: 'var(--text-lg)' }}>✓ You're on the list. Stay sharp.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '480px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            aria-label="Email address"
            style={{ flex: 1, minWidth: '220px', padding: 'var(--space-4)', background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-md)', color: '#FFF', fontSize: 'var(--text-base)', outline: 'none' }}
          />
          <button type="submit" style={{ padding: 'var(--space-4) var(--space-6)', background: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', whiteSpace: 'nowrap' }}>
            Notify Me
          </button>
        </form>
      )}
    </div>
  );
}
