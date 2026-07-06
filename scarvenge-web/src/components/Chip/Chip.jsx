import { X } from 'lucide-react';
import './Chip.css';
export function Chip({ label, onRemove }) {
  return (
    <span className="chip">
      <span className="chip__label">{label}</span>
      {onRemove && (
        <button className="chip__remove" onClick={onRemove} aria-label={`Remove filter: ${label}`}>
          <X size={12} />
        </button>
      )}
    </span>
  );
}
