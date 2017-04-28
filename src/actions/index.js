const login = (userInfo) => {
  return function(dispatch) {
    let data = JSON.stringify(userInfo);

    fetch('/getAccess', {method: 'POST', body: data})
      .then( (res) => { res.json().then( (r) => {
        if (r.result) {
          dispatch({type: 'LOGIN_SUCCESSFUL', username: userInfo.username, token: r.token});
        }
      });
    });

  }
}

const getTodos = (username, token) => {
  return function(dispatch) {

    //console.log(token);
    
    fetch('/getTodos', {method: 'POST', credentials: 'include', headers: new Headers({Authorization: token}), body: JSON.stringify({user: username})} )
      .then( (res) => { res.json().then( (r) => 
        {
          dispatch({type: 'TODOS_RECEIVED', todos: r});
        } 
      )} 
    );

  }
  

}

const addTodo = (newData, user, token) => {

  return function(dispatch) {
    var data = JSON.stringify({newItem: newData.textValue, newDate: newData.dateValue, newUrgency: newData.urgencyValue, user: user, completed: false});

    fetch('/setTodos', {method: 'POST', headers: new Headers({Authorization: token}), body: data})
      .then( (res) => {
        dispatch({type: 'TODO_ADDED', todo: {
          text: newData.textValue,
          date: newData.dateValue,
          urgency: newData.urgencyValue,
          user: user,
          completed: false
        }})
      })

  }


}

const toggleCompleted = (item, token) => {

  return function(dispatch) {
    var data = JSON.stringify(item);

    fetch('/toggleCompleted', {method: 'POST', headers: new Headers({Authorization: token}), body: data})
      .then( (res) => {
        dispatch({type: 'TOGGLED', item: item})
      });
  }

}
const sort = () => ({
  type: 'CHANGE_SORT'
})

const logout = () => ({
  type: 'LOGOUT'
})

const toggleShowCompleted = () => ({
  type: 'TOGGLE_SHOW_COMPLETED'
})

const registerUser = (newUser) => {
  return function(dispatch) {
    let data = JSON.stringify(newUser);

    fetch('/newUser', {method: 'POST', body: data})
      .then( (res) => { res.json().then( (r) => {
        dispatch({type: 'USER_REGISTERED', user: newUser.username, token: r.token});
      })
        
    });
  }
}


export {login, sort, getTodos, addTodo, logout, toggleCompleted, toggleShowCompleted, registerUser}