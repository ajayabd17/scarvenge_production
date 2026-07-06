import { Link } from 'react-router-dom';
import logoBlack from '../assets/logo-black.png';
import logoWhite from '../assets/logo-white.png';
import { useTheme } from '../context/ThemeContext';
export default function OrderSuccess() {
  const { theme } = useTheme();
  const orderNum = `SCR${Math.floor(10000 + Math.random() * 90000)}`;
  return (
    <div className="page-enter" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8) var(--space-4)' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <img src={theme === 'dark' ? logoWhite : logoBlack} alt="SCARVENGE" style={{ height: '48px', margin: '0 auto', display: 'block', marginBottom: 'var(--space-6)' }} />
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-6)', fontSize: '2rem', color: '#FFF' }}>✓</div>
        <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>Order Confirmed!</h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-5)', fontWeight: 600 }}>Order {orderNum}</p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-3)' }}>
          Your gear is being prepared. You'll receive a shipping confirmation email shortly.
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-7)' }}>Estimated delivery: 5–7 business days</p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/track-order" style={{ padding: 'var(--space-3) var(--space-6)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', display: 'inline-block' }}>Track Order</Link>
          <Link to="/" style={{ padding: 'var(--space-3) var(--space-6)', background: 'var(--color-primary)', color: '#FFF', borderRadius: 'var(--radius-md)', fontWeight: 700, display: 'inline-block', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', fontSize: 'var(--text-sm)' }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
