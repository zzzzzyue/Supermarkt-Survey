const express = require('express');
//path of the static views
const path = require('path');
const app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
const fs = require('fs');
var http = require("https");
//connect db
const db = require('./db/options')

//use body parser to deal with the post request
app.use(bodyParser.urlencoded({ extended: false}));
//var urlencodedParser = bodyParser.urlencoded({extended: true});
//set static version of views
app.use(express.static(path.join(__dirname, 'public')));
//set the engine as html
app.set('views', path.join(__dirname, '/public'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,TOKEN");
  //res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//require the router to the page
const home = require('./route/home');
const admin = require('./route/admin');
const login = require('./route/login');
app.use('/', home);
app.use('/admin', admin);
app.use('/login', login);

//start the server
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at localhost:3000', host, port);
});

//---------------------login and logout functions, -----------------
//missed register function

/* app.post('/register', function(req, res){
  db.insertData("user_list")
}); */

//login
app.post('/login', function (req, res) {
  db.selectAll("select * from user_list WHERE username = '" + req.body.username + "' AND password ='" + req.body.password + "' AND state = '1'", (e, r) => {
    let tt = r.length;
    console.log(r)
    if (e) {
      res.send({ code: 400, msg: 'Login failed' });
    };
    if (r.length == 0) {
      res.send({ code: 400, msg: 'Login failed' });
    } else {
      res.send({ code: 200, msg: 'Login successful', data: r[0] });
    };
  })
});

//------------------------getting list and position

app.post('/insertClassList', function (req, res) {
  req.body.time = new Date().getTime();
  db.insertData("classList", req.body, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Adding class failed' });
    };
    if (!r) {
      res.send({ code: 400, msg: 'Adding class failed' });
    } else {
      res.send({ code: 200, msg: 'Adding class successful' });
    };
  })
});

// getting classification
app.get('/classList', function (req, res) {
  let startNums = req.query.page == 1 || !req.query.page ? 1 : req.query.page;
  db.selectAll("select * from classList ORDER BY id ASC limit " + (startNums - 1) * 10 + ',' + 10, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Getting failed' });
      return false;
    };
    if (!r) {
      res.send({ code: 400, msg: 'Getting failed'});
      return false;
    } else {
      countShop('select count(*) from classList', function (re) {
        if (re.code != 200) {
          res.send(re);
          return false;
        };
        res.send({ code: 0, msg: 'Getting successful', data: r, count: re.data });
      })
    };
  })
});
// get all class list
app.get('/classListAll', function (req, res) {
  db.selectAll("select * from classList ORDER BY id ASC", (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Getting failed' });
      return false;
    };
    if (!r) {
      res.send({ code: 400, msg: 'Getting failed' });
      return false;
    } else {
      countShop('select count(*) from classList', function (re) {
        if (re.code != 200) {
          res.send(re);
          return false;
        };
        res.send({ code: 0, msg: 'Getting successful', data: r, count: re.data });
      })
    };
  })
});
// updataClassList
app.post('/updataClassList', function (req, res) {
  var time = new Date().getTime();
  db.updateData('classList', { 'className': req.body.className, 'time': time }, { 'id': req.body.id }, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Updating failed' });
    };
    if (!r) {
      res.send({ code: 500, msg: 'Updating failed' });
    } else {
      res.send({ code: 200, msg: 'Updating successful' });
    };
  })
});
// delete classs list
app.post('/delClassList', function (req, res) {
  db.deleteData('classList', { 'id': req.body.id }, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Deleting failed' });
    };
    if (!r) {
      res.send({ code: 500, msg: 'Deleting failed' });
    } else {
      res.send({ code: 200, msg: 'Deleting successful' });
    };
  })
})
function countShop(sql, callback) {
  db.selectAll(sql, (e, r) => {
    let tt = r.length;
    if (e) {
      callback({ code: 400, msg: 'Getting failed', length: 0 });
    };
    if (!r) {
      callback({ code: 400, msg: 'Getting failed', length: 0 });
    } else {
      callback({ code: 200, msg: 'Getting successful', data: r[0]['count(*)'] });
    };
  })
}
// get positionList
app.get('/GetPosition', function (req, res) {
  countShop('select count(*) from positionList', function (re) {
    if (re.code != 200) {
      res.send(re);
      return false;
    };
    db.selectAll("select * from positionList WHERE id = " + re.data, (e, r) => {
      if (e) {
        res.send({ code: 400, msg: 'Getting failed' });
        return false;
      };
      if (!r) {
        res.send({ code: 400, msg: 'Getting failed' });
        return false;
      } else {
        res.send({ code: 0, msg: 'Getting successful', data: r[0].data });
      };
    })
  })

});
// update positionList
app.get('/updataPosition', function (req, res) {
  var time = new Date().getTime()
  db.updateData('positionList', { 'data': req.body.data, 'time': time }, { 'id': req.body.id }, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Updating failed' });
    };
    if (!r) {
      res.send({ code: 500, msg: 'Updating failed' });
    } else {
      res.send({ code: 200, msg: 'Updating successful' });
    };
  })
});
// insert position
app.post('/insertPosition', function (req, res) {
  req.body.time = new Date().getTime();
  db.insertData("positionList", req.body, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Saving areas failed' });
    };
    if (!r) {
      res.send({ code: 400, msg: 'Saving areas failed' });
    } else {
      res.send({ code: 200, msg: 'Saving areas successful' });
    };
  })
})




//get user time
app.get('/GetUserTime', function (req, res) {
  let startNums = req.query.page == 1 || !req.query.page ? 1 : req.query.page;
  db.selectAll("select * from userTime ORDER BY id ASC limit " + (startNums - 1) * 10 + ',' + 10, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'time failed' });
      return false;
    };
    if (!r) {
      res.send({ code: 400, msg: 'time failed' });
      return false;
    } else {
      countShop('select count(*) from userTime', function (re) {
        if (re.code != 200) {
          res.send(re);
          return false;
        };
        res.send({ code: 0, msg: 'Getting time successful', data: r, count: re.data });
      })
    };
  })

});


// insert user visite time
app.post('/insertUserTime', function (req, res) {
  req.body.time = new Date().getTime();
  db.insertData("userTime", req.body, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Saving failed' });
    };
    if (!r) {
      res.send({ code: 400, msg: 'Saving failed' });
    } else {
      res.send({ code: 200, msg: 'Saving successful' });
    };
  })
})
// delete user time
app.post('/delUserTime', function (req, res) {
  db.deleteData('userTime', { 'id': req.body.id }, (e, r) => {
    if (e) {
      res.send({ code: 400, msg: 'Deleting failed' });
    };
    if (!r) {
      res.send({ code: 500, msg: 'Deleting failed' });
    } else {
      res.send({ code: 200, msg: 'Deleting successful' });
    };
  })
})