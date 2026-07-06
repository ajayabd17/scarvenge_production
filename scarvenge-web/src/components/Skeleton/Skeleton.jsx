import './Skeleton.css';

export function Skeleton({ width, height, radius, className = '' }) {
  return (
    <span
      className={['skeleton', 'shimmer', className].join(' ')}
      style={{
        width:  width  || '100%',
        height: height || '1em',
        borderRadius: radius ? `var(--radius-${radius})` : 'var(--radius-sm)',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <Skeleton height="320px" radius="lg" className="product-card-skeleton__img" />
      <div className="product-card-skeleton__body">
        <Skeleton height="14px" width="60%" />
        <Skeleton height="20px" width="80%" />
        <Skeleton height="16px" width="40%" />
      </div>
    </div>
  );
}
