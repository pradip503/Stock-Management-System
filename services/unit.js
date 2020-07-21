var db = require('../config/db');


module.exports = {

    fetchUnits: function (req, res) {

        var fetchUnit = "SELECT unit_id, unit_name, unit_short_name, unit_status FROM units WHERE unit_status = ?";

        db.query(fetchUnit, [1], (error, results) => {
            if (error) console.log(error);
            res.send(results);
        });
    },
    insertUnit: function (req, res) {

        var insertUnit = "INSERT INTO units (unit_name, unit_short_name, unit_status) VALUES (?, ?, ?)";
        db.query(insertUnit,[ req.body.unitName, req.body.unitShortName, 1], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in adding unit!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Added Successfully!"
                });
            }
        });
    },

    fetchSelectedUnit: function(req, res){
        
        var fetchUnit = "SELECT unit_id, unit_name, unit_short_name, unit_status FROM units WHERE unit_id = ?";
        db.query(fetchUnit,[req.body.unitId], (error, results) => {
            
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in fetching selected unit!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Unit Fetched Successfully!",
                    'data': results[0]
                });
            }
        })
    },

    editUnit: function(req, res){


        var editUnit = "UPDATE units SET unit_name = ?, unit_short_name = ? WHERE unit_id = ?";
        db.query(editUnit,[req.body.editUnitName, req.body.editUnitShortName, req.body.unitId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in editing unit!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Unit updated successfully!"
                });
            }
        })

    },

    removeUnit: function(req, res){
        var removeUnit = "UPDATE units SET unit_status = ? WHERE unit_id = ?";
        db.query(removeUnit,[2,req.body.unitId], (error, results) => {
            if(error){

                res.send({
                    'success': false,
                    "messages": "Problem in removing unit!"
                });

            } else {
                res.send({
                    'success': true,
                    "messages": "Unit removed successfully!"
                });
            }
        });

    }

}