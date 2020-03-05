

export const fetchTodos = payload => ({
    type: 'FETCH_TODOS',
    payload
  });
  
  export const updateActiveTab = payload => ({
    type: 'UPDATE_ACTIVE_TAB',
    payload
  });
  
  export const deleteTodo = payload => ({
    type: 'DELETE_TODO',
    payload
  });
  
  export const addTodo = payload => ({
    type: 'ADD_TODO',
    payload
  });
  
  export const updateTodo = payload => ({
    type: 'UPDATE_TODO',
    payload
  });
  
  export const markDone = payload => ({
    type: 'BULK_DONE',
    payload
  });
  
  export const markPending = payload => ({
    type: 'BULK_PENDING',
    payload
  });
  
  export const globalSearch = payload => ({
    type: 'GLOBAL_SEARCH',
    payload
  })