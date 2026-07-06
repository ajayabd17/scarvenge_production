import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const inputStyle = {
    padding: 'var(--space-3) var(--space-4)',
    background: 'var(--color-surface-raised)',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--text-base)',
    outline: 'none',
    width: '100%',
  };
  const labelStyle = { fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-secondary)' };

  return (
    <div className="page-enter">
      <div className="container section">
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>Contact Us</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
          We're here to help. Reach out and our team will respond within 24 hours.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-10)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {[
              [Mail, 'support@scarvenge.com'],
              [MapPin, 'India'],
            ].map(([Icon, val]) => (
              <div key={val} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Icon size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>{val}</p>
              </div>
            ))}
          </div>
          {sent ? (
            <div style={{ padding: 'var(--space-8)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>✓</p>
              <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-success)', marginBottom: 'var(--space-2)' }}>Message Sent!</p>
              <p style={{ color: 'var(--color-text-secondary)' }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: 'var(--color-surface)', padding: 'var(--space-7)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}
            >
              {[['name', 'Full Name', 'text'], ['email', 'Email', 'email'], ['subject', 'Subject', 'text']].map(([key, label, type]) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  <label htmlFor={`contact-${key}`} style={labelStyle}>{label}</label>
                  <input id={`contact-${key}`} type={type} required value={form[key]} onChange={set(key)} style={inputStyle} />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <label htmlFor="contact-message" style={labelStyle}>Message</label>
                <textarea id="contact-message" required rows={5} value={form.message} onChange={set('message')} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <button type="submit" style={{ padding: 'var(--space-4)', background: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: 'var(--text-base)', cursor: 'pointer', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
