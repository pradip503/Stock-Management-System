var db = require('../config/db');


module.exports ={
    generateReport : function(req, res) {
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;

        let getReportData = "SELECT * FROM orders WHERE order_date >= ? AND order_date <= ? and order_status = ?";
        db.query(getReportData, [startDate, endDate, 1], (error, orderData) => {
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in fetching report data!"
                });
            } else {
                res.send({
                    'success': true,
                    "startDate": startDate,
                    "endDate": endDate,
                    "reportData": orderData
                });
            }
        });
    }
}