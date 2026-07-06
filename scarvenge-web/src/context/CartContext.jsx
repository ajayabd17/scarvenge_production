/**
 * SCARVENGE — Cart Context
 * Client-side cart state. Ready for backend/API integration.
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { formatPrice, discountPercent } from '../utils/formatPrice';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('scarvenge-cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('scarvenge-cart', JSON.stringify(items)); } catch {}
  }, [items]);

  const addItem = useCallback((product, color, size, qty = 1) => {
    setItems(prev => {
      const key = `${product.id}-${color.name}-${size}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { key, product, color, size, qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQty = useCallback((key, qty) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);

  const subtotal = items.reduce((sum, i) => {
    const price = i.product.compareAtPrice ? i.product.compareAtPrice : i.product.price;
    return sum + price * i.qty;
  }, 0);

  const saleTotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const savings = subtotal - saleTotal;

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      itemCount, subtotal, saleTotal, savings,
      isOpen, setIsOpen,
      formatPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
