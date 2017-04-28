import React, { Component } from 'react'
import * as actions from './actions'
import { connect } from 'react-redux'

class ToDoForm extends Component {

  constructor(props) {
    super(props);
    this.state = {textValue: '', dateValue: '', urgencyValue: 0, completed: false};

    // this.handleDateChange = this.handleDateChange.bind(this);
    // this.handleTextChange = this.handleTextChange.bind(this);
    // this.handleUrgencyChange = this.handleUrgencyChange.bind(this);

    this.handleChange = this.handleChange.bind(this);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.state.dateValue === '') {
      window.alert("Please enter a date");
    } else {
      this.props.onClick(this.state);
    }

    this.setState({textValue: '', dateValue: '', urgencyValue: 0, completed: false});
    
  }

  handleChange (event) {


    this.setState({[event.target.name]: event.target.value});
  }


  render() {
    return (
      <div className="row">
      <div className="col-sm-4"></div>
      <div className="jumbotron col-sm-4" >
        <label>
          Text:
          <input name="textValue" type="text" value={this.state.textValue} onChange={this.handleChange} />
        </label> 
        <br />
        <label>
        Date:
          <input name="dateValue" type="date" value={this.state.dateValue} onChange={this.handleChange} />
        </label>
        <label>
        Urgency:
          <input name="urgencyValue" type="number" value={this.state.urgencyValue} onChange={this.handleChange} min="0" max="10" />
        </label>
        <br />
        <br />
        <button type="submit" className="btn btn-m btn-primary" value="Submit" onClick={this.onClick}>Add New Task </button>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps)(ToDoForm)