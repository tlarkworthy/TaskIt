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

let app = express();
const port = process.env.PORT || 3001;

app.set('port', port);

// Use the EJS rendering engine for HTML located in /views

// app.set('views', __dirname + '/views');
// app.engine('html', ejs.__express);
// app.set('view engine', 'html');

// Host static files on URL path

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({extended: false}));

// Use express Router middleware for root path
//app.use(app.router);

//var todos = [{text: 'hello', date: '4/30', urgency: 10}]; 

//var store = createStore(todoApp);

//console.log('hello');

app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.render('index', {todosList: ['hi']});
});

// app.post('/', (req, res) => {
//   store.dispatch({type: 'ADD_TODO', text: req.body.newItem});
//   todos.push(req.body.newItem);
//   res.render('index', {todosList: todos});
// });

app.post('/getTodos', (req, res) => {


  let username = JSON.parse(req.body).user;

  todosDB.find({user: username}, (err, list) => {
    if (err) throw err;
    let todos = list;

    res.send(todos);
  });
  
});

app.post('/register', (req, res) => {

  let newUsername = JSON.parse(req.body).username;

  let newUser = createNewUser(newUsername, (err) => {
    if (err) throw err;
    res.send('success');
  });

});

app.post('/setTodos', (req, res) => {
  console.log(req.body);
  var body = JSON.parse(req.body);
  //console.log(body.newItem);
  //console.log(req);
  //todos.push({text: body.newItem, date: body.newDate, urgency: body.newUrgency, user: body.user});
  //console.log(req.body.newItem);
  //console.log('success');

  var newItem = new todosDB({
    text: body.newItem,
    date: body.newDate,
    urgency: body.newUrgency,
    user: body.user
  });

  newItem.save((err) => {if (err) throw err});

});

app.post('/getAccess', (req, res) => {
  let body = JSON.parse(req.body);

  console.log(body);

  User.find({username: body.username}, (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      console.log('true');
      res.json({result: true});
    } else {
      res.json({result: false});
    }
  });

});


// Start server


app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${port}`);
});




