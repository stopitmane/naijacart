import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productAPI } from '../hooks/api';

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const CATEGORIES = ['All', 'Food & Groceries', 'Fashion', 'Electronics', 'Beauty & Health', 'Home & Kitchen'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  const category = searchParams.get('category') || 'All';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const page = Number(searchParams.get('page') || 1);

  const fetchProducts = useCallback(() => {
    setLoading(true);
    const params = { page, limit: 12 };
    if (category && category !== 'All') params.category = category;
    if (search) params.search = search;
    if (sort) params.sort = sort;
    productAPI.getAll(params)
      .then(r => { setProducts(r.data.data); setPagination(r.data.pagination); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search, sort, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const setParam = (key, value) => {
    const p = new URLSearchParams(searchParams);
    if (value) p.set(key, value); else p.delete(key);
    p.delete('page');
    setSearchParams(p);
  };

  return (
    <div style={{ padding: '32px 20px', minHeight: '70vh' }}>
      <div className="container">
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1F2937', marginBottom: 4 }}>
          {search ? `Results for "${search}"` : category !== 'All' ? category : 'All Products'}
        </h1>
        <p style={{ color: '#6B7280', marginBottom: 24 }}>{pagination.total || 0} products found</p>

        {/* Filters row */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center' }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setParam('category', cat === 'All' ? '' : cat)}
                style={{ padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: '1.5px solid', transition: 'all 0.2s',
                  background: category === cat || (cat === 'All' && !category) ? '#008751' : 'white',
                  color: category === cat || (cat === 'All' && !category) ? 'white' : '#374151',
                  borderColor: category === cat || (cat === 'All' && !category) ? '#008751' : '#D1D5DB' }}>
                {cat}
              </button>
            ))}
          </div>
          <select value={sort} onChange={e => setParam('sort', e.target.value)}
            style={{ marginLeft: 'auto', padding: '8px 14px', borderRadius: 8, border: '1.5px solid #D1D5DB', fontSize: 13, color: '#374151', outline: 'none', background: 'white', cursor: 'pointer' }}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="page-loader"><div className="spinner" /></div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6B7280' }}>
            <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
            <p style={{ fontSize: 18, fontWeight: 600 }}>No products found</p>
            <p>Try a different search or category</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: 20 }}>
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            {/* Pagination */}
            {pagination.pages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => { const params = new URLSearchParams(searchParams); params.set('page', p); setSearchParams(params); }}
                    style={{ width: 38, height: 38, borderRadius: 8, border: '1.5px solid', fontWeight: 600, cursor: 'pointer',
                      background: page === p ? '#008751' : 'white', color: page === p ? 'white' : '#374151', borderColor: page === p ? '#008751' : '#D1D5DB' }}>
                    {p}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
