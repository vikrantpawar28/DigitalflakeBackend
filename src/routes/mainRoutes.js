const express = require('express');
const router = express.Router();
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');

router.get('/protected',(req, res) => {
  res.json({ message: 'This is a protected route' });
});
router.use('/categories', categoryRoutes);

router.use('/products', productRoutes);

module.exports = router;
