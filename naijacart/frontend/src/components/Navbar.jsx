import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={{ background: '#008751', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top bar */}
      <div style={{ background: '#006B3C', padding: '6px 20px', fontSize: '12px', color: 'rgba(255,255,255,0.85)', textAlign: 'center' }}>
        🚚 Free delivery on orders over ₦50,000 &nbsp;|&nbsp; 📞 Support: 0800-NAIJACART
      </div>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>
            🛒 Naija<span style={{ color: '#FCD34D' }}>Cart</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', maxWidth: 520 }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search for food, fashion, electronics..."
            style={{ flex: 1, padding: '10px 16px', border: 'none', borderRadius: '8px 0 0 8px', fontSize: 14, outline: 'none' }}
          />
          <button type="submit" style={{ background: '#FCD34D', border: 'none', padding: '10px 16px', borderRadius: '0 8px 8px 0', cursor: 'pointer', fontSize: 16 }}>
            🔍
          </button>
        </form>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
          <Link to="/shop" style={{ color: 'white', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' }}>Shop</Link>

          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', padding: '8px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                👤 {user?.name?.split(' ')[0]}
              </button>
              {menuOpen && (
                <div style={{ position: 'absolute', right: 0, top: '110%', background: 'white', borderRadius: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', minWidth: 160, zIndex: 200, overflow: 'hidden' }}>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 16px', fontSize: 14, color: '#1F2937', borderBottom: '1px solid #F3F4F6' }}>📦 My Orders</Link>
                  <button onClick={handleLogout} style={{ width: '100%', padding: '12px 16px', fontSize: 14, color: '#EF4444', background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>Login</Link>
          )}

          <Link to="/cart" style={{ position: 'relative', color: 'white', fontSize: 22, display: 'flex', alignItems: 'center' }}>
            🛒
            {count > 0 && (
              <span style={{ position: 'absolute', top: -8, right: -8, background: '#FCD34D', color: '#1F2937', borderRadius: '50%', width: 18, height: 18, fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
