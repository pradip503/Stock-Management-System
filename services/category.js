var db = require('../config/db');

module.exports = {

    fetchCategories: function(req, res){
        var fetchCategory = "SELECT categories_id, categories_name, categories_active, categories_status FROM categories WHERE categories_status = ?";
        db.query(fetchCategory, [1], (error, results) => {
            if (error) console.log(error);
            res.send(results);
        });
    },
    insertCategories: function(req, res){
        var insertCategory = "INSERT INTO categories (categories_name, categories_active, categories_status)VALUES (?, ?, ?)";
        db.query(insertCategory, [req.body.categoriesName, req.body.categoriesStatus,1], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in adding category!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Added Successfully!"
                });
            }
        });
    },
    fetchSelectedCategory: function(req, res){
        
        var fetchCategory = "SELECT categories_id, categories_name, categories_active, categories_status FROM categories WHERE categories_id = ?";
        db.query(fetchCategory,[req.body.categoriesId], (error, results) => {
            
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in fetching selected category!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Category Fetched Successfully!",
                    'data': results[0]
                });
            }
        })
    },

    editCategory: function(req, res){

        var editCategory = "UPDATE categories SET categories_name = ?, categories_active = ? WHERE categories_id = ?";
        db.query(editCategory,[req.body.editCategoriesName, req.body.editCategoriesStatus, req.body.editCategoriesId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in editing category!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Category updated successfully!"
                });
            }
        })

    },
    removeCategory: function(req, res){
        var removeCategory = "UPDATE categories SET categories_status = ? WHERE categories_id = ?";
        db.query(removeCategory,[2,req.body.categoriesId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in removing category!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Category removed successfully!"
                });
            }
        });

    }

};