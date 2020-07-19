var db = require('../config/db');
const { raw } = require('mysql');

module.exports = {

    fetchOrders: function(req, res) {

        var totalOrderCount = 0;

        var fetchOrders = "SELECT * FROM orders WHERE order_status = ?";
        db.query(fetchOrders, [1], (error, results) => {
            if(error){
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
    },


    // createOrder: function(req, res){

    //     let createOrder = "INSERT INTO orders (order_date, client_name, client_contact, sub_total, vat, total_amount, discount, grand_total, paid, due, payment_type, payment_status, order_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";

    //     let rawOrderDate = (req.body.orderDate).toString().split('/');
    //     let orderDate = rawOrderDate[2] + '-' + rawOrderDate[0] + '-'+rawOrderDate[1];

    //     let order_id = 0;
    //     let orderStatus = false;
    //     let orderItemStatus = false;
        
    //     // fetches all the productNames inside this order
    //     let productNames = req.body['productName[]'];
    //     let quantities = req.body['quantity[]'];
    //     let rateValues = req.body['rateValue[]'];
    //     let totalValues = req.body['totalValue[]'];

    //     db.query(createOrder, 
    //         [orderDate, req.body.clientName, req.body.clientContact, req.body.subTotalValue, req.body.vatValue, req.body.totalAmountValue, req.body.discount, req.body.grandTotalValue, req.body.paid, req.body.dueValue, req.body.paymentType, req.body.paymentStatus,1],
    //         (error, results) => {
    //             if(error){
    //                 res.end({
    //                     'success': false,
    //                     "messages": "Problem in adding order details!"
    //                 });
    //             } else {
    //                 // stores inserted Order Id and set order status to false
    //                 order_id = results.insertId;
    //                 orderStatus = true;

    //                 // loop to update quantity and insert item to order_item table
    //                 for(let i=0; i<productNames.length; i++){
    //                     let updateProductQuantitySql = "SELECT quantity FROM product WHERE product_id = ?";
    //                     let updateQuantity = [];

    //                     // updates quantity
    //                     db.query(updateProductQuantitySql,[productNames[i]], (error, response) => {
    //                         if(error){
    //                             res.end({
    //                                 'success': false,
    //                                 "messages": "Order is inserted but error on fetching quantity of each product!"
    //                             });
    //                         } else{
    //                             response.forEach((eachProductQuantity) => {
    //                                 // count new quantity
    //                                 updateQuantity[i] = eachProductQuantity.quantity - quantities[i];
                            
    //                                 // updates quantity to database
    //                                 let updateProductTable = "UPDATE product SET quantity = ? WHERE product_id = ?";
    //                                 db.query(updateProductTable, [updateQuantity[i], productNames[i]], (error, results) => {
    //                                     if(error){
                                             
    //                                         res.end({
    //                                             'success': false,
    //                                             "messages": "Order is inserted but error on fetching quantity of each product!"
    //                                         });
                                            
    //                                     } else {
    //                                         // add each order item to order_item table
    //                                         let orderItemSql = "INSERT INTO order_item (order_id, product_id, quantity, rate, total, order_item_status) "+
    //                                         "VALUES(?,?,?,?,?,?)";
                            
    //                                         db.query(orderItemSql,
    //                                             [order_id, productNames[i], quantities[i], rateValues[i], totalValues[i], 1], 
    //                                             (error, response) => {
    //                                             if(error){
    //                                                 res.end({
    //                                                     'success': false,
    //                                                     "messages": "Unable to add order item!"
    //                                                 });
    //                                             } else {
    //                                                 if(i == (productNames.length-1)) {
    //                                                     res.send({
    //                                                         'success': true,
    //                                                         "messages": "Order placed successfully!"
    //                                                     });
    //                                                 }
                                                    
    //                                             }
    //                                         });
    //                                     }
    //                                 });
                            
    //                                 if(i == productNames.length) {
    //                                     orderItemStatus = true;
    //                                 }
    //                             });   
    //                         }
    //                     });
    //                 }
    //             }
    //         });
    // }
    createOrder: function(req,res)
        {
            // console.log(req.body);
            req.body = JSON.parse(JSON.stringify(req.body));
            // console.log(req.body);
            Promise.all([insertOrder(res,req.body.order_data),insertOrderItem(res,req.body.order_item_data),updateItem(res,req.body.product_quantity)]).then((response)=>
            {
                if(response[0] && response[1]  && response[2])
                {
                    res.send({
                        success:true,
                        message:'Order placed successfully'
                    });
                }
            }).catch((err)=>
            {
                console.log(err);
                res.send({
                    success:false,
                    message:err
                });
            })
     
    },
    editOrder:(req,res)=>
    {
 console.log(req.body);
 req.body = JSON.parse(JSON.stringify(req.body));
 const invoice_no = req.body.invoice_no;
 // console.log(req.body);
 Promise.all([editOrder(res,req.body.order_data,invoice_no),editOrderItem(res,req.body.order_item_data,invoice_no),updateItem(res,req.body.product_quantity)]).then((response)=>
 {
     if(response[0] && response[1]  && response[2])
     {
         res.send({
             success:true,
             message:'Order placed successfully'
         });
     }
 }).catch((err)=>
 {
     console.log(err);
     res.send({
         success:false,
         message:err
     });
 })
    },

    fetchProductData: function(req, res){
        var fetchProductData = "SELECT product_id, product_name FROM product WHERE status = ? AND active = ?";
        db.query(fetchProductData,[1,1], (error, results) => {
            if(error) console.log(error);
            res.send(results)
        })
    },
    fetchOrderItem:(req,res)=>
    {
        console.log(req.body);
        let fetchOrderItemDetails = `SELECT * from order_item WHERE invoice_no = ?`;
    db.query(fetchOrderItemDetails, [req.body.invoice_no], (error, itemDetails) => {
      if(itemDetails){
        res.json({success:true,itemDetails:itemDetails});
      } else {
        res.json({success:false,message:error});
      } 
  });
    },
    fetchOrdersByDate: function(req, res) {

        console.log(req.body);
        var totalOrderCount = 0;

        var fetchOrders = "SELECT * FROM orders WHERE order_status = ? and order_date between ? and ?";
        db.query(fetchOrders, [1,req.body.start_date,req.body.end_date], (error, results) => {
            if(error){
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
var insertOrder = (res,order_details) =>
{
    // console.log(order_details);
    return new Promise((resolve,reject)=>
    {
        var insert_order = 'INSERT INTO orders set ?';
        db.query(insert_order,[order_details],(err,result)=>
        {
            if(err)
                {
                    console.log(err);
                    reject('Error in inserting order');
                }
                else
                {
                    resolve(1);
                }
        })
    })
}

var insertOrderItem = (res,order_item_details) =>
{ 
    console.log(order_item_details);
return new Promise((resolve,reject)=>
{
    var insert_order_item = "INSERT INTO order_item(`invoice_no`, `product_id`, `quantity`, `rate`, `total`, `order_item_status`) values ?";
    db.query(insert_order_item,[order_item_details.map(item => [item.invoice_no, item.product_id, item.quantity,item.rate,item.total,item.order_item_status])],(err,result)=>
    {
        if(err)
            {
                console.log(err);
                reject('Error in inserting order item details');
            }
            else
            {
                console.log(result);
                resolve(1);
            }
        })
    })
}


var editOrder = (res,order_details,invoice_no) =>
{
    // console.log(order_details);
    return new Promise((resolve,reject)=>
    {
        var insert_order = 'UPDATE orders set ? where invoice_no = ?';
        db.query(insert_order,[order_details,invoice_no],(err,result)=>
        {
            if(err)
                {
                    console.log(err);
                    reject('Error in inserting order');
                }
                else
                {
                    resolve(1);
                }
        })
    })
}

var editOrderItem = (res,order_item_details,invoice_no) =>
{ 
    console.log(order_item_details);
return new Promise((resolve,reject)=>
{
    var delete_order_item = "DELETE from order_item where invoice_no =?"
    var insert_order_item = "INSERT INTO order_item(`invoice_no`, `product_id`, `quantity`, `rate`, `total`, `order_item_status`) values ?";

    db.query(delete_order_item,[invoice_no],(err1,result1)=>
    {
        if(!err1)
        {
        db.query(insert_order_item, [order_item_details.map(item => [item.invoice_no, item.product_id, item.quantity,item.rate,item.total,item.order_item_status])],(err,result)=>
        {
            if(err)
                {
                    console.log(err);
                    reject('Error in updating order item details');
                }
                else
                {
                    console.log(result);
                    resolve(1);
                }
        })
    }
    else
    {
    
            console.log(err);
            reject('Error in inserting order item details');
    }
    })
  
})
}
     
var updateItem = (res,update_item) =>
{
    console.log(update_item);
return new Promise((resolve,reject)=>
{
    var update_product = "UPDATE product set quantity=quantity - ?  where product_id = ? ";
    update_item.forEach((result)=>
    {
        console.log(result);
        db.query(update_product,[result.quantity,result.product_id],(err,result1)=>
        {
            if(err) 
            { 
                console.log(err);
                reject('Error in updating item details');
            }
            else
            {
                resolve(1);
            }
        })
    })
})
}
