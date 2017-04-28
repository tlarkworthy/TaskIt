import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import ToDoForm from '../ToDoForm'
import ToDoItem from '../ToDoItem'
import * as actions from '../actions'
import './style.css'



class Home extends Component {

  constructor(props) {
    super(props);


    this.props.dispatch(actions.getTodos(this.props.currentUser, this.props.token));

    this.addTodo = this.addTodo.bind(this);
  }

  componentDidMount() {

  }

  addTodo(newData) {

    var data = JSON.stringify({newItem: newData.textValue, newDate: newData.dateValue, newUrgency: newData.urgencyValue, user: this.props.currentUser});

    fetch('/setTodos', {method: 'POST', body: data, header: {'Accept': 'application/json', 'Content-Type': 'application/json' }});

    this.setState({todos: this.state.todos.concat([{text: newData.textValue, date: newData.dateValue, urgency: newData.urgencyValue, user: this.props.currentUser}])});
    this.render();
  }

  render() {

    var todos = [];
    let sortedArray = this.props.todos.slice();


    if (!this.props.loggedIn) {
      return(<Redirect to="/Login" />);
    }

    sortedArray.sort((a,b) => {

      return this.props.sortByUrgency ? (b.urgency - a.urgency) : (Date.parse(a.date) - Date.parse(b.date))
    });

    //console.log(sortedArray);

    for (let i = 0; i < sortedArray.length; i++) {
      if (this.props.showCompleted || !(sortedArray[i].completed)) {
        todos.push(<ToDoItem key={i} itemData={sortedArray[i]} />);
      }
      
    }

    //console.log(this.state.todos);
    return (<div style={{textAlign: 'center'}}>
            <div className="page-header">
              <h2>{this.props.currentUser}'s list</h2>
            </div>

            

            <ToDoForm onClick={(newData) => {this.props.dispatch(actions.addTodo(newData, this.props.currentUser, this.props.token))}} />
            <button type="button" className="btn btn-sm btn-default" onClick={ (e) => {e.preventDefault(); this.props.dispatch(actions.sort())}}>{this.props.sortByUrgency ? ' Sort by Date' : 'Sort by Urgency'} </button>
            <div className="divider" />
            <button type="button" className="btn btn-sm btn-default" onClick={ (e) => {e.preventDefault(); this.props.dispatch(actions.toggleShowCompleted())}}> {this.props.showCompleted ? 'Hide Completed' : 'Show Completed'} </button>
            <br />
            <br />
            <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
            <ul className="list-group">
              {todos}
            </ul>
            </div>
            </div>
           
            </div>

    );

  }

}








let mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    loggedIn: state.loggedIn,
    sortByUrgency: state.sortByUrgency,
    showCompleted: state.showCompleted,
    todos: state.todos,
    token: state.token
  }
}

export default connect(mapStateToProps)(Home)