
import * as initialState from '../initialState'

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return state;
    }

    case 'LOGIN_SUCCESSFUL': {
      return Object.assign({}, state, {loggedIn: true, currentUser: action.username, token: action.token});
    }

    case 'CHANGE_SORT': {
      return Object.assign({}, state, {sortByUrgency: !state.sortByUrgency})
    }

    case 'LOGOUT': {
      return Object.assign({}, state, initialState);
    }

    case 'TODOS_RECEIVED' : {
      return Object.assign({}, state, {todos: action.todos});
    }

    case 'TODO_ADDED' : {
      return Object.assign({}, state, {todos: state.todos.concat([action.todo])});
    }

    case 'TOGGLED' : {
      let stateTodos = state.todos.slice();
      stateTodos[stateTodos.indexOf(action.item)].completed = !action.item.completed;
      return Object.assign({}, state, {todos: stateTodos});
    }

    case 'TOGGLE_SHOW_COMPLETED' : {
      return Object.assign({}, state, {showCompleted: !state.showCompleted});
    }

    case 'USER_REGISTERED' : {
      return Object.assign({}, state, {loggedIn: true, currentUser: action.user, token: action.token});
    }
  }

  return state;
};

export { reducer }