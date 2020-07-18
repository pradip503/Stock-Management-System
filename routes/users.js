var express = require('express');
var router = express.Router();
var brands = require('../services/brand');
var categories = require('../services/category');
var products = require('../services/product');
var orders = require('../services/order');
var dashboard = require('../services/dashboard');

/* BRAND'S API. */
router.get('/fetchBrands', brands.fetchBrands);
router.post('/addBrand', brands.insertBrand);
router.post('/fetchSelectedBrand', brands.fetchSelectedBrand);
router.post('/editBrand', brands.editBrand);
router.post('/removeBrand', brands.removeBrand);

/* CATEGORY'S API. */
router.get('/fetchCategories', categories.fetchCategories);
router.post('/addCategories', categories.insertCategories);
router.post('/fetchSelectedCategory', categories.fetchSelectedCategory);
router.post('/editCategory', categories.editCategory);
router.post('/removeCategory', categories.removeCategory);

/*PRODUCT'S API*/
router.get('/fetchProducts', products.fetchProducts);
router.post('/addProduct', products.insertProduct);
router.post('/fetchSelectedProduct', products.fetchSelectedProduct);
router.post('/editProduct', products.editProduct);
router.post('/removeProduct', products.removeProduct);

/*ORDER'S API*/
router.get('/fetchOrders', orders.fetchOrders);
router.post('/addOrder', orders.createOrder);
router.post('/fetchProductData', orders.fetchProductData);


/*DASHBOARD'S API*/
router.get('/getTotalOrders', dashboard.countTotalOrders);
router.get('/getTotalProducts', dashboard.countTotalProducts);
router.get('/getLowStock', dashboard.countLowStock);
router.get('/getTotalUnitsSold', dashboard.getTotalUnitsSold);
router.get('/getTotalRevenue', dashboard.getTotalRevenue);
router.get('/getTotalCashReceived', dashboard.getTotalPaid);


module.exports = router;
