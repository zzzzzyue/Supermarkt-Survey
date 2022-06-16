const mysql = require('mysql')

const connectdb=()=>{
  var connection = mysql.createConnection({     
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'b0f141363adce6',
    password : '6f70e87d',
    port: '3306',
    database: 'heroku_5b2ef13f2207f01'
})
  return connection;
}

module.exports=connectdb;
