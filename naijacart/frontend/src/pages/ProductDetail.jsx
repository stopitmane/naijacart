import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../hooks/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG');

export default function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    productAPI.getOne(id)
      .then(r => { setData(r.data.data); setRelated(r.data.related); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!data) return <div style={{ textAlign: 'center', padding: 60 }}>Product not found. <Link to="/shop">Back to shop</Link></div>;

  const discount = data.originalPrice ? Math.round((1 - data.price / data.originalPrice) * 100) : 0;

  return (
    <div style={{ padding: '32px 20px' }}>
      <div className="container">
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
          <Link to="/" style={{ color: '#008751' }}>Home</Link> › <Link to="/shop" style={{ color: '#008751' }}>Shop</Link> › {data.name}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, background: 'white', borderRadius: 16, padding: 32, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: 40 }}>
          <div style={{ position: 'relative' }}>
            <img src={data.image} alt={data.name} style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 420 }} />
            {discount > 0 && <span style={{ position: 'absolute', top: 16, right: 16, background: '#EF4444', color: 'white', padding: '6px 12px', borderRadius: 8, fontWeight: 700 }}>-{discount}%</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <span style={{ fontSize: 12, color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.5px' }}>{data.category}</span>
              <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginTop: 6, lineHeight: 1.3 }}>{data.name}</h1>
              <p style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Sold by <span style={{ color: '#008751', fontWeight: 600 }}>{data.seller}</span></p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#F59E0B', fontSize: 18 }}>{'★'.repeat(Math.floor(data.rating))}</span>
              <span style={{ fontWeight: 700 }}>{data.rating}</span>
              <span style={{ color: '#6B7280', fontSize: 14 }}>({data.reviews.toLocaleString()} reviews)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#008751' }}>{fmt(data.price)}</span>
              {data.originalPrice && <span style={{ fontSize: 18, color: '#9CA3AF', textDecoration: 'line-through' }}>{fmt(data.originalPrice)}</span>}
            </div>

            <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>{data.description}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: data.stock > 0 ? '#008751' : '#EF4444', display: 'inline-block' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: data.stock > 0 ? '#006B3C' : '#DC2626' }}>
                {data.stock > 0 ? `In Stock (${data.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', background: '#F3F4F6', borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 42, height: 42, border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', fontWeight: 700 }}>−</button>
                <span style={{ width: 40, textAlign: 'center', fontWeight: 700 }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ width: 42, height: 42, border: 'none', background: 'none', fontSize: 20, cursor: 'pointer', fontWeight: 700 }}>+</button>
              </div>
              <button onClick={() => addItem(data, qty)} disabled={data.stock === 0}
                style={{ flex: 1, background: '#008751', color: 'white', border: 'none', borderRadius: 10, padding: '13px 20px', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.target.style.background = '#006B3C'}
                onMouseLeave={e => e.target.style.background = '#008751'}>
                🛒 Add to Cart
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, background: '#F9FAFB', borderRadius: 10, padding: 16, marginTop: 8 }}>
              {[['🚚', 'Fast Delivery', '2–4 days Lagos'], ['🔒', 'Secure Payment', 'Paystack protected'], ['↩️', 'Easy Returns', '7-day policy'], ['✅', 'Quality Assured', 'Verified sellers']].map(([icon, title, sub]) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <div><p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>{title}</p><p style={{ fontSize: 11, color: '#6B7280', margin: 0 }}>{sub}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>You Might Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
