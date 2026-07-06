/**
 * SCARVENGE — Navbar
 * States: resting | scrolled (glass) | mobile drawer open
 * Features: shrinks on scroll-down, reappears on scroll-up,
 *           mega menu desktop, full-screen drawer mobile
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';
import logoWhite from '../../assets/logo-white.png';
import logoBlack from '../../assets/logo-black.png';
import './Navbar.css';

const NAV_LINKS = [
  {
    label: 'Collections',
    mega: true,
    items: [
      { label: 'Core Collection', to: '/collections/core', desc: 'The essentials.' },
      { label: 'Statement Collection', to: '/collections/statement', desc: 'Wear the hunt.' },
    ],
  },
  {
    label: 'Shop',
    mega: true,
    items: [
      { label: 'All Products', to: '/products' },
      { label: 'Compression', to: '/category/compression' },
      { label: 'Tops', to: '/category/tops' },
      { label: 'Bottoms', to: '/category/bottoms' },
      { label: 'Accessories', to: '/category/accessories' },
    ],
  },
  { label: 'Our Story', to: '/our-story' },
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { count: wishCount } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [scrolled,   setScrolled]   = useState(false);
  const [hidden,     setHidden]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query,      setQuery]      = useState('');

  const lastScrollY = useRef(0);
  const searchRef   = useRef(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > 80 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); setMegaOpen(null); }, [navigate]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Focus search input
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Escape key handling
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setMegaOpen(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
    setQuery('');
  }, [query, navigate]);

  const isDark = theme === 'dark';
  const logoSrc = isDark ? logoWhite : logoBlack;

  return (
    <>
      <header className={[
        'navbar',
        scrolled   ? 'navbar--scrolled' : '',
        hidden     ? 'navbar--hidden'   : '',
        mobileOpen ? 'navbar--open'     : '',
      ].filter(Boolean).join(' ')}
        role="banner"
      >
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="SCARVENGE — go to homepage">
            <img src={logoSrc} alt="SCARVENGE" className="navbar__logo-img" />
            <span className="navbar__brand">SCARVENGE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav" aria-label="Primary navigation">
            <ul className="navbar__links" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.label} className="navbar__item"
                  onMouseEnter={() => link.mega && setMegaOpen(link.label)}
                  onMouseLeave={() => setMegaOpen(null)}
                >
                  {link.mega ? (
                    <button
                      className={['navbar__link', megaOpen === link.label ? 'navbar__link--active' : ''].join(' ')}
                      aria-expanded={megaOpen === link.label}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown size={14} className={['navbar__chevron', megaOpen === link.label ? 'navbar__chevron--open' : ''].join(' ')} />
                    </button>
                  ) : (
                    <NavLink
                      to={link.to}
                      className={({ isActive }) => ['navbar__link', isActive ? 'navbar__link--active' : ''].join(' ')}
                    >
                      {link.label}
                    </NavLink>
                  )}

                  {/* Mega Menu */}
                  {link.mega && megaOpen === link.label && (
                    <div className="mega-menu" role="menu">
                      <div className="mega-menu__inner container">
                        <ul className="mega-menu__list" role="list">
                          {link.items.map(item => (
                            <li key={item.label}>
                              <Link to={item.to} className="mega-menu__item" role="menuitem"
                                onClick={() => setMegaOpen(null)}>
                                <span className="mega-menu__item-label">{item.label}</span>
                                {item.desc && <span className="mega-menu__item-desc">{item.desc}</span>}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {/* Accent graphic */}
                        <div className="mega-menu__logo-mark" aria-hidden="true">
                          <img src={isDark ? logoWhite : logoBlack} alt="" />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            {/* Search */}
            <button
              className="navbar__action-btn"
              onClick={() => setSearchOpen(s => !s)}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search size={20} />
            </button>

            {/* Theme toggle */}
            <button
              className="navbar__action-btn"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist */}
            <Link to="/wishlist" className="navbar__action-btn navbar__action-btn--badge"
              aria-label={`Wishlist — ${wishCount} items`}>
              <Heart size={20} />
              {wishCount > 0 && <span className="navbar__badge" aria-hidden="true">{wishCount}</span>}
            </Link>

            {/* Cart */}
            <button
              className="navbar__action-btn navbar__action-btn--badge"
              onClick={() => setCartOpen(true)}
              aria-label={`Cart — ${itemCount} items`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className="navbar__badge" aria-hidden="true">{itemCount}</span>}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="navbar__action-btn navbar__mobile-toggle"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className={['navbar__search', searchOpen ? 'navbar__search--open' : ''].join(' ')}>
          <div className="container">
            <form onSubmit={handleSearch} className="navbar__search-form" role="search">
              <Search size={18} className="navbar__search-icon" aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, collections…"
                className="navbar__search-input"
                aria-label="Search"
              />
              {query && (
                <button type="button" className="navbar__search-clear"
                  onClick={() => setQuery('')} aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={['mobile-drawer', mobileOpen ? 'mobile-drawer--open' : ''].join(' ')}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="mobile-drawer__header">
          <img src={logoSrc} alt="SCARVENGE" className="mobile-drawer__logo" />
          <button
            className="mobile-drawer__close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Mobile navigation">
          <ul className="mobile-drawer__list" role="list">
            {NAV_LINKS.map(link => (
              <li key={link.label} className="mobile-drawer__item">
                {link.mega ? (
                  <>
                    <button
                      className={['mobile-drawer__link', megaOpen === link.label ? 'mobile-drawer__link--open' : ''].join(' ')}
                      onClick={() => setMegaOpen(m => m === link.label ? null : link.label)}
                      aria-expanded={megaOpen === link.label}
                    >
                      {link.label}
                      <ChevronDown size={16} className={['mobile-drawer__chevron', megaOpen === link.label ? 'mobile-drawer__chevron--open' : ''].join(' ')} />
                    </button>
                    {megaOpen === link.label && (
                      <ul className="mobile-drawer__sub">
                        {link.items.map(item => (
                          <li key={item.label}>
                            <Link to={item.to} className="mobile-drawer__sub-link"
                              onClick={() => setMobileOpen(false)}>
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link to={link.to} className="mobile-drawer__link"
                    onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer__footer">
          <Link to="/account" className="mobile-drawer__footer-link"
            onClick={() => setMobileOpen(false)}>Account</Link>
          <button className="mobile-drawer__theme-toggle" onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDark ? <><Sun size={16} /> Light Mode</> : <><Moon size={16} /> Dark Mode</>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
