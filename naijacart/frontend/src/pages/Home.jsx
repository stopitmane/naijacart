import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Simple Hero */}
      <section style={{ 
        background: 'linear-gradient(135deg, #008751 0%, #006B3C 50%, #004D2A 100%)', 
        color: 'white', 
        padding: '80px 20px', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <span style={{ 
            background: 'rgba(252, 211, 77, 0.2)', 
            color: '#FCD34D', 
            padding: '6px 16px', 
            borderRadius: 20, 
            fontSize: 13, 
            fontWeight: 700, 
            display: 'inline-block', 
            marginBottom: 20 
          }}>
            🇳🇬 Nigeria's #1 Online Market
          </span>
          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15, marginBottom: 20 }}>
            Shop Nigerian<br />
            <span style={{ color: '#FCD34D' }}>Support Nigeria</span>
          </h1>
          <p style={{ fontSize: 18, opacity: 0.88, marginBottom: 32, lineHeight: 1.7 }}>
            From Ofada rice to Ankara fashion — discover authentic Nigerian products from trusted local sellers.
          </p>
          <Link to="/shop" style={{ 
            background: '#FCD34D', 
            color: '#1F2937', 
            padding: '14px 28px', 
            borderRadius: 10, 
            fontWeight: 800, 
            fontSize: 15, 
            display: 'inline-block',
            textDecoration: 'none'
          }}>
            Shop Now →
          </Link>
        </div>
      </section>

      {/* Simple Categories */}
      <section style={{ padding: '60px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 28 }}>Shop by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            <a href="/shop?category=Food%20%26%20Groceries" style={{ 
              background: '#FEF3C7', 
              borderRadius: 12, 
              padding: '24px 16px', 
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>🥘</span>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#1F2937', margin: 0 }}>Food & Groceries</p>
            </a>
            <a href="/shop?category=Fashion" style={{ 
              background: '#FCE7F3', 
              borderRadius: 12, 
              padding: '24px 16px', 
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>👗</span>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#1F2937', margin: 0 }}>Fashion</p>
            </a>
            <a href="/shop?category=Electronics" style={{ 
              background: '#DBEAFE', 
              borderRadius: 12, 
              padding: '24px 16px', 
              textAlign: 'center',
              textDecoration: 'none',
              display: 'block',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <span style={{ fontSize: 36, display: 'block', marginBottom: 10 }}>📱</span>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#1F2937', margin: 0 }}>Electronics</p>
            </a>
          </div>
        </div>
      </section>

      {/* Simple Products */}
      <section style={{ padding: '60px 20px', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 28 }}>🔥 Trending Now</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ background: '#008751', color: 'white', height: 120, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 24 }}>
                📦
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ofada Rice (5kg)</h3>
              <p style={{ color: '#008751', fontWeight: 700 }}>₦8,500</p>
            </div>
            <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ background: '#008751', color: 'white', height: 120, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: 24 }}>
                📦
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Ankara Dress</h3>
              <p style={{ color: '#008751', fontWeight: 700 }}>₦15,000</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
