// CIS 197 - React HW
// Author - Devesh Dayal, Steve Vitali, Abhinav Suri
// Simple Express server to serve static files
var express = require('express');
var path = require('path');
var ejs = require('ejs');
//import { createStore } from 'redux';

var bodyParser = require('body-parser');
//var todoApp = require('./reducers/todos');


var todosDB = require('./db/mongo');

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
var todos;

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

app.get('/getTodos', (req, res) => {
  res.send(todos);
});

app.post('/setTodos', (req, res) => {
  var body = JSON.parse(req.body);
  //console.log(body.newItem);
  //console.log(req);
  todos.push({text: body.newItem, date: body.newDate, urgency: body.newUrgency});
  //console.log(req.body.newItem);
  //console.log('success');

  var newItem = new todosDB({
    text: body.newItem,
    date: body.newDate,
    urgency: body.newUrgency
  });

  newItem.save((err) => {if (err) throw err});

});

app.post('/getAccess', (req, res) => {
  let body = JSON.parse(req.body);

  console.log(body);
  if (body.username === 'test') {
    console.log('success');
    res.send('true');
  }

});


// Start server
todosDB.find({}, (err, list) => {
  if (err) throw err;
  todos = list;

  app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${port}`);
  });
});





