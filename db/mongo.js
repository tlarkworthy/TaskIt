var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todolist', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected.');
  }
});

var db = mongoose.connection;

var TodoItemSchema = new mongoose.Schema({
  text: String,
  date: String,
  urgency: Number,
  user: String
});

var Todos = mongoose.model('Todos', TodoItemSchema);


var starter = new Todos({
  text: 'hello',
  date: '4/20',
  urgency: 0,
  user: 'test'
});

var userSchema = new mongoose.Schema({
  username: String,
});

var User = mongoose.model('User', userSchema);

// var test = new User({
//   username: 'test'
// });

//test.save((err) => {if (err) throw err});

Todos.find({text: 'hello', date: '4/20', urgency: 0}, (err, res) => {
  if (err) throw err;
  if (res.length === 0) {
    starter.save((err) => {if (err) throw err});
  }
});


function createNewUser (name, cb) {
  let newUser = new User({
    username:name
  });

  newUser.save((err) => { cb(err) });
}


module.exports = {Todos, User, createNewUser};