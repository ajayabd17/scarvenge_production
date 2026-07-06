import logoBlack from '../assets/logo-black.png';
import logoWhite from '../assets/logo-white.png';
import { useTheme } from '../context/ThemeContext';
export default function About() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;
  const values = [
    ['Uncompromising Quality', 'We refuse to cut corners. Every stitch, every seam, every fabric choice is deliberate.'],
    ['Athlete-First Design', "Every product is tested by real athletes. If it doesn't perform, it doesn't ship."],
    ['Predator Mentality', 'We build for those who approach training with the hunger of a predator. No excuses.'],
    ['Community First', 'SCARVENGE is not just a brand — it\'s a community of people who refuse to settle.'],
  ];
  return (
    <div className="page-enter">
      <div className="container section">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-9)' }}>
          <img src={logoSrc} alt="SCARVENGE" style={{ height: '56px', margin: '0 auto', display: 'block', marginBottom: 'var(--space-5)' }} />
          <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)' }}>About SCARVENGE</h1>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)', maxWidth: '540px', margin: 'var(--space-4) auto', lineHeight: 'var(--leading-relaxed)' }}>
            Premium activewear engineered for those who train without limits. Built for predators.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
          {values.map(([title, desc]) => (
            <div key={title} style={{ padding: 'var(--space-6)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>{title}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
