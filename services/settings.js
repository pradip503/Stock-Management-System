var db = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {
    changeUsername: function (req, res) {
        //change username logic
        let user_id = req.body.user_id;
        let newUsername = req.body.username;

        let changeUsernameQuery = "UPDATE users SET username = ? WHERE user_id = ?";
        db.query(changeUsernameQuery, [newUsername, user_id], (error, results) => {
            if (error) {
                res.send({
                    'success': false,
                    "messages": "Problem in changing username!"
                });
            } else {
                let affectedRows = results ? results.affectedRows : 0
                if (affectedRows == 1) {
                    res.send({
                        'success': true,
                        "messages": "Username changed successfully!"
                    });

                } else {
                    res.send({
                        'success': false,
                        "messages": "Problem in changing username!"
                    });
                }

            }
        });
    },

    changePassword: function (req, res) {
        //change password stuffs
        let currentPassword = req.body.password;
        let newPassword = req.body.npassword;
        let confirmPassword = req.body.cpassword;
        let userId = req.body.user_id;


        //check if newPassword and Confim password are matched

        if (newPassword === confirmPassword) {
            let getCurrentUser = "SELECT * FROM users WHERE user_id = ?";
            db.query(getCurrentUser, [userId], async (error, results) => {
                if (error) {
                    //unable to fetch the user details
                    res.send({
                        'success': false,
                        "messages": "Unable to change the password!"
                    });
                }

                if (results) {
                    let existingPassword = results[0].password;
                    let isMatched = await bcrypt.compare(currentPassword, existingPassword);
                    if(isMatched){
                        //hash the password
                        const hashedPassword = await bcrypt.hash(newPassword,10);

                        let updatePassword = "UPDATE users SET password = ? WHERE user_id = ?";
                        db.query(updatePassword, [hashedPassword, userId], (error, results) => {
                            if(error){
                                //Problem in updating the password
                                res.send({
                                    'success': false,
                                    "messages": "Problem in updating the password!"
                                });
                            } else {
                                //password updated succesfully
                                
                                res.send({
                                    'success': true,
                                    "messages": "Password updated successfully!"
                                });
                            }
                        })
                        

                    } else {
                        //make sure your current password is correct
                        res.send({
                            'success': false,
                            "messages": "Please make sure your current password is correct!"
                        });
                    }
                    
                }
            });

        } else {
            //new password and confirm password donot matched
            res.send({
                'success': false,
                "messages": "New password and Confirm password donot match!"
            });
        }


    }
}