import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { Redirect } from 'react-router'
import './style.css'

class Register extends Component {

  constructor (props) {
    super(props);
    this.state = {username: '', password: '', email: ''};

    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onClick (event) {
    // let data = JSON.stringify({username: this.state.value});

    // fetch('/register', {method: 'POST', body: data})
    //   .then( (res) => {
    //     this.store.dispatch(actions.login(this.state.value));
    //     this.props.history.push('/authRequired');
    //   });

    this.props.dispatch(actions.registerUser({username: this.state.username, password: this.state.password}));

  }

  render () {

    if (this.props.loggedIn) {
        return (<Redirect to="/authRequired" />)
      }
      
    return (

      <div style={{textAlign: 'center'}} className="register">
      <div className="page-header">
        <h1>Register</h1>
      </div>

        <input type="email" name="email" placeholder="E-mail Address" value={this.state.email} onChange={this.handleChange} />
        <br />
        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
        <br />
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        <br />
        <br />
        <button className="btn btn-me btn-default" type="button" value="Register" onClick={this.onClick}> Register </button>
      </div>
      )

  }
}

const mapStateToProps = (state) => ({
  loggedIn : state.loggedIn
})

export default connect(mapStateToProps)(Register)