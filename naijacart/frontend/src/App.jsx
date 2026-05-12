import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Simple placeholder pages
const SimpleShop = () => {
  console.log('Shop page rendered');
  return (
    <div style={{ padding: '50px', textAlign: 'center', background: '#f9f9f9', minHeight: '400px' }}>
      <h1 style={{ color: '#008751', fontSize: '32px', marginBottom: '20px' }}>🛍️ Shop</h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>Shop page is working!</p>
      <p style={{ color: '#666' }}>Browse our amazing Nigerian products.</p>
      <div style={{ marginTop: '30px' }}>
        <div style={{ display: 'inline-block', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <p>🥘 Food & Groceries</p>
          <p>👗 Fashion</p>
          <p>📱 Electronics</p>
        </div>
      </div>
    </div>
  );
};

const SimpleLogin = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1 style={{ color: '#008751' }}>🔐 Login</h1>
    <p>Login page coming soon!</p>
    <div style={{ maxWidth: 300, margin: '20px auto', textAlign: 'left' }}>
      <input placeholder="Email" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
      <input placeholder="Password" type="password" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
      <button style={{ width: '100%', padding: '10px', background: '#008751', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Login
      </button>
    </div>
  </div>
);

const SimpleCart = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <h1 style={{ color: '#008751' }}>🛒 Cart</h1>
    <p>Your cart is empty</p>
    <p>Add some products to get started!</p>
  </div>
);

const SimpleFooter = () => (
  <footer style={{ background: '#1F2937', color: 'white', padding: '20px', textAlign: 'center' }}>
    <p>© 2026 NaijaCart</p>
  </footer>
);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<SimpleShop />} />
              <Route path="/shop/*" element={<SimpleShop />} />
              <Route path="/login" element={<SimpleLogin />} />
              <Route path="/register" element={<SimpleLogin />} />
              <Route path="/cart" element={<SimpleCart />} />
              <Route path="*" element={
                <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                  <p style={{ fontSize: 64 }}>🔍</p>
                  <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Page not found</h2>
                  <a href="/" style={{ color: '#008751', fontWeight: 700 }}>← Go Home</a>
                </div>
              } />
            </Routes>
          </main>
          <SimpleFooter />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
