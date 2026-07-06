import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './AnnouncementBar.css';

const MESSAGES = [
  '🔥 Free shipping on orders above ₹1,999',
  '✦ New Collection Dropping Soon — Join the Waitlist',
  '🏆 Use code PREDATOR for 10% off your first order',
];

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const prev = () => setCurrent(i => (i - 1 + MESSAGES.length) % MESSAGES.length);
  const next = () => setCurrent(i => (i + 1) % MESSAGES.length);

  return (
    <div className="announcement-bar" role="banner" aria-label="Announcements">
      <button className="announcement-bar__nav" onClick={prev} aria-label="Previous announcement">
        <ChevronLeft size={14} />
      </button>
      <p className="announcement-bar__msg" key={current}>
        {MESSAGES[current]}
      </p>
      <button className="announcement-bar__nav" onClick={next} aria-label="Next announcement">
        <ChevronRight size={14} />
      </button>
      <button className="announcement-bar__dismiss" onClick={() => setDismissed(true)}
        aria-label="Dismiss announcements">
        <X size={14} />
      </button>
    </div>
  );
}
