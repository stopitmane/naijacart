import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

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
