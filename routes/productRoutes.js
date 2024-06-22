// routes/products.js

const express = require('express');
const productsData = require('../data/products');

const router = express.Router();

// Get all products with filters and pagination
router.get('/products', (req, res) => {
  const { productName, rating, priceRange, availability, discount, sort, page } = req.query;
  let filteredProducts = [...productsData]; // Clone the products array

  // Filtering logic
  if (productName) {
    filteredProducts = filteredProducts.filter(product => product.productName === productName);
  }
  if (rating) {
    filteredProducts = filteredProducts.filter(product => product.rating >= parseFloat(rating));
  }
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
  }
  if (availability) {
    filteredProducts = filteredProducts.filter(product => product.availability === availability);
  }
  if (discount) {
    filteredProducts = filteredProducts.filter(product => product.discount >= parseFloat(discount));
  }

  // Sorting logic
  if (sort) {
    filteredProducts.sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'discount') return b.discount - a.discount;
      return 0;
    });
  }

  // Pagination logic
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  res.json({
    totalProducts: filteredProducts.length,
    currentPage: page,
    pageSize: pageSize,
    products: paginatedProducts
  });
});

// Get product by ID
router.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productsData.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
