const express = require('express');
const { products, categories } = require('../data/products');
const router = express.Router();

// GET /api/products — list with filter/search/sort
router.get('/', (req, res) => {
  let result = [...products];
  const { category, search, sort, minPrice, maxPrice, page = 1, limit = 12 } = req.query;

  if (category && category !== 'All') {
    result = result.filter(p => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  if (minPrice) result = result.filter(p => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter(p => p.price <= Number(maxPrice));

  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
  else if (sort === 'popular') result.sort((a, b) => b.reviews - a.reviews);

  const total = result.length;
  const startIdx = (Number(page) - 1) * Number(limit);
  const paginated = result.slice(startIdx, startIdx + Number(limit));

  res.json({
    success: true,
    data: paginated,
    pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / Number(limit)) }
  });
});

// GET /api/products/categories
router.get('/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// GET /api/products/featured
router.get('/featured', (req, res) => {
  const featured = products.filter(p => p.badge === 'Bestseller' || p.badge === 'Hot Deal').slice(0, 6);
  res.json({ success: true, data: featured });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ success: false, message: 'Product not found.' });
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  res.json({ success: true, data: product, related });
});

module.exports = router;
