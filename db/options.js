const conn = require('./db');
const connection = conn();

//search all the sql data
let selectAll = (sql, callback) => {
  console.log(sql);
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.log('Error-', err.sqlMessage);
      let errNews = err.sqlMessage;
      callback(errNews, '');
      return;
    }
    var string = JSON.stringify(result);
    var data = JSON.parse(string);
    callback('', data);
    console.log(string);
  })
}

//insert data
let insertData = (table, datas, callback) => {
  var fields = '';
  var values = '';
  for (var k in datas) {
    fields += k + ',';
    values = values + "'" + datas[k] + "',"
  }
  fields = fields.slice(0, -1);
  values = values.slice(0, -1);
  console.log(fields, values);
  var sql = "INSERT INTO " + table + '(' + fields + ') VALUES(' + values + ')';
  console.log(sql);
  connection.query(sql, callback);
}

// update data
let updateData = function (table, sets, where, callback) {
  console.log(where);
  var _SETS = '';
  var _WHERE = '';
  var keys = '';
  var values = '';
  var i = 0 
  for (var k in sets) {
    i ++ ;
    console.log(i,Object.getOwnPropertyNames(sets).length);
    if (k != 'cookie' ||  k != 'id' || k != 'openid') {
      if (i == Object.getOwnPropertyNames(sets).length) {
        _SETS += k + "='" + sets[k] + "' ";
      } else {
        _SETS += k + "='" + sets[k] + "', ";
      }
    }
  }
  _SETS = _SETS.slice(0, -1);
  for (var k2 in where) {
    //  _WHERE+=k2+"='"+where[k2]+"' AND ";
    _WHERE += k2 + "='" + where[k2] + "'";
  }
  console.log(_WHERE);

  // UPDATE user SET Password='321' WHERE UserId=12
  //update table set username='admin2',age='55'   where id="5";
  var sql = "UPDATE " + table + ' SET ' + _SETS + ' WHERE ' + _WHERE;
  console.log(sql);
  connection.query(sql, callback);
}

// delete data
let deleteData = function (table, where, callback) {
  var _WHERE = '';
  for (var k2 in where) {
    //(if there are more param)  _WHERE+=k2+"='"+where[k2]+"' AND ";
    _WHERE += k2 + "=" + where[k2];
  }
  // DELETE  FROM user WHERE UserId=12 
  //(the data type of user id should be same as the database)
  var sql = "DELETE  FROM " + table + ' WHERE ' + _WHERE;
  console.log(sql);
  connection.query(sql, callback);
}


exports.selectAll = selectAll;
exports.insertData = insertData;
exports.deleteData = deleteData;
exports.updateData = updateData;
