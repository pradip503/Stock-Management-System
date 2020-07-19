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
router.get('/orderedit',(req,res,next)=>
{
    const invoice_no = req.query['id'];
    console.log(invoice_no);
    Promise.all([fetchOrderDetails(invoice_no),fetchOrderedItemDetails(invoice_no),fetchAllProducts()])
    .then(data => {
      let orderDetails = data[0];
      let orderItemDetails = data[1];
      let allProductLists = data[2];
      
      console.log(allProductLists);
      
      res.render('website/orderedit', {
        orderDetails: orderDetails,
        orderItemDetails: orderItemDetails,
        allProductLists: allProductLists,
        invoice_no:invoice_no
      })
    })
    .catch(error => {
      console.log(error)
      res.render('website/orders', {
        edit: true,
        error: 'Unable to fetch details!'
      })
    })

    

  })

router.get('/ordermanage',(req,res,next)=>
{
    res.render('website/ordermanage');
  
})
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
    Promise.all([fetchOrderDetails(orderId),fetchOrderedItemDetails(orderId),fetchAllProducts()])
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
function fetchOrderDetails(invoice_no){
  return new Promise((resolve, reject) => {
    let fetchOrderDetails = `SELECT * from orders WHERE invoice_no = ?`;

    db.query(fetchOrderDetails, [invoice_no], (error, results) => {
      if(results){
        resolve(results);
      } else {
        reject(error);
      } 
    });

  });
};

function fetchOrderDetails1(orderId){
  return new Promise((resolve, reject) => {
    let fetchOrderDetails = `SELECT *  FROM orders `;

    db.query(fetchOrderDetails, (error, results) => {
      if(results){
        resolve(results);
      } else {
        reject(error);
      } 
    });

  });
};

//promise to fetch order item details required during edit order
function fetchOrderedItemDetails(invoiceno){
  return new Promise((resolve, reject) => {
    let fetchOrderItemDetails = `SELECT order_item.quantity as order_quantity,product.product_name,product.product_id,product.rate,total from order_item inner join product on order_item.product_id = product.product_id WHERE invoice_no = ?`;

    db.query(fetchOrderItemDetails, [invoiceno], (error, itemDetails) => {
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