import { useState } from 'react';
export default function TrackOrder() {
  const [submitted, setSubmitted] = useState(false);
  const stages = [
    { title: 'Order Placed',  desc: 'Your order has been confirmed.',      status: 'done'    },
    { title: 'Processing',    desc: 'We are preparing your items.',         status: 'done'    },
    { title: 'Shipped',       desc: 'Your package is on its way.',          status: 'active'  },
    { title: 'Delivered',     desc: 'Package delivered to your address.',   status: 'pending' },
  ];
  const inputStyle = { padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface-raised)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)', outline: 'none', fontSize: 'var(--text-base)', width: '100%' };
  const labelStyle = { fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-secondary)' };
  return (
    <div className="page-enter">
      <div className="container section" style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>Track Order</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-7)' }}>Enter your order number and email to track your shipment.</p>
        {!submitted ? (
          <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: 'var(--color-surface)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <label htmlFor="order-num" style={labelStyle}>Order Number</label>
              <input id="order-num" type="text" placeholder="e.g. SCR12345" required style={inputStyle} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <label htmlFor="track-email" style={labelStyle}>Email Address</label>
              <input id="track-email" type="email" required style={inputStyle} />
            </div>
            <button type="submit" style={{ padding: 'var(--space-4)', background: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
              Track My Order
            </button>
          </form>
        ) : (
          <div style={{ background: 'var(--color-surface)', padding: 'var(--space-7)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>Order SCR12345 — In Transit</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {stages.map((s, i) => (
                <div key={s.title} style={{ display: 'flex', gap: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: s.status === 'done' ? 'var(--color-success)' : s.status === 'active' ? 'var(--color-primary)' : 'var(--color-border)', color: '#FFF', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                      {s.status === 'done' ? '✓' : s.status === 'active' ? '⟶' : i + 1}
                    </div>
                    {i < stages.length - 1 && <div style={{ width: '2px', flex: 1, background: s.status === 'done' ? 'var(--color-success)' : 'var(--color-border)', minHeight: '36px', marginTop: '4px' }} />}
                  </div>
                  <div style={{ paddingBottom: i < stages.length - 1 ? 'var(--space-5)' : 0, paddingTop: '6px' }}>
                    <p style={{ fontWeight: 600, color: s.status === 'pending' ? 'var(--color-text-muted)' : 'var(--color-text-primary)', marginBottom: '4px' }}>{s.title}</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
