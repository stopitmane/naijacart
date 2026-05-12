import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../hooks/api';

const categories = [
  { name: 'Food & Groceries', icon: '🥘', color: '#FEF3C7' },
  { name: 'Fashion', icon: '👗', color: '#FCE7F3' },
  { name: 'Electronics', icon: '📱', color: '#DBEAFE' },
  { name: 'Beauty & Health', icon: '💄', color: '#FDE68A' },
  { name: 'Home & Kitchen', icon: '🏠', color: '#D1FAE5' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    productAPI.getFeatured()
      .then(r => setFeatured(r.data.data))
      .catch(err => {
        console.log('API not available, using demo mode');
        // Demo products for when backend is not available
        setFeatured([
          { 
            id: 1, 
            name: 'Ofada Rice (5kg)', 
            price: 8500, 
            image: 'https://via.placeholder.com/300x200/008751/ffffff?text=Ofada+Rice', 
            rating: 4.8, 
            reviews: 245,
            category: 'Food & Groceries',
            seller: 'Lagos Farms',
            badge: 'Local'
          },
          { 
            id: 2, 
            name: 'Ankara Dress', 
            price: 15000, 
            originalPrice: 18000,
            image: 'https://via.placeholder.com/300x200/008751/ffffff?text=Ankara+Dress', 
            rating: 4.9, 
            reviews: 89,
            category: 'Fashion',
            seller: 'Naija Styles',
            badge: 'Handmade'
          },
          { 
            id: 3, 
            name: 'Palm Oil (1L)', 
            price: 2500, 
            image: 'https://via.placeholder.com/300x200/008751/ffffff?text=Palm+Oil', 
            rating: 4.7, 
            reviews: 156,
            category: 'Food & Groceries',
            seller: 'Fresh Oils Ltd',
            badge: 'Natural'
          }
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #008751 0%, #006B3C 50%, #004D2A 100%)', color: 'white', padding: '80px 20px', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -80, left: '30%', width: 400, height: 400, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
        <div className="container" style={{ position: 'relative', maxWidth: 700 }}>
          <span style={{ background: 'rgba(252, 211, 77, 0.2)', color: '#FCD34D', padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, display: 'inline-block', marginBottom: 20 }}>
            🇳🇬 Nigeria's #1 Online Market
          </span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Shop Nigerian<br />
            <span style={{ color: '#FCD34D' }}>Support Nigeria</span>
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, marginBottom: 32, maxWidth: 520, lineHeight: 1.7 }}>
            From Ofada rice to Ankara fashion — discover authentic Nigerian products from trusted local sellers. Fast delivery across Lagos.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/shop" style={{ background: '#FCD34D', color: '#1F2937', padding: '14px 28px', borderRadius: 10, fontWeight: 800, fontSize: 15, display: 'inline-block' }}>
              Shop Now →
            </Link>
            <Link to="/shop?category=Food%20%26%20Groceries" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '14px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, display: 'inline-block', border: '1px solid rgba(255,255,255,0.3)' }}>
              Browse Food
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            {[['🚚', 'Fast Delivery', 'Lagos & beyond'], ['🔒', 'Secure Payment', 'Paystack & bank'], ['⭐', '4.8/5 Rating', 'From 10k+ buyers']].map(([icon, title, sub]) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>{icon}</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0 }}>{title}</p>
                  <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '60px 20px 40px' }}>
        <div className="container">
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 6 }}>Shop by Category</h2>
          <p style={{ color: '#6B7280', marginBottom: 28 }}>Find exactly what you need</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {categories.map(cat => (
              <Link key={cat.name} to={`/shop?category=${encodeURIComponent(cat.name)}`}
                style={{ background: cat.color, borderRadius: 12, padding: '24px 16px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <span style={{ fontSize: 36 }}>{cat.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 13, color: '#1F2937' }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section style={{ padding: '20px 20px 60px', background: '#F9FAFB' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>🔥 Trending Now</h2>
              <p style={{ color: '#6B7280' }}>Top-rated products this week</p>
            </div>
            <Link to="/shop" style={{ color: '#008751', fontWeight: 700, fontSize: 14 }}>View All →</Link>
          </div>
          {loading ? (
            <div className="page-loader"><div className="spinner" /></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 }}>
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section style={{ background: 'linear-gradient(135deg, #1F2937, #374151)', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <div className="container">
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>🚀 Free Delivery on Orders Over ₦50,000</h2>
          <p style={{ color: '#9CA3AF', marginBottom: 24, fontSize: 16 }}>Stock up and save on delivery. Shop more, pay less.</p>
          <Link to="/shop" style={{ background: '#008751', color: 'white', padding: '14px 32px', borderRadius: 10, fontWeight: 700, fontSize: 15, display: 'inline-block' }}>
            Shop Now & Save
          </Link>
        </div>
      </section>
    </div>
  );
}
