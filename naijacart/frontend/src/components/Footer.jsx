import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#1F2937', color: '#D1D5DB', marginTop: 60 }}>
      <div className="container" style={{ padding: '48px 20px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32 }}>
        <div>
          <h3 style={{ color: 'white', fontSize: 20, fontWeight: 800, marginBottom: 12 }}>🛒 Naija<span style={{ color: '#FCD34D' }}>Cart</span></h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#9CA3AF' }}>Nigeria's premier online marketplace. Shop local, support Nigerian businesses.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {['🐦', '📘', '📸'].map((icon, i) => (
              <span key={i} style={{ width: 36, height: 36, background: '#374151', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, cursor: 'pointer' }}>{icon}</span>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Shop</h4>
          {['Food & Groceries', 'Fashion', 'Electronics', 'Beauty & Health', 'Home & Kitchen'].map(cat => (
            <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`} style={{ display: 'block', fontSize: 14, color: '#9CA3AF', marginBottom: 8, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#FCD34D'}
              onMouseLeave={e => e.target.style.color = '#9CA3AF'}>{cat}</Link>
          ))}
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Help</h4>
          {['FAQs', 'Delivery Info', 'Returns Policy', 'Track My Order', 'Contact Us'].map(item => (
            <p key={item} style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 8 }}>{item}</p>
          ))}
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: 14, fontWeight: 700, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact</h4>
          <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 8 }}>📍 Lagos, Nigeria</p>
          <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 8 }}>📞 0800-NAIJACART</p>
          <p style={{ fontSize: 14, color: '#9CA3AF', marginBottom: 16 }}>✉ hello@naijacart.ng</p>
          <div style={{ background: '#374151', borderRadius: 8, padding: 12, fontSize: 12, color: '#9CA3AF' }}>
            <p style={{ fontWeight: 700, color: 'white', marginBottom: 4 }}>Payment Methods</p>
            <p>💳 Paystack &nbsp; 🏦 Bank Transfer</p>
            <p style={{ marginTop: 4 }}>📱 USSD &nbsp; 💵 Pay on Delivery</p>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid #374151', textAlign: 'center', padding: '16px 20px', fontSize: 13, color: '#6B7280' }}>
        © 2025 NaijaCart. Built with ❤️ in Lagos, Nigeria. | <span style={{ color: '#FCD34D' }}>🇳🇬 Shop Nigerian, Support Nigerian</span>
      </div>
    </footer>
  );
}
