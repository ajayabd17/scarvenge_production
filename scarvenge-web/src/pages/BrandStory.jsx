import { Link } from 'react-router-dom';
import logoBlack from '../assets/logo-black.png';
import logoWhite from '../assets/logo-white.png';
import product2 from '../assets/product-2.jpeg';
import product3 from '../assets/product-3.jpeg';
import { useTheme } from '../context/ThemeContext';

export default function BrandStory() {
  const { theme } = useTheme();
  const S = { color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-base)' };

  return (
    <div className="page-enter">
      <div style={{
        background: 'var(--color-secondary)',
        minHeight: '50vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: 'var(--space-4)',
        textAlign: 'center', padding: 'var(--space-10) var(--space-4)'
      }}>
        <img src={logoWhite} alt="" style={{ width: '64px', opacity: 0.9 }} />
        <h1 style={{ fontSize: 'var(--text-3xl)', color: '#FFF', letterSpacing: 'var(--tracking-tight)' }}>
          Born from the Grind
        </h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', lineHeight: 'var(--leading-relaxed)' }}>
          SCARVENGE wasn't built in a boardroom. It was built at 5AM in a garage, between sets, between failures.
        </p>
      </div>
      <div className="container section">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: '900px', margin: '0 auto' }}>
          <img src={product2} alt="SCARVENGE athlete"
            style={{ borderRadius: 'var(--radius-xl)', width: '100%', aspectRatio: '16/9', objectFit: 'cover', objectPosition: 'top' }}
            loading="lazy" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)' }}>Our Story</h2>
            <p style={S}>We believe the gym doesn't make you — but it reveals you. Every piece we make carries that belief in its fabric. SCARVENGE was born for the athlete who knows that comfort is the enemy of progress, and that every rep, every set, every early morning matters.</p>
            <p style={S}>Our fabrics are selected for performance. Our cuts are engineered for movement. Our quality is non-negotiable. This is not fast fashion. This is armour.</p>
          </div>
          <img src={product3} alt="SCARVENGE compression tee"
            style={{ borderRadius: 'var(--radius-xl)', width: '100%', aspectRatio: '16/9', objectFit: 'cover', objectPosition: 'top' }}
            loading="lazy" />
          <div>
            <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>Our Mission</h2>
            <p style={S}>To equip every athlete — from the beginner to the competitor — with gear that matches their ambition. No compromises. No shortcuts. Only performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
