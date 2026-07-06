import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import './SideDrawer.css';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, itemCount, saleTotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setIsOpen]);

  return (
    <>
      {isOpen && (
        <div className="drawer-overlay" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}
      <aside
        className={['cart-drawer', isOpen ? 'cart-drawer--open' : ''].join(' ')}
        aria-modal="true"
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            <ShoppingBag size={20} aria-hidden="true" />
            Your Cart {itemCount > 0 && <span className="cart-drawer__count">({itemCount})</span>}
          </h2>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label="Close cart">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={48} className="cart-drawer__empty-icon" aria-hidden="true" />
              <p className="cart-drawer__empty-title">Your cart is empty</p>
              <p className="cart-drawer__empty-sub">Add something to start hunting.</p>
              <Link to="/products" className="cart-drawer__shop-btn" onClick={() => setIsOpen(false)}>
                Shop All
              </Link>
            </div>
          ) : (
            <ul className="cart-drawer__list" role="list">
              {items.map(item => (
                <li key={item.key} className="cart-item">
                  <div className="cart-item__img-wrap">
                    <img
                      src={item.product.colors[0].images[0]}
                      alt={`${item.product.name} — ${item.color.name}`}
                      className="cart-item__img"
                      width="80" height="107"
                      loading="lazy"
                    />
                  </div>
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.product.name}</p>
                    <p className="cart-item__meta">{item.color.name} / {item.size}</p>
                    <p className="cart-item__price">{formatPrice(item.product.price)}</p>
                    <div className="cart-item__controls">
                      <div className="qty-stepper" role="group" aria-label="Quantity">
                        <button
                          className="qty-stepper__btn"
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          aria-label="Decrease quantity"
                          disabled={item.qty <= 1}
                        ><Minus size={12} /></button>
                        <span className="qty-stepper__val" aria-live="polite">{item.qty}</span>
                        <button
                          className="qty-stepper__btn"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          aria-label="Increase quantity"
                        ><Plus size={12} /></button>
                      </div>
                      <button
                        className="cart-item__remove"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remove ${item.product.name}`}
                      ><Trash2 size={14} /></button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span>Subtotal</span>
              <span className="cart-drawer__subtotal-price">{formatPrice(saleTotal)}</span>
            </div>
            <p className="cart-drawer__tax-note">Taxes and shipping calculated at checkout</p>
            <Link
              to="/checkout"
              className="cart-drawer__checkout-btn"
              onClick={() => setIsOpen(false)}
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/cart"
              className="cart-drawer__view-cart"
              onClick={() => setIsOpen(false)}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
