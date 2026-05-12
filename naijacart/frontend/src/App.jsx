import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Simple placeholder pages
const SimpleShop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const products = [
    { id: 1, name: 'Ofada Rice (5kg)', price: 8500, category: 'Food & Groceries', image: '🌾', rating: 4.8, seller: 'Lagos Farms' },
    { id: 2, name: 'Ankara Dress', price: 15000, category: 'Fashion', image: '👗', rating: 4.9, seller: 'Naija Styles' },
    { id: 3, name: 'Palm Oil (1L)', price: 2500, category: 'Food & Groceries', image: '🫒', rating: 4.7, seller: 'Fresh Oils' },
    { id: 4, name: 'iPhone 15', price: 850000, category: 'Electronics', image: '📱', rating: 4.6, seller: 'Tech Hub' },
    { id: 5, name: 'Jollof Spice Mix', price: 1200, category: 'Food & Groceries', image: '🌶️', rating: 4.9, seller: 'Mama\'s Kitchen' },
    { id: 6, name: 'Agbada (Men)', price: 25000, category: 'Fashion', image: '👔', rating: 4.8, seller: 'Royal Wear' },
    { id: 7, name: 'Plantain Chips', price: 800, category: 'Food & Groceries', image: '🍌', rating: 4.5, seller: 'Crispy Snacks' },
    { id: 8, name: 'Samsung TV 55"', price: 320000, category: 'Electronics', image: '📺', rating: 4.7, seller: 'Electronics Plus' },
    { id: 9, name: 'Gele Headwrap', price: 8500, category: 'Fashion', image: '👑', rating: 4.6, seller: 'Elegant Styles' },
    { id: 10, name: 'Yam Flour (2kg)', price: 3500, category: 'Food & Groceries', image: '🥔', rating: 4.4, seller: 'Farm Fresh' }
  ];

  const categories = ['All', 'Food & Groceries', 'Fashion', 'Electronics'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#008751', fontSize: '32px', marginBottom: '10px' }}>🛍️ Shop Nigerian Products</h1>
          <p style={{ color: '#666', fontSize: '16px' }}>Discover authentic Nigerian products from trusted local sellers</p>
        </div>

        {/* Search and Filters */}
        <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1, minWidth: '200px', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' }}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', minWidth: '150px' }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '16px', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}>
              {/* Product Image */}
              <div style={{ 
                background: 'linear-gradient(135deg, #008751, #006B3C)', 
                color: 'white', 
                height: '120px', 
                borderRadius: '8px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '48px',
                marginBottom: '12px'
              }}>
                {product.image}
              </div>

              {/* Product Info */}
              <div>
                <span style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                  {product.category}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '4px 0 8px 0', lineHeight: '1.4' }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#9CA3AF', margin: '0 0 8px 0' }}>by {product.seller}</p>
                
                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <span style={{ color: '#F59E0B', fontSize: '14px' }}>
                    {'★'.repeat(Math.floor(product.rating))}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>{product.rating}</span>
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#008751' }}>
                    ₦{product.price.toLocaleString()}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button style={{ 
                  width: '100%',
                  background: '#008751', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px', 
                  borderRadius: '8px', 
                  fontSize: '13px', 
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.target.style.background = '#006B3C'}
                onMouseLeave={e => e.target.style.background = '#008751'}
                onClick={() => alert(`Added ${product.name} to cart!`)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ fontSize: '20px', color: '#1F2937', marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: '#6B7280' }}>Try adjusting your search or filter criteria</p>
          </div>
        )}
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
