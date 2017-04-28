import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router'
import Home from '../Home'


class EnsureLoggedInContainer extends Component {

  render () {

    if (this.props.loggedIn) {
      return (<Redirect to="/" />);
    } else {

      return (<Redirect to="/login" />);
    }

  }


}

const mapStateToProps = (state) => {
  return {loggedIn: state.loggedIn}
}

export default connect(mapStateToProps)(EnsureLoggedInContainer) 