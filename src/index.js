import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import App from './App/App';
import { reducer as reducers } from './reducers'
import * as initialState from './initialState'
import './index.css';

import { createLogger } from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"






const middleware = applyMiddleware(promise(), thunk);

const store = createStore(reducers, initialState, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

