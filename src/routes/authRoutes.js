const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const categoryController = require('../controllers/CategoryController');

router.get('/', categoryController.getCategories);

router.post('/signup', authController.signup);


router.post('/login', authController.login);

module.exports = router;
