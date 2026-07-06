import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, ChevronRight, Minus, Plus, Truck, RotateCcw, Shield } from 'lucide-react';
import { Badge } from '../components/Badge/Badge';
import { StarRating } from '../components/StarRating/StarRating';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { Accordion } from '../components/Accordion/Accordion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { getProductBySlug, PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/formatPrice';
import './PDP.css';

export default function PDP() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { success, error } = useToast();

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize,  setSelectedSize]  = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!product) {
    return (
      <div className="pdp-notfound container">
        <h1>Product not found</h1>
        <Link to="/products">← Back to all products</Link>
      </div>
    );
  }

  const color = product.colors[selectedColor];
  const isWished = isWishlisted(product.id);
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { error('Please select a size'); return; }
    addItem(product, color, selectedSize, qty);
    success(`${product.name} added to cart`);
  };

  const accordionItems = [
    { id: 'desc',  label: 'Description',         content: <p>{product.description}</p> },
    { id: 'specs', label: 'Fabric & Composition', content: <p>{product.material || 'Full material details coming soon.'}</p> },
    { id: 'care',  label: 'Care Instructions',    content: <p>Machine wash cold, inside out. Do not bleach. Hang dry or tumble dry low.</p> },
    { id: 'ship',  label: 'Shipping',             content: <p>Free standard shipping on orders above ₹1,999. 5–7 business days.</p> },
    { id: 'ret',   label: 'Returns',              content: <p>14-day hassle-free returns on unworn, unwashed items with original tags.</p> },
  ];

  return (
    <div className="pdp page-enter">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pdp__breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><Link to="/">Home</Link></li>
            <li><ChevronRight size={12} aria-hidden="true" /></li>
            <li><Link to={`/category/${product.category}`}>{product.category}</Link></li>
            <li><ChevronRight size={12} aria-hidden="true" /></li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="pdp__layout">
          {/* Gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main-img-wrap">
              <img
                src={color.images[activeImg] || color.images[0]}
                alt={`${product.name} — ${color.name}`}
                className="pdp__main-img"
                width="600" height="800"
              />
              <div className="pdp__badges">
                {product.badges.map(b => <Badge key={b} type={b} />)}
              </div>
            </div>
            {color.images.length > 1 && (
              <div className="pdp__thumbnails" role="list">
                {color.images.map((img, i) => (
                  <button key={i} className={['pdp__thumb', activeImg === i ? 'pdp__thumb--active' : ''].join(' ')}
                    onClick={() => setActiveImg(i)} aria-label={`View image ${i + 1}`}>
                    <img src={img} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pdp__info">
            <p className="pdp__brand">SCARVENGE</p>
            <h1 className="pdp__name">{product.name}</h1>

            {product.rating > 0 && (
              <a href="#reviews" className="pdp__rating-link">
                <StarRating rating={product.rating} count={product.reviewCount} />
              </a>
            )}

            {/* Price */}
            <div className="pdp__pricing">
              <span className="pdp__price">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="pdp__compare">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>

            {/* Color */}
            <div className="pdp__section">
              <p className="pdp__section-label">Color: <span>{color.name}</span></p>
              <div className="pdp__colors">
                {product.colors.map((c, i) => (
                  <button key={c.name}
                    className={['pdp__color-swatch', selectedColor === i ? 'pdp__color-swatch--active' : ''].join(' ')}
                    style={{ background: c.hex }}
                    onClick={() => { setSelectedColor(i); setActiveImg(0); }}
                    aria-label={c.name}
                    aria-pressed={selectedColor === i}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="pdp__section">
              <div className="pdp__size-header">
                <p className="pdp__section-label">Size: <span>{selectedSize || 'Select'}</span></p>
                <Link to="/size-guide" className="pdp__size-guide-link">Size Guide</Link>
              </div>
              <div className="pdp__sizes">
                {product.sizes.map(s => {
                  const available = product.availableSizes.includes(s);
                  return (
                    <button key={s}
                      className={['pdp__size-btn', selectedSize === s ? 'pdp__size-btn--active' : '', !available ? 'pdp__size-btn--oos' : ''].join(' ')}
                      onClick={() => available && setSelectedSize(s)}
                      disabled={!available}
                      aria-label={`Size ${s}${!available ? ' — out of stock' : ''}`}
                      aria-pressed={selectedSize === s}
                    >{s}</button>
                  );
                })}
              </div>
            </div>

            {/* Stock */}
            {product.stockCount < 15 && product.inStock && (
              <p className="pdp__stock-warn">Only {product.stockCount} left — order soon</p>
            )}

            {/* Qty + ATC */}
            <div className="pdp__atc-row">
              <div className="qty-stepper" role="group" aria-label="Quantity">
                <button className="qty-stepper__btn" onClick={() => setQty(q => Math.max(1, q-1))} aria-label="Decrease quantity" disabled={qty<=1}><Minus size={14}/></button>
                <span className="qty-stepper__val" aria-live="polite">{qty}</span>
                <button className="qty-stepper__btn" onClick={() => setQty(q => q+1)} aria-label="Increase quantity"><Plus size={14}/></button>
              </div>
              <button className="pdp__atc-btn" onClick={handleAddToCart} disabled={!product.inStock}>
                {product.inStock ? 'Add to Cart' : 'Sold Out'}
              </button>
              <button
                className={['pdp__wish-btn', isWished ? 'pdp__wish-btn--active' : ''].join(' ')}
                onClick={() => toggle(product)}
                aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                aria-pressed={isWished}
              ><Heart size={20} /></button>
            </div>

            {/* Trust badges */}
            <div className="pdp__trust">
              <div className="pdp__trust-item"><Truck size={16}/> Free shipping over ₹1,999</div>
              <div className="pdp__trust-item"><RotateCcw size={16}/> 14-day easy returns</div>
              <div className="pdp__trust-item"><Shield size={16}/> Secure checkout</div>
            </div>

            {/* Accordion */}
            <Accordion items={accordionItems} />
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pdp__related" aria-labelledby="related-heading">
            <h2 id="related-heading" className="pdp__related-title">You May Also Like</h2>
            <div className="product-grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
