import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
export default function Cart() {
  const { items, removeItem, updateQty, saleTotal, savings } = useCart();
  return (
    <div className="page-enter">
      <div className="container section">
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-7)' }}>Your Cart</h1>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-10) 0' }}>
            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>Your cart is empty.</p>
            <Link to="/products" style={{ padding: 'var(--space-4) var(--space-8)', background: 'var(--color-primary)', color: '#FFF', borderRadius: 'var(--radius-md)', fontWeight: 700, display: 'inline-block', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {items.map(item => (
                <div key={item.key} style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-5)', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', alignItems: 'flex-start' }}>
                  <img src={item.product.colors[0].images[0]} alt={item.product.name} style={{ width: '80px', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0 }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.product.name}</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{item.color.name} / {item.size}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                      <div className="qty-stepper">
                        <button className="qty-stepper__btn" onClick={() => updateQty(item.key, item.qty - 1)} disabled={item.qty <= 1} aria-label="Decrease"><Minus size={12} /></button>
                        <span className="qty-stepper__val">{item.qty}</span>
                        <button className="qty-stepper__btn" onClick={() => updateQty(item.key, item.qty + 1)} aria-label="Increase"><Plus size={12} /></button>
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{formatPrice(item.product.price * item.qty)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.key)} style={{ display: 'flex', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--space-2)', transition: 'color var(--duration-fast)' }} aria-label="Remove item"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
            <div style={{ padding: 'var(--space-6)', background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                <span>Subtotal</span><span>{formatPrice(saleTotal)}</span>
              </div>
              {savings > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', color: 'var(--color-success)' }}>
                  <span>You save</span><span>−{formatPrice(savings)}</span>
                </div>
              )}
              <div style={{ height: '1px', background: 'var(--color-border)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--color-text-primary)' }}>
                <span>Total</span><span style={{ color: 'var(--color-primary)' }}>{formatPrice(saleTotal)}</span>
              </div>
              <Link to="/checkout" style={{ display: 'block', padding: 'var(--space-4)', background: 'var(--color-primary)', color: '#FFF', textAlign: 'center', borderRadius: 'var(--radius-md)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)', transition: 'background var(--duration-fast)' }}>Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
