import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'


class ToDoItem extends Component {

  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {

    this.props.dispatch(actions.toggleCompleted(this.props.itemData, this.props.token));
  }

  render () {
    // console.log(this.props.itemData);

    var classname = this.props.itemData.completed ? "list-group-item active" : "list-group-item";

    return (
      <li className={classname} onClick={this.onClick} style={ this.props.itemData.completed ? {textDecoration: 'line-through'} : {}} >
        {this.props.itemData.text + ' (' + this.props.itemData.date + ') (' + this.props.itemData.urgency.toString() + ')'}
      </li>

      )

  }


}

const mapStateToProps = (state) => ({
  todos: state.todos,
  token: state.token
})

export default connect(mapStateToProps)(ToDoItem)