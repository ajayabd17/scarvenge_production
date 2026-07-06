/**
 * SCARVENGE — ProductCard
 * States: default | hover (image swap + quick-add) | sold-out overlay
 */
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Badge } from '../Badge/Badge';
import { StarRating } from '../StarRating/StarRating';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice, discountPercent } from '../../utils/formatPrice';
import './ProductCard.css';

export function ProductCard({ product, view = 'grid' }) {
  const { toggle, isWishlisted } = useWishlist();
  const { addItem } = useCart();
  const { success } = useToast();
  const [hovered, setHovered] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);

  const primaryColor  = product.colors[0];
  const secondaryColor = product.colors[1] || product.colors[0];
  const primaryImg   = primaryColor.images[0];
  const secondaryImg = secondaryColor.images[1] || secondaryColor.images[0];
  const isSoldOut    = !product.inStock;
  const isWished     = isWishlisted(product.id);
  const discount     = discountPercent(product.compareAtPrice, product.price);

  const handleWishlist = useCallback((e) => {
    e.preventDefault();
    setWishlisting(true);
    toggle(product);
    setTimeout(() => setWishlisting(false), 600);
  }, [product, toggle]);

  const handleQuickAdd = useCallback((e) => {
    e.preventDefault();
    if (isSoldOut) return;
    const size = product.availableSizes[0];
    addItem(product, primaryColor, size, 1);
    success(`${product.name} added to cart`);
  }, [product, primaryColor, isSoldOut, addItem, success]);

  if (view === 'list') {
    return (
      <article className="product-card product-card--list">
        <Link to={`/products/${product.slug}`} className="product-card__img-wrap">
          <img
            src={primaryImg}
            alt={`${product.name} — ${primaryColor.name}`}
            className="product-card__img"
            loading="lazy"
            width="200"
            height="267"
          />
        </Link>
        <div className="product-card__list-body">
          <div className="product-card__badges">
            {product.badges.map(b => <Badge key={b} type={b} />)}
          </div>
          <Link to={`/products/${product.slug}`} className="product-card__name">{product.name}</Link>
          <p className="product-card__desc">{product.description}</p>
          <div className="product-card__pricing">
            <span className="product-card__price">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="product-card__compare">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
          <div className="product-card__actions">
            <button className="product-card__atc" onClick={handleQuickAdd} disabled={isSoldOut}
              aria-label={`Add ${product.name} to cart`}>
              <ShoppingBag size={16} /> {isSoldOut ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={['product-card', isSoldOut ? 'product-card--soldout' : ''].join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/products/${product.slug}`} className="product-card__img-wrap" tabIndex={-1} aria-hidden>
        <img
          src={hovered ? secondaryImg : primaryImg}
          alt={`${product.name} — ${primaryColor.name}`}
          className="product-card__img"
          loading="lazy"
          width="400"
          height="533"
        />
        {isSoldOut && (
          <div className="product-card__sold-out-overlay">
            <span>Sold Out</span>
          </div>
        )}
        <div className="product-card__actions-overlay">
          <button
            className="product-card__quick-add"
            onClick={handleQuickAdd}
            disabled={isSoldOut}
            aria-label={`Quick add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
            {isSoldOut ? 'Sold Out' : 'Quick Add'}
          </button>
          <Link
            to={`/products/${product.slug}`}
            className="product-card__view-btn"
            aria-label={`View ${product.name}`}
            onClick={e => e.stopPropagation()}
          >
            <Eye size={16} />
          </Link>
        </div>
      </Link>

      <div className="product-card__info">
        <div className="product-card__top">
          <div className="product-card__badges">
            {product.badges.map(b => <Badge key={b} type={b} />)}
          </div>
          <button
            className={['product-card__wish', isWished ? 'product-card__wish--active' : '', wishlisting ? 'product-card__wish--bounce' : ''].join(' ')}
            onClick={handleWishlist}
            aria-label={isWished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWished}
          >
            <Heart size={18} />
          </button>
        </div>

        <Link to={`/products/${product.slug}`} className="product-card__name">{product.name}</Link>

        <div className="product-card__color-dots">
          {product.colors.map(c => (
            <span
              key={c.name}
              className="product-card__color-dot"
              style={{ background: c.hex }}
              title={c.name}
              aria-label={c.name}
            />
          ))}
        </div>

        <div className="product-card__pricing">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <>
              <span className="product-card__compare">{formatPrice(product.compareAtPrice)}</span>
              <span className="product-card__discount">-{discount}%</span>
            </>
          )}
        </div>

        {product.rating > 0 && (
          <StarRating rating={product.rating} count={product.reviewCount} size={12} />
        )}
      </div>
    </article>
  );
}
