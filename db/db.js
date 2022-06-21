const mysql = require("mysql");

const connectdb=()=>{
  var connection = mysql.createConnection({     
    host     : '47.254.173.27',
    user     : 'supermarkt',
    password : 'HeF2sBa2ynBN5LGb',
    port: 3306,
    database: 'supermarkt'
})
  return connection;
}

module.exports=connectdb;
