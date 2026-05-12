import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG');

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal, deliveryFee, total, count } = useCart();

  if (items.length === 0) return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: '#6B7280' }}>
      <p style={{ fontSize: 64, marginBottom: 16 }}>🛒</p>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 8 }}>Your cart is empty</h2>
      <p style={{ marginBottom: 24 }}>Add some great Nigerian products!</p>
      <Link to="/shop" style={{ background: '#008751', color: 'white', padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15 }}>Shop Now</Link>
    </div>
  );

  return (
    <div style={{ padding: '32px 20px', minHeight: '70vh' }}>
      <div className="container">
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>🛒 My Cart</h1>
        <p style={{ color: '#6B7280', marginBottom: 28 }}>{count} item{count !== 1 ? 's' : ''}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map(item => (
              <div key={item.id} style={{ background: 'white', borderRadius: 12, padding: 16, display: 'flex', gap: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1F2937', marginBottom: 4 }}>{item.name}</h3>
                  <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>{item.category}</p>
                  <p style={{ fontSize: 17, fontWeight: 800, color: '#008751' }}>{fmt(item.price)}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F3F4F6', borderRadius: 8, padding: '4px 8px' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: 28, height: 28, border: 'none', background: 'white', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>−</button>
                    <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: 28, height: 28, border: 'none', background: 'white', borderRadius: 6, fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>+</button>
                  </div>
                  <p style={{ fontWeight: 800, fontSize: 14, color: '#1F2937' }}>{fmt(item.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: 80 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6B7280' }}>
                <span>Subtotal ({count} items)</span><span style={{ fontWeight: 600, color: '#1F2937' }}>{fmt(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6B7280' }}>
                <span>Delivery fee</span>
                <span style={{ fontWeight: 600, color: deliveryFee === 0 ? '#008751' : '#1F2937' }}>
                  {deliveryFee === 0 ? 'FREE 🎉' : fmt(deliveryFee)}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p style={{ fontSize: 12, color: '#F59E0B', background: '#FEF3C7', padding: '8px 12px', borderRadius: 6 }}>
                  Add {fmt(50000 - subtotal)} more for free delivery!
                </p>
              )}
              <hr style={{ border: 'none', borderTop: '1px solid #F3F4F6' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 17 }}>
                <span>Total</span><span style={{ color: '#008751' }}>{fmt(total)}</span>
              </div>
            </div>
            <Link to="/checkout" style={{ display: 'block', background: '#008751', color: 'white', textAlign: 'center', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15, marginTop: 20 }}>
              Proceed to Checkout →
            </Link>
            <Link to="/shop" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: 13, color: '#6B7280' }}>← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
