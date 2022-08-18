const mysql = require("mysql");

var sqlConfig = {
  host: '47.254.173.27',
  user: 'supermarkt',
  password: 'HeF2sBa2ynBN5LGb',
  port: 3306,
  database: 'supermarkt'
}

var pingInterval;
var connection = null;

function handleError(err) {
  logger.info(err.stack || err);
  connect();
}

var connectdb = function () {
  if (connection !== null) {
    connection.destroy();
    connection = null;
  }
  connection = mysql.createConnection(sqlConfig)
  connection.connect(function (err) {
    if (err) {
      logger.info("error when connecting to db,reConnecting after 2 seconds:", err);
      setTimeout(connection, 2000);
    }
  });
  connection.on("error", handleError);

  clearInterval(pingInterval);
  pingInterval = setInterval(() => {
    console.log('ping...');
    connection.ping((err) => {
      if (err) {
        console.log('ping error: ' + JSON.stringify(err));
      }
    });
  }, 60000);
  return function () {
    return connection
  }
}

module.exports = connectdb()
