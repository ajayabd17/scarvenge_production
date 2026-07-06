import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { PRODUCTS } from '../data/products';
export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';
  const qLow = q.toLowerCase();
  const results = q
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(qLow) || p.tags.some(t => t.includes(qLow)) || p.category.includes(qLow))
    : [];
  return (
    <div className="page-enter">
      <div className="container section">
        <h1 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>Search Results</h1>
        {q && (
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-base)' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
          </p>
        )}
        {results.length > 0 ? (
          <div className="product-grid">{results.map(p => <ProductCard key={p.id} product={p} />)}</div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--space-10) 0' }}>
            <Search size={48} style={{ color: 'var(--color-border-strong)', margin: '0 auto', display: 'block', marginBottom: 'var(--space-4)' }} />
            <p style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-secondary)' }}>
              {q ? `No results found for "${q}".` : 'Enter a search term above.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
