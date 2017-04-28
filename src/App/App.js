import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'

import NotFound from '../NotFound'
import About from '../About'
import Register from '../Register'
import Login from '../Login'
import EnsureLoggedInContainer from '../auth/EnsureLoggedInContainer'
import Home from '../Home'
import { connect } from 'react-redux'
import * as actions from '../actions'



// window.user = null;

// window.isLoggedIn = false;
class App extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    let loginLink = null;

    if (this.props.loggedIn) {
      loginLink =  (<li><a href="" onClick={(e) => { this.props.dispatch(actions.logout()) } }> Logout </a></li>);
    } else {
      loginLink = (<li><Link to="/login"> Login </Link></li>);
    }
    return (
      <Router>
      <div>
        

    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">TaskIt</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {loginLink}
          </ul>
        </div>
      </div>
    </nav>


      <hr/>

      <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      <Route path="/authRequired" component={EnsureLoggedInContainer} />

      
      <Route component={NotFound}/>

      </Switch>

      </div>

      </Router>
    );
  }
}


let mapStateToProps = (state) => {
  return {loggedIn: state.loggedIn}
}


export default connect(mapStateToProps)(App)
