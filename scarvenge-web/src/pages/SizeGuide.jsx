export default function SizeGuide() {
  const headers = ['Size', 'Chest (in)', 'Waist (in)', 'Hip (in)', 'Inseam (in)'];
  const rows = [
    ['XS', '32–34', '26–28', '34–36', '30'],
    ['S',  '34–36', '28–30', '36–38', '30'],
    ['M',  '36–38', '30–32', '38–40', '31'],
    ['L',  '38–40', '32–34', '40–42', '31'],
    ['XL', '40–42', '34–36', '42–44', '32'],
    ['XXL','42–44', '36–38', '44–46', '32'],
  ];
  const th = { padding: 'var(--space-3) var(--space-4)', textAlign: 'left', fontWeight: 700, color: 'var(--color-text-primary)', background: 'var(--color-surface-raised)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' };
  const td = { padding: 'var(--space-3) var(--space-4)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' };
  return (
    <div className="page-enter">
      <div className="container section">
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>Size Guide</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-7)', lineHeight: 'var(--leading-relaxed)' }}>
          All measurements in inches. Measure your body and match to the chart. For compression wear, size up for comfort or size down for maximum compression.
        </p>
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-primary)' }}>
                {headers.map(h => <th key={h} style={th}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row[0]} style={{ borderBottom: '1px solid var(--color-border)', background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-raised)' }}>
                  <td style={{ ...td, fontWeight: 700, color: 'var(--color-primary)' }}>{row[0]}</td>
                  {row.slice(1).map((cell, j) => <td key={j} style={td}>{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 'var(--space-7)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
          {[['How to measure Chest', 'Wrap a tape measure around the fullest part of your chest, keeping the tape horizontal.'],
            ['How to measure Waist', 'Measure around the narrowest part of your natural waistline.'],
            ['How to measure Inseam', 'Measure from the crotch seam to the bottom of the leg.']].map(([t, d]) => (
            <div key={t} style={{ padding: 'var(--space-5)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>{t}</h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
