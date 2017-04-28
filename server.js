// CIS 197 - React HW
// Author - Devesh Dayal, Steve Vitali, Abhinav Suri
// Simple Express server to serve static files
var express = require('express');
var path = require('path');
var ejs = require('ejs');
//import { createStore } from 'redux';

var bodyParser = require('body-parser');
//var todoApp = require('./reducers/todos');


var todosDB = require('./db/mongo').Todos;
var User = require('./db/mongo').User;
var createNewUser = require('./db/mongo').createNewUser;

var bcrypt = require('bcrypt');

var passport = require('passport');
const jwt = require('jsonwebtoken');

let app = express();
const port = process.env.PORT || 3001;

app.set('port', port);




app.use(bodyParser.text());


app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport);

app.get('/', (req, res) => {
  res.render('index');
});



app.post('/getTodos', passport.authenticate('jwt', {session: false}), (req, res) => {


  let username = JSON.parse(req.body).user;

  todosDB.find({user: username}, (err, list) => {
    if (err) throw err;
    let todos = list;

    res.send(todos);
  });
  
});

// app.post('/register', (req, res) => {

//   let newUsername = JSON.parse(req.body).username;

//   let newUser = createNewUser(newUsername, (err) => {
//     if (err) throw err;
//     res.send('success');
//   });

// });

app.post('/setTodos', passport.authenticate('jwt', {session: false}), (req, res) => {
  var body = JSON.parse(req.body);


  var newItem = new todosDB({
    text: body.newItem,
    date: body.newDate,
    urgency: body.newUrgency,
    user: body.user,
    completed: body.completed
  });

  newItem.save((err) => {if (err) throw err; res.send('success')} );


});

app.post('/getAccess', (req, res) => {
  var userInfo = JSON.parse(req.body);


  User.findOne({username: userInfo.username}, (err, result) => {
    if (err) throw err;

    if (result) {
      bcrypt.compare(userInfo.password, result.password, (e, r) => {
        if (err) throw e;
        const token = jwt.sign(result, 'supersecret', {
          expiresIn: 604800
        })
        res.json({result: r, token: 'JWT ' + token});
      })
    } else {
      res.json({result: false});
    }
  });

});


app.post('/toggleCompleted', passport.authenticate('jwt', {session: false}), (req, res) => {

  let todo = JSON.parse(req.body);

  todosDB.findOneAndUpdate({text: todo.text, date: todo.date, urgency: todo.urgency, user: todo.user}, {completed: !todo.completed}, (err, result) => {
    if (err) throw err;

    res.send('success');
  });


});


app.post('/newUser', (req, res) => {

  let userInfo = JSON.parse(req.body);

  let newUser = new User({
      username: userInfo.username,
      password: userInfo.password
    });


  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(userInfo.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save((e) => { if (e) throw e});
      res.send('success');
    })
  })
 

});

// Start server


app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${port}`);
});




