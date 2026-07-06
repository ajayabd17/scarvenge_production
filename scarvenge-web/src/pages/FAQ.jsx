import { FAQ_DATA } from '../data/faq';
import { Accordion } from '../components/Accordion/Accordion';
export default function FAQ() {
  return (
    <div className="page-enter">
      <div className="container section">
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>FAQ</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>Answers to the questions we get asked most.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', maxWidth: '800px' }}>
          {FAQ_DATA.map(group => (
            <div key={group.group}>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-4)' }}>{group.group}</h2>
              <Accordion items={group.questions.map((q, i) => ({ id: group.group + i, label: q.q, content: <p>{q.a}</p> }))} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
