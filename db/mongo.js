var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todolist', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected. Adding seed data...');
  }
});

var db = mongoose.connection;

// var keySchema = new mongoose.Schema({
//   key: String
// });

// var reviewSchema = new mongoose.Schema({
//   className: String,
//   semester: String,
//   rating: Number,
//   text: String
// });

// var Key = mongoose.model('Key', keySchema);
// var Reviews = mongoose.model('Reviews', reviewSchema);


// var userSchema = new mongoose.Schema({
//   name: String
// });

// var User = mongoose.model('User', userSchema);

// var tyler = new User({
//   name: 'Tyler'
// });

// tyler.save( (err) => {if (err) throw err; console.log("user saved")} );

// User.find({}).remove((err) => {if (err) throw err; console.log('removed')});

// User.find({name: 'Tyler'}, (err, user) => {
//   console.log(user.length);
//   for(let i = 0; i < user.length; i++) {
//     console.log(i + ': ' + user[0].name);
//   }
// });


//ayyyyyy lmao

var TodoItemSchema = new mongoose.Schema({
  text: String,
  date: String,
  urgency: Number
});

var Todos = mongoose.model('Todos', TodoItemSchema);

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  todoList: [TodoItemSchema]
});


// module.exports = {
//   // Key: Key,
//   Reviews: Reviews,
//   mongoose: mongoose,
//   db: db.collection('Reviews')
// };

var starter = new Todos({
  text: 'hello',
  date: '4/20',
  urgency: 0
});



Todos.find({text: 'hello', date: '4/20', urgency: 0}, (err, res) => {
  if (err) throw err;
  if (res.length === 0) {
    starter.save((err) => {if (err) throw err});
  }
});



module.exports = Todos;