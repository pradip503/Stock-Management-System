var db = require('../config/db');
const {
    raw
} = require('mysql');

module.exports = {

    fetchOrders: function (req, res) {

        var totalOrderCount = 0;

        var fetchOrders = "SELECT * FROM orders WHERE order_status = ?";
        db.query(fetchOrders, [1], (error, results) => {
            if (error) {

                res.send({
                    'success': false,
                    "messages": "Problem in adding orders details!"
                });

            } else {
                var orders = [...results]; //copies orginal result to new array
                res.send({
                    'success': true,
                    "messages": "Order's details fetched successfully!",
                    "data": orders
                });

            }
        });
    },
    createOrder: function (req, res) {
        // console.log(req.body);
        req.body = JSON.parse(JSON.stringify(req.body));
        // console.log(req.body);
        Promise.all([insertOrder(res, req.body.order_data), insertOrderItem(res, req.body.order_item_data), updateItem(res, req.body.product_quantity)]).then((response) => {
            if (response[0] && response[1] && response[2]) {
                res.send({
                    success: true,
                    message: 'Order placed successfully!'
                });
            }
        }).catch((err) => {
            console.log(err);
            res.send({
                success: false,
                message: err
            });
        })

    },
    editOrder: (req, res) => {
        //  console.log(req.body);
        req.body = JSON.parse(JSON.stringify(req.body));
        const invoice_no = req.body.invoice_no;
        // console.log(req.body);
        Promise.all([editOrder(res, req.body.order_data, invoice_no), editOrderItem(res, req.body.order_item_data, invoice_no), updateItem(res, req.body.product_quantity)]).then((response) => {
            if (response[0] && response[1] && response[2]) {
                res.send({
                    success: true,
                    message: 'Order placed successfully'
                });
            }
        }).catch((err) => {
            console.log(err);
            res.send({
                success: false,
                message: err
            });
        })
    },

    fetchProductData: function (req, res) {
        var fetchProductData = "SELECT product_id, product_name FROM product WHERE status = ? AND active = ?";
        db.query(fetchProductData, [1, 1], (error, results) => {
            if (error) console.log(error);
            res.send(results)
        })
    },
    fetchOrderItem: (req, res) => {
        // console.log(req.body);
        let fetchOrderItemDetails = `SELECT * from order_item WHERE invoice_no = ?`;
        db.query(fetchOrderItemDetails, [req.body.invoice_no], (error, itemDetails) => {
            if (itemDetails) {
                res.json({
                    success: true,
                    itemDetails: itemDetails
                });
            } else {
                res.json({
                    success: false,
                    message: error
                });
            }
        });
    },
    fetchOrdersByDate: function (req, res) {

        // console.log(req.body);
        var totalOrderCount = 0;

        var fetchOrders = "SELECT * FROM orders WHERE order_status = ? and order_date between ? and ?";
        db.query(fetchOrders, [1, req.body.start_date, req.body.end_date], (error, results) => {
            if (error) {
                console.log(error);
                res.send({
                    'success': false,
                    "messages": "Problem in adding orders details!"
                });

            } else {
                var orders = [...results]; //copies orginal result to new array
                res.send({
                    'success': true,
                    "messages": "Order's details fetched successfully!",
                    "data": orders
                });
                // orders.forEach((order,i) => {


                //             if(i+1 === orders.length){
                //                 res.send({
                //                     'success': true,
                //                     "messages": "Order's details fetched successfully!",
                //                     "data": orders
                //                 });
                //             }  
                //         })
                //         .catch(error => {
                //             console.log(error); 
                //             res.send({
                //                 'success': false,
                //                 "messages": "Problem in adding order count!"
                //             });
                //         })

                // });
            }
        });
    }
}


//promise that returns order length for particular order
var countOrder = function (orderId) {
    return new Promise((resolve, reject) => {
        var totalOrders = "SELECT count(*) AS orderCount FROM order_item WHERE order_id = ?";
        db.query(totalOrders, [orderId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                // console.log(results[0].orderCount)
                resolve(results[0].orderCount);
            }
        });
    });
};
var insertOrder = (res, order_details) => {
    // console.log(order_details);
    return new Promise((resolve, reject) => {
        var insert_order = 'INSERT INTO orders set ?';
        db.query(insert_order, [order_details], (err, result) => {
            if (err) {
                console.log(err);
                reject('Error in inserting order');
            } else {
                resolve(1);
            }
        })
    })
}

var insertOrderItem = (res, order_item_details) => {
    // console.log(order_item_details);
    return new Promise((resolve, reject) => {
        var insert_order_item = "INSERT INTO order_item(`invoice_no`, `product_id`, `quantity`, `rate`, `total`, `order_item_status`) values ?";
        db.query(insert_order_item, [order_item_details.map(item => [item.invoice_no, item.product_id, item.quantity, item.rate, item.total, item.order_item_status])], (err, result) => {
            if (err) {
                console.log(err);
                reject('Error in inserting order item details');
            } else {
                // console.log(result);
                resolve(1);
            }
        })
    })
}


var editOrder = (res, order_details, invoice_no) => {
    // console.log(order_details);
    return new Promise((resolve, reject) => {
        var insert_order = 'UPDATE orders set ? where invoice_no = ?';
        db.query(insert_order, [order_details, invoice_no], (err, result) => {
            if (err) {
                console.log(err);
                reject('Error in inserting order');
            } else {
                resolve(1);
            }
        })
    })
}

var editOrderItem = (res, order_item_details, invoice_no) => {
    // console.log(order_item_details);
    return new Promise((resolve, reject) => {
        var delete_order_item = "DELETE from order_item where invoice_no =?"
        var insert_order_item = "INSERT INTO order_item(`invoice_no`, `product_id`, `quantity`, `rate`, `total`, `order_item_status`) values ?";

        db.query(delete_order_item, [invoice_no], (err1, result1) => {
            if (!err1) {
                db.query(insert_order_item, [order_item_details.map(item => [item.invoice_no, item.product_id, item.quantity, item.rate, item.total, item.order_item_status])], (err, result) => {
                    if (err) {
                        console.log(err);
                        reject('Error in updating order item details');
                    } else {
                        // console.log(result);
                        resolve(1);
                    }
                })
            } else {

                console.log(err);
                reject('Error in inserting order item details');
            }
        })

    })
}

var updateItem = (res, update_item) => {
    // console.log(update_item);
    return new Promise((resolve, reject) => {
        var update_product = "UPDATE product set quantity=quantity - ?  where product_id = ? ";
        update_item.forEach((result) => {
            // console.log(result);
            db.query(update_product, [result.quantity, result.product_id], (err, result1) => {
                if (err) {
                    console.log(err);
                    reject('Error in updating item details');
                } else {
                    resolve(1);
                }
            })
        })
    })
}