const makeSimplePage = (title, subtitle, items) => {
  return { title, subtitle, items };
};

const PAGES_DATA = {
  care: makeSimplePage('Care Instructions', 'Follow these guidelines to keep your SCARVENGE gear performing at its best.', [
    ['🌡️ Cold Wash', 'Machine wash cold (30°C) inside out with like colours.'],
    ['🚫 No Bleach', 'Never bleach. Bleach degrades performance fibres.'],
    ['💧 Hang Dry', 'Hang dry or tumble dry low. High heat destroys elasticity.'],
    ['🚫 No Iron', 'Do not iron printed or graphic areas.'],
    ['✋ No Softeners', 'Avoid fabric softeners — they reduce moisture-wicking performance.'],
  ]),
};

export default function Care() {
  const { title, subtitle, items } = PAGES_DATA.care;
  return (
    <div className="page-enter">
      <div className="container section">
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>{title}</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', lineHeight: 'var(--leading-relaxed)' }}>{subtitle}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
          {items.map(([icon, desc]) => (
            <div key={icon} style={{ padding: 'var(--space-5)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
              <p style={{ fontSize: '1.75rem', marginBottom: 'var(--space-3)' }}>{icon}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
