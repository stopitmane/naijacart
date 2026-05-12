import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../hooks/api';
import { useAuth } from '../context/AuthContext';

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG');
const STATUS_COLORS = { Confirmed: '#008751', Processing: '#F59E0B', Shipped: '#3B82F6', Delivered: '#6B7280', Cancelled: '#EF4444' };

export function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) return;
    orderAPI.getAll().then(r => setOrders(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) return <div style={{ textAlign: 'center', padding: 60 }}><Link to="/login" style={{ color: '#008751', fontWeight: 700 }}>Login to view orders</Link></div>;
  if (loading) return <div className="page-loader"><div className="spinner" /></div>;

  return (
    <div style={{ padding: '32px 20px', minHeight: '70vh' }}>
      <div className="container">
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 24 }}>📦 My Orders</h1>
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#6B7280' }}>
            <p style={{ fontSize: 48 }}>📭</p>
            <p style={{ fontSize: 18, fontWeight: 600, marginTop: 12 }}>No orders yet</p>
            <Link to="/shop" style={{ color: '#008751', fontWeight: 700, display: 'block', marginTop: 8 }}>Start Shopping →</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {orders.map(order => (
              <Link key={order.id} to={`/orders/${order.id}`}
                style={{ background: 'white', borderRadius: 12, padding: '20px 24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.10)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 16, color: '#1F2937' }}>Order {order.id}</p>
                  <p style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>{order.items.length} item{order.items.length !== 1 ? 's' : ''} · {new Date(order.createdAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 800, fontSize: 17, color: '#008751' }}>{fmt(order.total)}</p>
                  <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}>
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderAPI.getOne(id).then(r => setOrder(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-loader"><div className="spinner" /></div>;
  if (!order) return <div style={{ textAlign: 'center', padding: 60 }}>Order not found. <Link to="/orders" style={{ color: '#008751' }}>View all orders</Link></div>;

  return (
    <div style={{ padding: '32px 20px', minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <Link to="/orders" style={{ color: '#008751', fontSize: 14, fontWeight: 600 }}>← Back to Orders</Link>
        <div style={{ background: 'white', borderRadius: 16, padding: 32, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1F2937' }}>Order {order.id}</h1>
              <p style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>Placed {new Date(order.createdAt).toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <span style={{ padding: '6px 14px', borderRadius: 20, fontWeight: 700, fontSize: 13, background: STATUS_COLORS[order.status] + '20', color: STATUS_COLORS[order.status] }}>{order.status}</span>
          </div>

          <div style={{ background: '#E8F5EE', borderRadius: 10, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 28 }}>🎉</span>
            <div>
              <p style={{ fontWeight: 700, color: '#006B3C' }}>Order Confirmed!</p>
              <p style={{ fontSize: 13, color: '#2D6A4F' }}>Estimated delivery by {new Date(order.estimatedDelivery).toLocaleDateString('en-NG', { day: 'numeric', month: 'long' })}</p>
            </div>
          </div>

          <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Items Ordered</h3>
          {order.items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center', padding: '12px', background: '#F9FAFB', borderRadius: 10 }}>
              <img src={item.image} alt={item.name} style={{ width: 50, height: 50, borderRadius: 8, objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</p>
                <p style={{ fontSize: 12, color: '#6B7280' }}>Qty: {item.quantity}</p>
              </div>
              <p style={{ fontWeight: 800, color: '#008751' }}>{fmt(item.price * item.quantity)}</p>
            </div>
          ))}

          <hr style={{ border: 'none', borderTop: '1px solid #F3F4F6', margin: '20px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Subtotal', fmt(order.subtotal)], ['Delivery', order.deliveryFee === 0 ? 'FREE' : fmt(order.deliveryFee)], ['Payment', order.paymentMethod]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#6B7280' }}>
                <span>{l}</span><span style={{ fontWeight: 600, color: '#1F2937' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18, marginTop: 4 }}>
              <span>Total</span><span style={{ color: '#008751' }}>{fmt(order.total)}</span>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #F3F4F6', margin: '20px 0' }} />
          <h3 style={{ fontWeight: 700, marginBottom: 10 }}>Delivery Address</h3>
          <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.7 }}>
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
            {order.shippingAddress.address}<br />
            {order.shippingAddress.city}, {order.shippingAddress.state}<br />
            📞 {order.shippingAddress.phone}
          </p>
        </div>
      </div>
    </div>
  );
}
