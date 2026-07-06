/**
 * SCARVENGE — useScrollReveal
 * IntersectionObserver-based hook that adds a 'visible' class
 * to elements once they enter the viewport. Fires once only.
 */
import { useEffect, useRef } from 'react';

/**
 * @param {Object} options
 * @param {string} [options.threshold=0.12] - Intersection threshold
 * @param {string} [options.rootMargin='0px 0px -60px 0px'] - Root margin
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -60px 0px' } = options;
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.classList.add('visible');
      return;
    }

    el.classList.add('reveal');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Reveal multiple children with staggered delays.
 * @param {number} [stagger=80] - Delay between each child (ms)
 */
export function useStaggerReveal(stagger = 80) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const children = Array.from(container.children);

    children.forEach((child, i) => {
      if (prefersReduced) {
        child.classList.add('visible');
        return;
      }
      child.classList.add('reveal');
      child.style.transitionDelay = `${i * stagger}ms`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach(child => child.classList.add('visible'));
          observer.unobserve(container);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
}
