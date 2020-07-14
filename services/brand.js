var db = require('../config/db');


module.exports = {

    fetchBrands: function (req, res) {

        var fetchBrand = "SELECT brand_id, brand_name, brand_active, brand_status FROM brands WHERE brand_status = ?";

        db.query(fetchBrand, [1], (error, results) => {
            if (error) console.log(error);
            res.send(results);
        });
    },
    insertBrand: function (req, res) {

        var insertBrand = "INSERT INTO brands (brand_name, brand_active, brand_status) VALUES (?, ?, ?)";
        db.query(insertBrand,[ req.body.brandName, req.body.brandStatus, 1], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in adding brand!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Added Successfully!"
                });
            }
        });
    },

    fetchSelectedBrand: function(req, res){
        
        var fetchBrand = "SELECT brand_id, brand_name, brand_active, brand_status FROM brands WHERE brand_id = ?";
        db.query(fetchBrand,[req.body.brandId], (error, results) => {
            
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in fetching selected brand!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Brand Fetched Successfully!",
                    'data': results[0]
                });
            }
        })
    },

    editBrand: function(req, res){

        var editBrand = "UPDATE brands SET brand_name = ?, brand_active = ? WHERE brand_id = ?";
        db.query(editBrand,[req.body.editBrandName, req.body.editBrandStatus, req.body.brandId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in editing brand!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Brand updated successfully!"
                });
            }
        })

    },

    removeBrand: function(req, res){
        var removeBrand = "UPDATE brands SET brand_status = ? WHERE brand_id = ?";
        db.query(removeBrand,[2,req.body.brandId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in removing brand!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Brand removed successfully!"
                });
            }
        });

    }

}