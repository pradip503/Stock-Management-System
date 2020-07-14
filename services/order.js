var db = require('../config/db');
const { raw } = require('mysql');

module.exports = {

    fetchOrders: function(req, res) {

        var totalOrderCount = 0;

        var fetchOrders = "SELECT order_id, order_date, client_name, client_contact, payment_status FROM orders WHERE order_status = ?";
        db.query(fetchOrders, [1], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in adding orders details!"
                });

            } else {
                var orders = [...results]; //copies orginal result to new array
                orders.forEach((order,i) => {
                    countOrder(order.order_id)
                        .then(rowCount => {
                            order['totalOrder'] = rowCount;

                            if(i+1 === orders.length){
                                res.send({
                                    'success': true,
                                    "messages": "Order's details fetched successfully!",
                                    "data": orders
                                });
                            }  
                        })
                        .catch(error => {
                            res.send({
                                'success': false,
                                "messages": "Problem in adding order count!"
                            });
                        })
                    
                });
            }
        });
    },

    createOrder: function(req, res){

        let createOrder = "INSERT INTO orders (order_date, client_name, client_contact, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_type, payment_status, order_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

        let rawOrderDate = (req.body.orderDate).toString().split('/');
        let orderDate = rawOrderDate[2] + '-' + rawOrderDate[0] + '-'+rawOrderDate[1];

        let order_id = 0;
        let orderStatus = false;
        let orderItemStatus = false;
        
        // fetches all the productNames inside this order
        let productNames = req.body['productName[]'];
        let quantities = req.body['quantity[]'];
        let rateValues = req.body['rateValue[]'];
        let totalValues = req.body['totalValue[]'];

        db.query(createOrder, 
            [orderDate, req.body.clientName, req.body.clientContact, req.body.subTotalValue, req.body.vatValue, req.body.totalAmountValue, req.body.discount, req.body.grandTotalValue, req.body.paid, req.body.dueValue, req.body.paymentType, req.body.paymentStatus,1],
            (error, results) => {
                if(error){
                    res.end({
                        'success': false,
                        "messages": "Problem in adding order details!"
                    });
                } else {
                    // stores inserted Order Id and set order status to false
                    order_id = results.insertId;
                    orderStatus = true;

                    // loop to update quantity and insert item to order_item table
                    for(let i=0; i<productNames.length; i++){
                        let updateProductQuantitySql = "SELECT quantity FROM product WHERE product_id = ?";
                        let updateQuantity = [];

                        // updates quantity
                        db.query(updateProductQuantitySql,[productNames[i]], (error, response) => {
                            if(error){
                                res.end({
                                    'success': false,
                                    "messages": "Order is inserted but error on fetching quantity of each product!"
                                });
                            } else{
                                response.forEach((eachProductQuantity) => {
                                    // count new quantity
                                    updateQuantity[i] = eachProductQuantity.quantity - quantities[i];
                            
                                    // updates quantity to database
                                    let updateProductTable = "UPDATE product SET quantity = ? WHERE product_id = ?";
                                    db.query(updateProductTable, [updateQuantity[i], productNames[i]], (error, results) => {
                                        if(error){
                                             
                                            res.end({
                                                'success': false,
                                                "messages": "Order is inserted but error on fetching quantity of each product!"
                                            });
                                            
                                        } else {
                                            // add each order item to order_item table
                                            let orderItemSql = "INSERT INTO order_item (order_id, product_id, quantity, rate, total, order_item_status) "+
                                            "VALUES(?,?,?,?,?,?)";
                            
                                            db.query(orderItemSql,
                                                [order_id, productNames[i], quantities[i], rateValues[i], totalValues[i], 1], 
                                                (error, response) => {
                                                if(error){
                                                    res.end({
                                                        'success': false,
                                                        "messages": "Unable to add order item!"
                                                    });
                                                } else {
                                                    if(i == (productNames.length-1)) {
                                                        res.send({
                                                            'success': true,
                                                            "messages": "Order placed successfully!"
                                                        });
                                                    }
                                                    
                                                }
                                            });
                                        }
                                    });
                            
                                    if(i == productNames.length) {
                                        orderItemStatus = true;
                                    }
                                });   
                            }
                        });
                    }
                }
            });
    },

    fetchProductData: function(req, res){
        var fetchProductData = "SELECT product_id, product_name FROM product WHERE status = ? AND active = ?";
        db.query(fetchProductData,[1,1], (error, results) => {
            if(error) console.log(error);
            res.send(results)
        })
    }
}


//promise that returns order length for particular order
var countOrder = function(orderId){
    return new Promise((resolve, reject) => {
        var totalOrders = "SELECT count(*) AS orderCount FROM order_item WHERE order_id = ?";
        db.query(totalOrders, [orderId], (error, results) => {
            if(error){
                reject(error);
            } else {
                // console.log(results[0].orderCount)
                resolve(results[0].orderCount);
            }
        });
    });
};