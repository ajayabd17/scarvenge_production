import './Badge.css';

const BADGE_CONFIG = {
  new:       { label: 'New',        className: 'badge--new' },
  sale:      { label: 'Sale',       className: 'badge--sale' },
  bestseller:{ label: 'Bestseller', className: 'badge--bestseller' },
  limited:   { label: 'Limited',    className: 'badge--limited' },
  'low-stock':{ label: 'Low Stock', className: 'badge--lowstock' },
  'sold-out':{ label: 'Sold Out',   className: 'badge--soldout' },
};

export function Badge({ type, label: customLabel, className = '' }) {
  const config = BADGE_CONFIG[type] || {};
  const label = customLabel || config.label || type;
  return (
    <span className={['badge', config.className, className].filter(Boolean).join(' ')}>
      {label}
    </span>
  );
}
