const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const pagination = require('../common/pagination');
const Product = require('../models/Product');
const {isAdmin, isAuth} = require("../common/middleware/is-auth");

router.post('/add', isAuth, isAdmin, ProductController.createProduct);
router.get('/get-all', pagination, ProductController.getAllProducts);
router.get('/get/:id', ProductController.getProductById);
router.put('/update/:id', ProductController.updateProductById);


module.exports = router;
