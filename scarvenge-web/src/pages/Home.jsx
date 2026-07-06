import { Link } from 'react-router-dom';
import { ChevronRight, Zap, Shield, Recycle, Truck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { useStaggerReveal, useScrollReveal } from '../utils/useScrollReveal';
import { BEST_SELLERS, NEW_ARRIVALS, TRENDING } from '../data/products';
import { CATEGORIES, COLLECTIONS } from '../data/categories';
import logoWhite from '../assets/logo-white.png';
import logoBlack from '../assets/logo-black.png';
import product2 from '../assets/product-2.jpeg';
import product3 from '../assets/product-3.jpeg';
import product4 from '../assets/product-4.jpeg';
import { useTheme } from '../context/ThemeContext';
import './Home.css';

const BENEFITS = [
  { icon: Truck,   label: 'Free Shipping', sub: 'On orders above ₹1,999' },
  { icon: Recycle, label: 'Easy Returns',  sub: '14-day hassle-free returns' },
  { icon: Shield,  label: 'Quality First', sub: 'Built to last, built to perform' },
  { icon: Zap,     label: '4-Way Stretch', sub: 'Moves with every rep' },
];

const TECHNOLOGIES = [
  { icon: '⚡', name: 'PowerFlex™',   desc: '4-way stretch construction for unrestricted movement in any direction.' },
  { icon: '💧', name: 'DryShield™',   desc: 'Advanced moisture-wicking technology that pulls sweat away instantly.' },
  { icon: '🛡️', name: 'FlatLock™',   desc: 'Flatlock seam construction eliminates chafe. Zero friction, maximum comfort.' },
  { icon: '🌡️', name: 'ThermoCore™', desc: 'Temperature-regulating fabric that keeps you cool when it matters most.' },
];

function SectionHeader({ label, title, sub, align = 'left' }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`section-header section-header--${align}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-header__title">{title}</h2>
      {sub && <p className="section-header__sub">{sub}</p>}
    </div>
  );
}

export default function Home() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;
  const bsRef    = useStaggerReveal(80);
  const naRef    = useStaggerReveal(80);
  const trRef    = useStaggerReveal(80);
  const catRef   = useStaggerReveal(100);
  const techRef  = useStaggerReveal(100);
  const benRef   = useStaggerReveal(80);

  return (
    <div className="home page-enter">
      {/* ── 1. HERO ── */}
      <section className="hero" aria-label="Hero">
        <div className="hero__media">
          <img
            src={product2}
            alt="SCARVENGE athlete in compression wear"
            className="hero__img"
            loading="eager"
            fetchpriority="high"
          />
          <div className="hero__overlay" aria-hidden="true" />
        </div>
        <div className="hero__content container">
          <div className="hero__logo-mark" aria-hidden="true">
            <img src={logoWhite} alt="" className="hero__logo-img" />
          </div>
          <span className="hero__eyebrow section-label">New Season. New Prey.</span>
          <h1 className="hero__headline">
            Hunt.<br />Perform.<br />Dominate.
          </h1>
          <p className="hero__sub">
            Premium activewear engineered for those who train without limits.
          </p>
          <div className="hero__ctas">
            <Link to="/products" className="hero__cta hero__cta--primary">
              Shop Now <ChevronRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/our-story" className="hero__cta hero__cta--ghost">
              Our Story
            </Link>
          </div>
        </div>
        <div className="hero__scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* ── 2. BENEFITS BAR ── */}
      <section className="benefits-bar section" aria-label="Brand benefits">
        <div className="container">
          <ul ref={benRef} className="benefits-bar__list" role="list">
            {BENEFITS.map(b => (
              <li key={b.label} className="benefit-item">
                <b.icon size={24} className="benefit-item__icon" aria-hidden="true" />
                <div>
                  <p className="benefit-item__label">{b.label}</p>
                  <p className="benefit-item__sub">{b.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. SHOP BY CATEGORY ── */}
      <section className="section" aria-labelledby="categories-heading">
        <div className="container">
          <SectionHeader label="Explore" title="Shop by Category" id="categories-heading" />
          <div ref={catRef} className="category-grid">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="category-card">
                <div className="category-card__img-wrap">
                  <div className="category-card__placeholder">
                    <img src={logoSrc} alt="" className="category-card__logo-watermark" aria-hidden="true" />
                  </div>
                </div>
                <div className="category-card__body">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <span className="category-card__arrow" aria-hidden="true"><ChevronRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FEATURED COLLECTIONS ── */}
      <section className="section featured-collections" aria-labelledby="collections-heading">
        <div className="container">
          <SectionHeader label="Collections" title="Built for Predators" id="collections-heading" />
          <div className="collections-grid">
            {COLLECTIONS.map((col, i) => (
              <Link key={col.id} to={`/collections/${col.slug}`} className={`collection-banner collection-banner--${i + 1}`}>
                <div className="collection-banner__bg">
                  <img
                    src={i === 0 ? product3 : product4}
                    alt={col.name}
                    className="collection-banner__img"
                    loading="lazy"
                  />
                  <div className="collection-banner__overlay" aria-hidden="true" />
                </div>
                <div className="collection-banner__content">
                  <span className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>{col.tagline}</span>
                  <h3 className="collection-banner__title">{col.name}</h3>
                  <span className="collection-banner__cta">{col.cta} <ChevronRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. BEST SELLERS ── */}
      <section className="section" aria-labelledby="bestsellers-heading">
        <div className="container">
          <div className="section-row-header">
            <SectionHeader label="Most Wanted" title="Best Sellers" id="bestsellers-heading" />
            <Link to="/products?filter=bestseller" className="see-all-link">See All <ChevronRight size={14} /></Link>
          </div>
          <div ref={bsRef} className="product-grid">
            {BEST_SELLERS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── 6. LIFESTYLE BANNER ── */}
      <section className="lifestyle-banner" aria-label="Lifestyle">
        <div className="lifestyle-banner__media">
          <img
            src={product4}
            alt="SCARVENGE athlete in statement collection"
            className="lifestyle-banner__img"
            loading="lazy"
          />
          <div className="lifestyle-banner__overlay" aria-hidden="true" />
        </div>
        <div className="lifestyle-banner__content container">
          <img src={logoWhite} alt="" className="lifestyle-banner__logo" aria-hidden="true" />
          <h2 className="lifestyle-banner__headline">Wear the Hunt.</h2>
          <p className="lifestyle-banner__sub">Statement pieces made for those who move first and ask questions never.</p>
          <Link to="/collections/statement" className="lifestyle-banner__cta">
            Shop Statement <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── 7. NEW ARRIVALS ── */}
      <section className="section" aria-labelledby="new-arrivals-heading">
        <div className="container">
          <div className="section-row-header">
            <SectionHeader label="Just Dropped" title="New Arrivals" id="new-arrivals-heading" />
            <Link to="/products?filter=new" className="see-all-link">See All <ChevronRight size={14} /></Link>
          </div>
          <div ref={naRef} className="product-grid">
            {NEW_ARRIVALS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── 8. TRENDING ── */}
      <section className="section" aria-labelledby="trending-heading">
        <div className="container">
          <div className="section-row-header">
            <SectionHeader label="On the Rise" title="Trending Now" id="trending-heading" />
            <Link to="/products?filter=trending" className="see-all-link">See All <ChevronRight size={14} /></Link>
          </div>
          <div ref={trRef} className="product-grid">
            {TRENDING.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── 9. FEATURED TECHNOLOGY ── */}
      <section className="section tech-section" aria-labelledby="tech-heading">
        <div className="container">
          <SectionHeader label="Engineering" title="Built Different" sub="Every SCARVENGE piece is engineered with proprietary fabric technologies." align="center" id="tech-heading" />
          <div ref={techRef} className="tech-grid">
            {TECHNOLOGIES.map(t => (
              <div key={t.name} className="tech-card">
                <span className="tech-card__icon" aria-hidden="true">{t.icon}</span>
                <h3 className="tech-card__name">{t.name}</h3>
                <p className="tech-card__desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. BRAND STORY PREVIEW ── */}
      <section className="section brand-preview" aria-labelledby="brand-story-heading">
        <div className="container">
          <div className="brand-preview__inner">
            <div className="brand-preview__media">
              <img src={product3} alt="SCARVENGE athlete" className="brand-preview__img" loading="lazy" />
              <div className="brand-preview__logo-badge" aria-hidden="true">
                <img src={logoWhite} alt="" />
              </div>
            </div>
            <div className="brand-preview__content">
              <span className="section-label">Our DNA</span>
              <h2 id="brand-story-heading" className="brand-preview__title">Born from the Grind</h2>
              <p className="brand-preview__text">
                SCARVENGE wasn't built in a boardroom. It was built at 5AM in a garage, between sets,
                between failures. We believe the gym doesn't make you — but it reveals you.
                Every piece we make carries that belief in its fabric.
              </p>
              <Link to="/our-story" className="brand-preview__link">
                Read Our Story <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. NEWSLETTER ── */}
      <section className="section newsletter-section" aria-labelledby="newsletter-heading">
        <div className="container">
          <div className="newsletter">
            <div className="newsletter__logo" aria-hidden="true">
              <img src={logoWhite} alt="" />
            </div>
            <h2 id="newsletter-heading" className="newsletter__title">Join the Pack</h2>
            <p className="newsletter__sub">Get early access to new drops, exclusive offers, and training content.</p>
            <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="your@email.com"
                className="newsletter__input"
                required
                aria-required="true"
              />
              <button type="submit" className="newsletter__btn">Subscribe</button>
            </form>
            <p className="newsletter__note">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
