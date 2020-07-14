var express = require('express');
var router = express.Router();
var db = require('../config/db');
const { connect } = require('../config/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('website/login');
});

/* GET dashboard page. */
router.get('/dashboard', function (req, res, next) {
  res.render('website/dashboard');
});


/* GET brand page. */
router.get('/brand', function (req, res, next) {
  res.render('website/brand');
});

/* GET category page. */
router.get('/category', function (req, res, next) {
  res.render('website/category');
});

/* GET product page. */
router.get('/product', function (req, res, next) {
  res.render('website/product');
});

/* GET order page. */
router.get('/order', function (req, res, next) {
  var page = req.query['o'];
  if (page == "add") {

    var fetchProducts = "SELECT * FROM product WHERE active = ? AND status = ? AND quantity != ?";
    db.query(fetchProducts, [1,1,0], (error, results) => {

      res.render('website/orders', {
        add: true,
        numbers: [1,2,3],
        products: results
      });

    });
  } else if (page == "manord") {
    res.render('website/orders', {
      manord: true
    });
  } else if (page == "editOrd") {

    let orderId  = req.query['i'];

    // call promises here
    Promise.all([fetchOrderDetails(orderId),fetchOderedItemDetails(orderId),fetchAllProducts()])
    .then(data => {
      let orderDetails = data[0];
      let orderItemDetails = data[1];
      let allProductLists = data[2];
      
      console.log(orderDetails);
      
      res.render('website/orders', {
        editOrd: true,
        orderDetails: orderDetails,
        orderItemDetails: orderItemDetails,
        allProductLists: allProductLists
      })
    })
    .catch(error => {
      console.log(error)
      res.render('website/orders', {
        edit: true,
        error: 'Unable to fetch details!'
      })
    })

    

  }
});

/* GET report page. */
router.get('/report', function (req, res, next) {
  res.render('website/report');
});

/* GET setting page. */
router.get('/setting', function (req, res, next) {
  res.render('website/setting');
});

/* GET report page. */
router.get('/logout', function (req, res, next) {
  // do logout stuffs and return to login page
  res.redirect('/')
});

module.exports = router;


//Promise to fetch order details during edit order
function fetchOrderDetails(orderId){
  return new Promise((resolve, reject) => {
    let fetchOrderDetails = "SELECT order_id, order_date, client_name, client_contact, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_type, payment_status FROM orders "+
    "WHERE order_id = ?";

    db.query(fetchOrderDetails, [orderId], (error, results) => {
      if(results){
        resolve(results);
      } else {
        reject(error);
      } 
    });

  });
};

//promise to fetch order item details required during edit order
function fetchOderedItemDetails(orderId){
  return new Promise((resolve, reject) => {
    let fetchOrderItemDetails = "SELECT order_item_id, order_id, product_id, quantity, rate, total FROM order_item " +
    "WHERE order_id = ?";

    db.query(fetchOrderItemDetails, [orderId], (error, itemDetails) => {
      if(itemDetails){
        resolve(itemDetails);
      } else {
        reject(error);
      } 
    });

  });
};

//promise to fetch all products required during edit order
function fetchAllProducts(){
  return new Promise((resolve, reject) => {
    let fetchAllProducts = "SELECT * FROM product WHERE active = ? AND status = ? AND quantity != ?";

    db.query(fetchAllProducts, [1,1,0], (error, allProducts) => {
      if(allProducts){
        resolve(allProducts);
      } else {
        reject(error);
      } 
    });

  });
};