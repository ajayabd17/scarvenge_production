function PolicyPage({ title, sections }) {
  return (
    <div className="page-enter">
      <div className="container section" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-8)' }}>{title}</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
          {sections.map(([heading, body]) => (
            <div key={heading}>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>{heading}</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-base)' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Shipping() {
  return <PolicyPage title="Shipping Policy" sections={[
    ['Processing Time', 'Orders are processed within 1–2 business days after payment confirmation. Custom or pre-order items may take longer.'],
    ['Standard Shipping', 'Free standard shipping on all orders above ₹1,999. Orders below ₹1,999 incur a flat ₹99 shipping fee. Estimated delivery: 5–7 business days.'],
    ['Expedited Shipping', 'Express shipping is available at checkout for ₹199. Estimated delivery: 2–3 business days.'],
    ['International Shipping', 'We currently ship within India only. International shipping options coming soon.'],
    ['Tracking', 'A tracking number will be emailed to you once your order ships. Allow 24–48 hours for tracking to activate.'],
  ]} />;
}

export function Returns() {
  return <PolicyPage title="Return & Exchange Policy" sections={[
    ['Return Window', 'You have 14 days from delivery date to initiate a return or exchange. Items must be unworn, unwashed, and have original tags attached.'],
    ['Non-Returnable Items', 'Sale items, accessories, and customised items are final sale and cannot be returned.'],
    ['How to Return', 'Email support@scarvenge.com with your order number and reason for return. We will send a return label within 2 business days.'],
    ['Refund Processing', 'Refunds are processed to your original payment method within 5–10 business days after we receive and inspect the returned item.'],
    ['Exchanges', 'To exchange for a different size or colour, return your item and place a new order. This ensures fastest processing.'],
  ]} />;
}

export function Privacy() {
  return <PolicyPage title="Privacy Policy" sections={[
    ['Information We Collect', 'We collect information you provide (name, email, shipping address, payment info) and usage data (pages visited, device info, IP address).'],
    ['How We Use Your Information', 'To process orders, send order updates, improve our website, and send promotional emails (with your consent).'],
    ['Data Sharing', 'We do not sell your data. We share data only with trusted partners necessary to fulfil your order (payment processors, courier services).'],
    ['Cookies', 'We use cookies to improve your browsing experience, analyse site traffic, and personalise content. You can disable cookies in your browser settings.'],
    ['Contact', 'For privacy concerns, contact us at privacy@scarvenge.com.'],
  ]} />;
}

export function Terms() {
  return <PolicyPage title="Terms & Conditions" sections={[
    ['Acceptance', 'By using our website, you agree to these terms. If you do not agree, please do not use our site.'],
    ['Products', 'We reserve the right to modify or discontinue products at any time. Prices are subject to change without notice.'],
    ['Orders', 'We reserve the right to refuse any order. In case of stock unavailability, we will notify you and offer alternatives or a full refund.'],
    ['Intellectual Property', 'All content on this website — logos, images, copy, design — is owned by SCARVENGE and protected by copyright law.'],
    ['Limitation of Liability', 'SCARVENGE is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.'],
  ]} />;
}
