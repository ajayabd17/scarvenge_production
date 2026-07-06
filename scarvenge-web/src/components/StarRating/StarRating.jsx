import './StarRating.css';
import { Star } from 'lucide-react';

export function StarRating({ rating = 0, count, size = 16, interactive = false, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="star-rating" role={interactive ? 'radiogroup' : 'img'}
      aria-label={`${rating} out of 5 stars${count ? `, ${count} reviews` : ''}`}>
      {stars.map(n => (
        <button
          key={n}
          type="button"
          className={['star', n <= Math.round(rating) ? 'star--filled' : ''].join(' ')}
          style={{ '--size': `${size}px` }}
          onClick={interactive ? () => onChange?.(n) : undefined}
          disabled={!interactive}
          aria-label={interactive ? `Rate ${n} stars` : undefined}
          aria-hidden={!interactive}
          tabIndex={interactive ? 0 : -1}
        >
          <Star size={size} />
        </button>
      ))}
      {count !== undefined && (
        <span className="star-rating__count">({count})</span>
      )}
    </div>
  );
}
