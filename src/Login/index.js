import React, { Component } from 'react'
import './style.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import * as actions from '../actions'


class Login extends Component {
  constructor (props) {
    super(props);

    this.state={username: '', password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onClick () {
    this.props.dispatch(actions.login({username: this.state.username, password: this.state.password}));
  }

  render () {
    if (this.props.loggedIn) {
      return (<Redirect to="/authRequired" />)
    }

    return (
      <div className="login" style={{textAlign: 'center'}}>
      <div className="page-header">
        <h1> Login </h1>
      </div>
        <h3> You must log-in to access your todo list. </h3>
        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange} />
        <br />
        <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        <br />
        <br />
        <button className="btn btn-me btn-default" type="submit" value="Login" onClick={this.onClick}> Login </button>
        <br /> <br />
         <div className="alert alert-info" role="alert" style={{margin: 'auto', width: '50%', fontSize: '20px'}}>
        <strong>No account?</strong> Register for one <b><Link to="/register"> here </Link></b>
      </div>
      </div>


    )
  }

}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps)(Login)