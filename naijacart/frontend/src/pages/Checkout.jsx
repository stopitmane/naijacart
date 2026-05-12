import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../hooks/api';
import toast from 'react-hot-toast';

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG');

const STATES = ['Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Onitsha', 'Enugu', 'Kaduna', 'Aba'];

export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', address: '', city: '', state: 'Lagos', paymentMethod: 'Pay on Delivery' });

  if (!isLoggedIn) return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <p style={{ fontSize: 48, marginBottom: 16 }}>🔐</p>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Please login to checkout</h2>
      <Link to="/login" style={{ background: '#008751', color: 'white', padding: '12px 28px', borderRadius: 10, fontWeight: 700, display: 'inline-block', marginTop: 8 }}>Login</Link>
    </div>
  );

  if (items.length === 0) { navigate('/cart'); return null; }

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    const { firstName, lastName, phone, address, city, state } = form;
    if (!firstName || !lastName || !phone || !address || !city) { toast.error('Please fill all required fields.'); return; }
    setLoading(true);
    try {
      const res = await orderAPI.place({
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
        shippingAddress: { firstName, lastName, phone, address, city, state },
        paymentMethod: form.paymentMethod
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate(`/orders/${res.data.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not place order. Try again.');
    } finally { setLoading(false); }
  };

  const inp = { padding: '11px 14px', borderRadius: 8, border: '1.5px solid #E5E7EB', fontSize: 14, width: '100%', outline: 'none', fontFamily: 'Inter, sans-serif', transition: 'border-color 0.2s' };

  return (
    <div style={{ padding: '32px 20px', minHeight: '70vh' }}>
      <div className="container">
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 28 }}>Checkout</h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
          {/* Form */}
          <div style={{ background: 'white', borderRadius: 12, padding: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>📍 Delivery Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['firstName', 'First Name *'], ['lastName', 'Last Name *'], ['phone', 'Phone Number *', 'tel'], ['city', 'City *']].map(([key, label, type]) => (
                <div key={key}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
                  <input name={key} value={form[key]} onChange={handleChange} type={type || 'text'} style={inp}
                    onFocus={e => e.target.style.borderColor = '#008751'}
                    onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                </div>
              ))}
              <div style={{ gridColumn: '1/-1' }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Street Address *</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="e.g. 15 Broad Street, Victoria Island" style={inp}
                  onFocus={e => e.target.style.borderColor = '#008751'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>State</label>
                <select name="state" value={form.state} onChange={handleChange} style={{ ...inp, cursor: 'pointer' }}>
                  {STATES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 28, marginBottom: 16 }}>💳 Payment Method</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Pay on Delivery', 'Bank Transfer', 'Paystack (Card)'].map(method => (
                <label key={method} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 10, border: `1.5px solid ${form.paymentMethod === method ? '#008751' : '#E5E7EB'}`, cursor: 'pointer', background: form.paymentMethod === method ? '#E8F5EE' : 'white', transition: 'all 0.2s' }}>
                  <input type="radio" name="paymentMethod" value={method} checked={form.paymentMethod === method} onChange={handleChange} style={{ accentColor: '#008751' }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: form.paymentMethod === method ? '#006B3C' : '#374151' }}>
                    {method === 'Pay on Delivery' ? '💵' : method === 'Bank Transfer' ? '🏦' : '💳'} {method}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', position: 'sticky', top: 80 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 16 }}>Order Summary</h2>
            <div style={{ maxHeight: 240, overflowY: 'auto', marginBottom: 16 }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#1F2937' }}>{item.name}</p>
                    <p style={{ fontSize: 12, color: '#6B7280' }}>x{item.quantity}</p>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#008751' }}>{fmt(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #F3F4F6', marginBottom: 12 }} />
            {[['Subtotal', fmt(subtotal)], ['Delivery', deliveryFee === 0 ? 'FREE 🎉' : fmt(deliveryFee)]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#6B7280', marginBottom: 8 }}>
                <span>{l}</span><span style={{ fontWeight: 600, color: v.includes('FREE') ? '#008751' : '#1F2937' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 17, marginTop: 8 }}>
              <span>Total</span><span style={{ color: '#008751' }}>{fmt(total)}</span>
            </div>
            <button onClick={handleSubmit} disabled={loading}
              style={{ width: '100%', background: loading ? '#9CA3AF' : '#008751', color: 'white', padding: '14px', borderRadius: 10, fontWeight: 700, fontSize: 15, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 20, transition: 'background 0.2s' }}>
              {loading ? 'Placing Order...' : '🛍️ Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
