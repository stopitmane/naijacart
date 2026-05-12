import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG');

const BADGE_COLORS = {
  'Bestseller': { bg: '#FEF3C7', color: '#92400E' },
  'Hot Deal': { bg: '#FEE2E2', color: '#991B1B' },
  'Local': { bg: '#E8F5EE', color: '#006B3C' },
  'Organic': { bg: '#D1FAE5', color: '#065F46' },
  'Premium': { bg: '#EDE9FE', color: '#5B21B6' },
  'Handmade': { bg: '#FCE7F3', color: '#9D174D' },
  'NEPA Proof': { bg: '#FFF7ED', color: '#9A3412' },
  'Natural': { bg: '#D1FAE5', color: '#065F46' },
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  const badgeStyle = BADGE_COLORS[product.badge] || { bg: '#F3F4F6', color: '#374151' };

  return (
    <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}>

      <Link to={`/product/${product.id}`} style={{ position: 'relative', display: 'block' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: 200, objectFit: 'cover' }} loading="lazy" />
        {product.badge && (
          <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: badgeStyle.bg, color: badgeStyle.color }}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span style={{ position: 'absolute', top: 10, right: 10, background: '#EF4444', color: 'white', padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
            -{discount}%
          </span>
        )}
      </Link>

      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1F2937', lineHeight: 1.4, margin: 0 }}>{product.name}</h3>
        </Link>
        <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0 }}>by {product.seller}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#F59E0B', fontSize: 13 }}>{'★'.repeat(Math.floor(product.rating))}</span>
          <span style={{ fontSize: 12, color: '#6B7280' }}>{product.rating} ({product.reviews.toLocaleString()})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#008751' }}>{fmt(product.price)}</span>
          {product.originalPrice && (
            <span style={{ fontSize: 13, color: '#9CA3AF', textDecoration: 'line-through' }}>{fmt(product.originalPrice)}</span>
          )}
        </div>

        <button onClick={() => addItem(product)}
          style={{ marginTop: 'auto', background: '#008751', color: 'white', border: 'none', borderRadius: 8, padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
          onMouseEnter={e => e.target.style.background = '#006B3C'}
          onMouseLeave={e => e.target.style.background = '#008751'}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
