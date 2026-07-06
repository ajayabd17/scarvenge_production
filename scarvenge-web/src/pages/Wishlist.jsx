import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { useWishlist } from '../context/WishlistContext';
export default function Wishlist() {
  const { items } = useWishlist();
  return (
    <div className="page-enter">
      <div className="container section">
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-6)' }}>Wishlist</h1>
        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-10) 0' }}>
            <Heart size={48} style={{ color: 'var(--color-border-strong)', margin: '0 auto', display: 'block', marginBottom: 'var(--space-4)' }} />
            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>Your wishlist is empty.</p>
            <Link to="/products" style={{ padding: 'var(--space-3) var(--space-6)', background: 'var(--color-primary)', color: '#FFF', borderRadius: 'var(--radius-md)', fontWeight: 600, display: 'inline-block', textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)' }}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="product-grid">{items.map(p => <ProductCard key={p.id} product={p} />)}</div>
        )}
      </div>
    </div>
  );
}
