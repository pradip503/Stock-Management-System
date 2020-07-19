var db = require('../config/db');
const { fetchSelectedBrand } = require('./brand');

module.exports = {

    fetchProducts: function(req, res) {

        var fetchProduct = "SELECT product.product_id, product.product_name,product.product_unit, product.brand_id,"+
        "product.categories_id, product.quantity, product.rate, product.active, product.status," +
        "brands.brand_name, categories.categories_name FROM product "+
        "INNER JOIN brands ON product.brand_id = brands.brand_id "+
        "INNER JOIN categories ON product.categories_id = categories.categories_id "+  
        "WHERE product.status = 1";

        db.query(fetchProduct,[], (error, results) => {
            if(error) console.log(error);
            res.send(results);
        });
    },

    insertProduct: function(req, res){

        var insertProduct = "INSERT INTO product (product_name,product_unit, brand_id, categories_id, quantity, rate, active, status) " +
        "VALUES (?,?, ?, ?, ?, ?, ?, 1)";

        db.query(insertProduct,[req.body.productName,req.body.unitName, req.body.brandName, req.body.categoryName, req.body.quantity, req.body.rate, req.body.productStatus, 1], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in adding product!"
                });

            } else {
               
                res.send({
                    'success': true,
                    "messages": "Product added successfully!"
                });
            }
        });
    },

    fetchSelectedProduct: function(req, res) {

        var fetchSelectedProduct = "SELECT product_id, product_name,product_unit, brand_id, categories_id, quantity, rate, active, status FROM product WHERE product_id = ?";
        db.query(fetchSelectedProduct, [req.body.productId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem fetching selected product!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Selected product fetched successfully!",
                    data: results[0]
                });
            }
        });
    },

    editProduct: function(req, res) {

        var editProduct  = "UPDATE product SET product_name = ?, product_unit = ?, brand_id = ?, categories_id = ?, quantity = ?, rate = ?, active = ?, status = ? WHERE product_id = ? ";
        db.query(editProduct, [req.body.editProductName,req.body.editUnitName, req.body.editBrandName, req.body.editCategoryName, req.body.editQuantity, req.body.editRate, req.body.editProductStatus, 1, req.body.productId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in adding product!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Product added Successfully!"
                });
            }
        });
    },

    removeProduct: function(req, res){
        var removeProduct = "UPDATE product SET active = ?, status = ? WHERE product_id = ?";
        db.query(removeProduct,[2,2,req.body.productId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in removing product!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Product removed successfully!"
                });
            }
        });

    }

}