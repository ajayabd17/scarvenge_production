/**
 * SCARVENGE — Currency / Price Formatting Utility
 * Abstracted so multi-currency support can be added later
 * without touching any component files.
 */

const CURRENCY_CONFIG = {
  INR: { symbol: '₹', locale: 'en-IN', code: 'INR' },
  USD: { symbol: '$', locale: 'en-US', code: 'USD' },
  GBP: { symbol: '£', locale: 'en-GB', code: 'GBP' },
  EUR: { symbol: '€', locale: 'de-DE', code: 'EUR' },
};

// Default currency — change here to switch globally
const DEFAULT_CURRENCY = 'INR';

/**
 * Format a numeric price into a display string.
 * @param {number} amount - Raw numeric price
 * @param {string} [currency] - Currency code (default: INR)
 * @returns {string} Formatted price string, e.g. "₹1,999"
 */
export function formatPrice(amount, currency = DEFAULT_CURRENCY) {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage between original and sale price.
 * @param {number} original
 * @param {number} sale
 * @returns {number} Rounded percentage
 */
export function discountPercent(original, sale) {
  if (!original || !sale || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Format price range for display.
 * @param {number} min
 * @param {number} max
 * @param {string} [currency]
 * @returns {string}
 */
export function formatPriceRange(min, max, currency = DEFAULT_CURRENCY) {
  return `${formatPrice(min, currency)} – ${formatPrice(max, currency)}`;
}
