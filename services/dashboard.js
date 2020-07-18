var db = require('../config/db');


module.exports = {

    countTotalOrders: function (req, res) {
        let getTotalOrders = "SELECT COUNT(order_id) as totalOrders from orders where order_status = ?";
        db.query(getTotalOrders, [1], (error, orderCount) => {
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in fetching orders count!"
                });

            } else {
                res.send({
                    'success': true,
                    "orderCount": orderCount[0]
                });
            }
        });
    },

    countTotalProducts: function (req, res) {
        let getTotalProducts = "SELECT COUNT(product_id) as totalProducts from product where status = ?";
        db.query(getTotalProducts, [1], (error, productCount) => {
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in fetching products count!"
                });

            } else {
                res.send({
                    'success': true,
                    "productCount": productCount[0]
                });
            }
        });
    },

    countLowStock: function (req, res) {
        let getLowProduct = "SELECT COUNT(product_id) as lowStocks from product where quantity < ? AND status = ?";
        db.query(getLowProduct, [10, 1], (error, lowProductCount) => {
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in fetching low stock count!"
                });

            } else {
                res.send({
                    'success': true,
                    "lowStockCount": lowProductCount[0] ? lowProductCount[0].lowStocks : 0
                });
            }
        });
    },

    // get total units sold on today's date
    getTotalUnitsSold: function (req, res) {
        let todayLongDate = new Date();
        let finalDate = todayLongDate.toISOString().substr(0, 10);

        let getTotalUnitsSold = "SELECT SUM(total_quantity) as totalUnitsSold FROM orders WHERE order_date = ?";
        db.query(getTotalUnitsSold, [finalDate], (error, results) => {
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in fetching total units sold!"
                });
            } else {
                res.send({
                    'success': true,
                    "totalUnitsSold": results[0].totalUnitsSold ? results[0].totalUnitsSold : 0
                });
            }
        });
    },


    // get today's today revenue
    getTotalRevenue: function (req, res) {
        let todayLongDate = new Date();
        let finalDate = todayLongDate.toISOString().substr(0, 10);

        let getTotalRevenue = "SELECT SUM(grand_total) as totalRevenue FROM orders WHERE order_date = ?";
        db.query(getTotalRevenue, [finalDate], (error, results) => {
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in fetching total revenue!"
                });
            } else {
                res.send({
                    'success': true,
                    "totalRevenue": results[0].totalRevenue ? results[0].totalRevenue.toFixed(2) : 0
                });
            }
        });
    },

    getTotalPaid: function (req, res) {
        let todayLongDate = new Date();
        let finalDate = todayLongDate.toISOString().substr(0,10);

        let getTotalPaidAmount = "SELECT SUM(paid) as totalReceivedAmount FROM orders WHERE order_date = ?";
        db.query(getTotalPaidAmount, [finalDate], (error, results) => {
            
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in fetching total amount received!"
                });
            } else {
                res.send({
                    'success': true,
                    "totalReceivedAmount": results[0].totalReceivedAmount ? results[0].totalReceivedAmount.toFixed(2) : 0
                });
            }
        });
    }

}