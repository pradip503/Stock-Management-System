const bcrypt = require('bcrypt');
var db = require('../config/db');
const LocalStrategy = require('passport-local').Strategy

function initialize(passport) {

    const authenticateUser = async (username, password, done) => {
        
        let user = await getUserByUsername(username).then(user => user).catch();

        if (user == null) {
            return done(null, false, {
                message: 'No user with that username!'
            })
        }
        

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {
                    message: 'Password did not matched'
                })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((user, done) => done(null, user.user_id))
    passport.deserializeUser(async (user_id, done) => {
        return done(null, await getUserById(user_id));
    })


}


//for serializing the user
function getUserByUsername(username) {

    return new Promise((resolve, reject) => {
        let getUser = "Select * from users where username = ?";
        db.query(getUser, [username], async (error, results) => {
            if(error){
                reject(error);
            } else {
                resolve(results[0]);
            }
        })
    })

}

//for deserializing the user
function getUserById(id){
    return new Promise((resolve, reject) => {
        let getUserById = "Select * from users where user_id = ?";
        db.query(getUserById, [id], async (error, results) => {
            if(error){
                reject(error);
            } else {
                resolve(results[0]);
            }
        })
    })
}


module.exports = initialize