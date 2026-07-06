import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoBlack from '../assets/logo-black.png';
import logoWhite from '../assets/logo-white.png';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import { useTheme } from '../context/ThemeContext';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const { items, saleTotal } = useCart();
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;
  const steps = ['Shipping', 'Payment', 'Review'];
  const inputStyle = { padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface-raised)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-primary)', outline: 'none', fontSize: 'var(--text-base)', width: '100%' };
  const labelStyle = { fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-secondary)' };
  const field = (label, type = 'text') => (
    <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} style={inputStyle} />
    </div>
  );

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-background)' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <Link to="/"><img src={logoSrc} alt="SCARVENGE" style={{ height: '32px' }} /></Link>
        <div style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'center' }}>
          {steps.map((s, i) => (
            <span key={s} style={{ fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase', color: step === i + 1 ? 'var(--color-primary)' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: step === i + 1 ? 'var(--color-primary)' : 'var(--color-border)', color: step === i + 1 ? '#FFF' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
              <span style={{ display: 'none' }}>{s}</span>
            </span>
          ))}
        </div>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600 }}>🔒 Secure</span>
      </header>

      <div style={{ maxWidth: '560px', margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
        <div style={{ background: 'var(--color-surface)', padding: 'var(--space-7)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Shipping</h2>
              {['Full Name', 'Email', 'Phone', 'Address Line 1', 'City', 'State', 'Pincode'].map(l => field(l))}
              <button onClick={() => setStep(2)} style={{ padding: 'var(--space-4)', background: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Payment</h2>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', padding: 'var(--space-3)', background: 'var(--color-surface-raised)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                This is a UI prototype. No real payment processing occurs.
              </p>
              {field('Card Number')}
              {field('Name on Card')}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                {['Expiry (MM/YY)', 'CVV'].map(l => field(l))}
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button onClick={() => setStep(1)} style={{ padding: 'var(--space-4) var(--space-5)', background: 'none', color: 'var(--color-text-secondary)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}>Back</button>
                <button onClick={() => setStep(3)} style={{ flex: 1, padding: 'var(--space-4)', background: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Review Order</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Review Order</h2>
              {items.length === 0
                ? <p style={{ color: 'var(--color-text-muted)' }}>No items in cart.</p>
                : items.map(item => (
                  <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border)' }}>
                    <span>{item.product.name} × {item.qty}</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{formatPrice(item.product.price * item.qty)}</span>
                  </div>
                ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-primary)' }}>{formatPrice(saleTotal)}</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button onClick={() => setStep(2)} style={{ padding: 'var(--space-4) var(--space-5)', background: 'none', color: 'var(--color-text-secondary)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontWeight: 600, cursor: 'pointer' }}>Back</button>
                <Link to="/order-success" style={{ flex: 1, padding: 'var(--space-4)', background: 'var(--color-primary)', color: '#FFF', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', textAlign: 'center', display: 'block' }}>Place Order</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
