import { Link } from 'react-router-dom';
import logoBlack from '../assets/logo-black.png';
import logoWhite from '../assets/logo-white.png';
import { useTheme } from '../context/ThemeContext';
export default function NotFound() {
  const { theme } = useTheme();
  return (
    <div className="page-enter" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
        <img
          src={theme === 'dark' ? logoWhite : logoBlack}
          alt="SCARVENGE"
          style={{ height: '64px', margin: '0 auto', display: 'block', marginBottom: 'var(--space-6)', opacity: 0.3 }}
        />
        <h1 style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--color-primary)', lineHeight: 1, marginBottom: 'var(--space-3)', fontFamily: 'var(--font-heading)' }}>
          404
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>Page Not Found</p>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-7)', maxWidth: '360px', margin: '0 auto var(--space-7)', lineHeight: 'var(--leading-relaxed)' }}>
          This prey has escaped. Let's get you back on the hunt.
        </p>
        <Link
          to="/"
          style={{ padding: 'var(--space-4) var(--space-8)', background: 'var(--color-primary)', color: '#FFF', borderRadius: 'var(--radius-md)', fontWeight: 700, display: 'inline-block', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
