import { Link } from 'react-router-dom';
import { Instagram, Youtube, Twitter } from 'lucide-react';
import logoWhite from '../../assets/logo-white.png';
import logoBlack from '../../assets/logo-black.png';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const FOOTER_LINKS = {
  'Shop': [
    { label: 'All Products', to: '/products' },
    { label: 'Compression', to: '/category/compression' },
    { label: 'Tops', to: '/category/tops' },
    { label: 'Bottoms', to: '/category/bottoms' },
    { label: 'New Arrivals', to: '/products?filter=new' },
    { label: 'Sale', to: '/products?filter=sale' },
  ],
  'Collections': [
    { label: 'Core Collection', to: '/collections/core' },
    { label: 'Statement Collection', to: '/collections/statement' },
  ],
  'Help': [
    { label: 'FAQ', to: '/faq' },
    { label: 'Size Guide', to: '/size-guide' },
    { label: 'Care Instructions', to: '/care' },
    { label: 'Shipping Policy', to: '/shipping' },
    { label: 'Return Policy', to: '/returns' },
    { label: 'Track Order', to: '/track-order' },
    { label: 'Contact', to: '/contact' },
  ],
  'Brand': [
    { label: 'Our Story', to: '/our-story' },
    { label: 'About Us', to: '/about' },
  ],
};

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms & Conditions', to: '/terms' },
];

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'UPI', 'COD', 'Razorpay'];

export function Footer() {
  const { theme } = useTheme();
  const logoSrc = theme === 'dark' ? logoWhite : logoBlack;

  const [email, setEmail] = React.useState('');
  const [subState, setSubState] = React.useState('idle');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubState('success');
    setEmail('');
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main container">
        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo-wrap" aria-label="SCARVENGE home">
            <img src={logoSrc} alt="SCARVENGE" className="footer__logo" />
            <span className="footer__brand-name">SCARVENGE</span>
          </Link>
          <p className="footer__tagline">Hunt. Perform. Dominate.</p>
          <p className="footer__desc">
            Premium activewear engineered for those who train without limits.
            Built for predators.
          </p>
          <div className="footer__socials">
            <a href="https://instagram.com/scarvenge" target="_blank" rel="noopener noreferrer"
              className="footer__social-btn" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://youtube.com/@scarvenge" target="_blank" rel="noopener noreferrer"
              className="footer__social-btn" aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <a href="https://twitter.com/scarvenge" target="_blank" rel="noopener noreferrer"
              className="footer__social-btn" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Link groups */}
        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <div key={group} className="footer__col">
            <h3 className="footer__col-title">{group}</h3>
            <ul className="footer__col-list" role="list">
              {links.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="footer__col-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="footer__newsletter">
          <h3 className="footer__col-title">Stay in the Hunt</h3>
          <p className="footer__newsletter-desc">Get early access to new drops and exclusive offers.</p>
          <form onSubmit={handleSubscribe} className="footer__newsletter-form">
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            {subState === 'success' ? (
              <p className="footer__newsletter-success">✓ You're in. Stay sharp.</p>
            ) : (
              <>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="footer__newsletter-input"
                  required
                  aria-required="true"
                />
                <button type="submit" className="footer__newsletter-btn">Subscribe</button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {new Date().getFullYear()} SCARVENGE. All rights reserved.
          </p>
          <ul className="footer__legal" role="list">
            {LEGAL_LINKS.map(l => (
              <li key={l.label}>
                <Link to={l.to} className="footer__legal-link">{l.label}</Link>
              </li>
            ))}
          </ul>
          <div className="footer__payments" aria-label="Accepted payment methods">
            {PAYMENT_METHODS.map(p => (
              <span key={p} className="footer__payment-chip">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Need React for state
import React from 'react';
