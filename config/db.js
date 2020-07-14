var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'stock',
  dateStrings: true
});
 
connection.connect((error) => {
    if(error){
        console.log('Problem in dabatabase connection.');
    } else{
      console.log('Connection established!');
    }
    
});


module.exports = connection;