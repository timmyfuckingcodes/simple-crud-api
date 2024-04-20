const express = require('express');
const Product = require("../models/product.model.js")
const router = express.Router();
const {getProducts} = require('../controller/product.controller.js');
const {getProduct} = require('../controller/product.controller.js');
const {postProduct} = require('../controller/product.controller.js');

router.get('/', getProducts);
router.get('/:id',getProduct);
router.post('/', postProduct)

module.exports = router;