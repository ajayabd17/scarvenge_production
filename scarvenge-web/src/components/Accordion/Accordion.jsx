import { useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

export function Accordion({ items, multiOpen = false, className = '' }) {
  const [open, setOpen] = useState(new Set());

  const toggle = useCallback((id) => {
    setOpen(prev => {
      const next = new Set(multiOpen ? prev : []);
      if (prev.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  }, [multiOpen]);

  return (
    <div className={['accordion', className].join(' ')}>
      {items.map((item, i) => {
        const id = item.id || i;
        const isOpen = open.has(id);
        return (
          <div key={id} className={['accordion__item', isOpen ? 'accordion__item--open' : ''].join(' ')}>
            <button
              className="accordion__trigger"
              onClick={() => toggle(id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${id}`}
              id={`accordion-btn-${id}`}
            >
              {item.icon && <span className="accordion__icon" aria-hidden="true">{item.icon}</span>}
              <span className="accordion__label">{item.label}</span>
              <ChevronDown size={18} className={['accordion__chevron', isOpen ? 'accordion__chevron--open' : ''].join(' ')} aria-hidden="true" />
            </button>
            <div
              id={`accordion-panel-${id}`}
              role="region"
              aria-labelledby={`accordion-btn-${id}`}
              className="accordion__panel"
              style={{ '--panel-h': isOpen ? 'auto' : '0' }}
              hidden={!isOpen}
            >
              <div className="accordion__content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
