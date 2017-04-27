import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { createStore } from 'redux'

class Home extends Component {

  constructor() {
    super();
    this.state = {todos: []};
    var self = this;
    fetch('/getTodos', {method: 'GET'}).then( (res) => {res.json().then( (r) => {self.setState({todos: r}); console.log(r); console.log(self.state.todos)} )} );

    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {
    

  }

  addTodo(newData) {

    var data = JSON.stringify({newItem: newData.textValue, newDate: newData.dateValue, newUrgency: newData.urgencyValue});

    fetch('/setTodos', {method: 'POST', body: data, header: {'Accept': 'application/json', 'Content-Type': 'application/json' }});

    this.setState({todos: this.state.todos.concat([{text: newData.textValue, date: newData.dateValue, urgency: newData.urgencyValue}])});
    this.render();
  }

  render() {
    var todos = [];
    for (let i = 0; i < this.state.todos.length; i++) {
      todos.push(<ToDoItem itemData={this.state.todos[i]} />);
    }

    //console.log(this.state.todos);
    return (<div>
            <h2>Home</h2>
            <NameForm onClick={this.addTodo} />
            <ul>
              {todos}
            </ul>
            </div>

    );

  }

}


class ToDoItem extends Component {

  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
    this.state = {completed: false};
  }

  onClick() {
    this.setState({completed: !this.state.completed});
  }

  render () {
    console.log(this.props.itemData);
    return (
      <li onClick={this.onClick} style={ this.state.completed ? {textDecoration: 'line-through'} : {}} >
        {this.props.itemData.text + ' (' + this.props.itemData.date + ') (' + this.props.itemData.urgency.toString() + ')'}
      </li>

      )

  }


}


ToDoItem.propTypes = {
  itemData: React.PropTypes.object.isRequired,
};

ToDoItem.defaultProps = {
  itemData: {}
};



class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {textValue: '', dateValue: '', urgencyValue: 0};

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleUrgencyChange = this.handleUrgencyChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onClick(this.state);
  }

  handleDateChange(event) {
    this.setState(Object.assign({}, this.state, {dateValue: event.target.value}));
  }

  handleTextChange(event) {
    this.setState(Object.assign({}, this.state, {textValue: event.target.value}));
  }

  handleUrgencyChange(event) {
    this.setState(Object.assign({}, this.state, {urgencyValue: parseInt(event.target.value) || 0}));
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.textValue} onChange={this.handleTextChange} />
        </label> 
        <br />
        <label>
        Date:
          <input type="date" value={this.state.dateValue} onChange={this.handleDateChange} />
        </label>
        <label>
        Number:
          <input type="number" value={this.state.urgencyValue} onChange={this.handleUrgencyChange} min="0" max="10" />
        </label>
        <input type="submit" value="Submit" onClick={this.onClick} />
      </form>
    );
  }
}

const About = () => (
  <h2>About</h2>
)

const Topics = () => (
  <h2>Topics</h2>
)

const NotFound = () => (
  <div>
    <h2>Uh-Oh!</h2>
    <h3>Page not found =( </h3>
  </div>
  )

class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
        </ul>

      <hr/>

      <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
      <Route component={NotFound}/>
      </Switch>

      </div>

      </Router>
    );
  }
}

export default App;
