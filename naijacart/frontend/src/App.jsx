import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { Login, Register } from './pages/Auth';
import { OrdersList, OrderDetail } from './pages/Orders';

export default function App() {
  // Simple test to check if React is working
  console.log('App component loaded');
  
  try {
    return (
      <AuthProvider>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/orders" element={<OrdersList />} />
                <Route path="/orders/:id" element={<OrderDetail />} />
                <Route path="*" element={
                  <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <p style={{ fontSize: 64 }}>🔍</p>
                    <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Page not found</h2>
                    <a href="/" style={{ color: '#008751', fontWeight: 700 }}>← Go Home</a>
                  </div>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    );
  } catch (error) {
    console.error('App render error:', error);
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>🚨 App Error</h1>
        <p>Something went wrong. Check console for details.</p>
        <pre style={{ background: '#f5f5f5', padding: '20px', textAlign: 'left' }}>
          {error.toString()}
        </pre>
      </div>
    );
  }
}
