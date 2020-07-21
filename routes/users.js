var express = require('express');
var router = express.Router();
var brands = require('../services/brand');
var units = require('../services/unit');
var categories = require('../services/category');
var products = require('../services/product');
var orders = require('../services/order');
var dashboard = require('../services/dashboard');
var report = require('../services/report');

/* BRAND'S API. */
router.get('/fetchBrands',checkIfAuthenticated, brands.fetchBrands);
router.post('/addBrand',checkIfAuthenticated, brands.insertBrand);
router.post('/fetchSelectedBrand',checkIfAuthenticated, brands.fetchSelectedBrand);
router.post('/editBrand',checkIfAuthenticated, brands.editBrand);
router.post('/removeBrand',checkIfAuthenticated, brands.removeBrand);

/* UNIT'S API. */
router.get('/fetchUnits',checkIfAuthenticated, units.fetchUnits);
router.post('/addUnit',checkIfAuthenticated, units.insertUnit);
router.post('/fetchSelectedUnit',checkIfAuthenticated, units.fetchSelectedUnit);
router.post('/editUnit',checkIfAuthenticated, units.editUnit);
router.post('/removeUnit',checkIfAuthenticated, units.removeUnit);

/* CATEGORY'S API. */
router.get('/fetchCategories',checkIfAuthenticated, categories.fetchCategories);
router.post('/addCategories',checkIfAuthenticated, categories.insertCategories);
router.post('/fetchSelectedCategory',checkIfAuthenticated, categories.fetchSelectedCategory);
router.post('/editCategory',checkIfAuthenticated, categories.editCategory);
router.post('/removeCategory',checkIfAuthenticated, categories.removeCategory);

/*PRODUCT'S API*/
router.get('/fetchProducts',checkIfAuthenticated, products.fetchProducts);
router.post('/addProduct',checkIfAuthenticated, products.insertProduct);
router.post('/fetchSelectedProduct',checkIfAuthenticated, products.fetchSelectedProduct);
router.post('/editProduct',checkIfAuthenticated, products.editProduct);
router.post('/removeProduct',checkIfAuthenticated, products.removeProduct);

/*ORDER'S API*/
router.get('/fetchOrders',checkIfAuthenticated, orders.fetchOrders);
router.post('/addOrder',checkIfAuthenticated, orders.createOrder);
router.post('/fetchProductData',checkIfAuthenticated, orders.fetchProductData);
router.post('/fetchOrderItem',checkIfAuthenticated,orders.fetchOrderItem);
router.post('/editOrder',checkIfAuthenticated,orders.editOrder);
router.post('/fetchOrdersByDate',checkIfAuthenticated,orders.fetchOrdersByDate);

/*DASHBOARD'S API*/
router.get('/getTotalOrders',checkIfAuthenticated, dashboard.countTotalOrders);
router.get('/getTotalProducts',checkIfAuthenticated, dashboard.countTotalProducts);
router.get('/getLowStock',checkIfAuthenticated, dashboard.countLowStock);
router.get('/getTotalUnitsSold',checkIfAuthenticated, dashboard.getTotalUnitsSold);
router.get('/getTotalRevenue',checkIfAuthenticated, dashboard.getTotalRevenue);
router.get('/getTotalCashReceived',checkIfAuthenticated, dashboard.getTotalPaid);

/*REPORT'S API*/
router.post('/generateReport',checkIfAuthenticated, report.generateReport);

function checkIfAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next()
    }
  
    res.redirect('/');
  };


/*DASHBOARD'S API*/
router.get('/getTotalOrders', dashboard.countTotalOrders);
router.get('/getTotalProducts', dashboard.countTotalProducts);
router.get('/getLowStock', dashboard.countLowStock);
router.get('/getTotalUnitsSold', dashboard.getTotalUnitsSold);
router.get('/getTotalRevenue', dashboard.getTotalRevenue);
router.get('/getTotalCashReceived', dashboard.getTotalPaid);

/*REPORT'S API*/
router.post('/generateReport', report.generateReport);


module.exports = router;
