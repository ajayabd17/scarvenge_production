import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
export default function Account() {
  const [tab, setTab]     = useState('login');
  const [showPw, setShowPw] = useState(false);
  const inputStyle = { width: '100%', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface-raised)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)', fontSize: 'var(--text-base)', outline: 'none' };
  const labelStyle = { fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-secondary)' };
  return (
    <div className="page-enter" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8) var(--space-4)' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: 'var(--space-6)' }}>
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: 'var(--space-3)', fontWeight: 600, fontSize: 'var(--text-sm)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'capitalize', letterSpacing: 'var(--tracking-wide)', borderBottom: tab === t ? '2px solid var(--color-primary)' : '2px solid transparent', color: tab === t ? 'var(--color-primary)' : 'var(--color-text-secondary)', transition: 'all var(--duration-fast)' }}>
              {tab === t ? t.toUpperCase() : t.toUpperCase()}
            </button>
          ))}
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} onSubmit={e => e.preventDefault()}>
          {tab === 'register' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <label htmlFor="acc-name" style={labelStyle}>Full Name</label>
              <input id="acc-name" type="text" required style={inputStyle} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label htmlFor="acc-email" style={labelStyle}>Email</label>
            <input id="acc-email" type="email" required style={inputStyle} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <label htmlFor="acc-pw" style={labelStyle}>Password</label>
            <div style={{ position: 'relative' }}>
              <input id="acc-pw" type={showPw ? 'text' : 'password'} required style={{ ...inputStyle, paddingRight: '48px' }} />
              <button type="button" onClick={() => setShowPw(s => !s)} style={{ position: 'absolute', right: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex' }} aria-label={showPw ? 'Hide password' : 'Show password'}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" style={{ padding: 'var(--space-4)', background: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', fontSize: 'var(--text-base)' }}>
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
          {tab === 'login' && (
            <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'underline', alignSelf: 'center' }}>
              Forgot Password?
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
