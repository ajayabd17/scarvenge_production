/**
 * SCARVENGE — Button Component
 * Variants: primary | secondary | tertiary | destructive
 * States: default | hover | active | disabled | loading
 */
import { Loader2 } from 'lucide-react';
import './Button.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  as: Tag = 'button',
  className = '',
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <Tag
      className={[
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth ? 'btn--full' : '',
        loading ? 'btn--loading' : '',
        className,
      ].filter(Boolean).join(' ')}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <Loader2 size={16} />
        </span>
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <span className="btn__icon btn__icon--left" aria-hidden="true">
          <Icon size={16} />
        </span>
      )}
      <span className="btn__label">{children}</span>
      {!loading && Icon && iconPosition === 'right' && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">
          <Icon size={16} />
        </span>
      )}
    </Tag>
  );
}
