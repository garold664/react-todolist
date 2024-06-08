import { createStore } from 'redux';

export const ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  CHANGE_TODO: 'CHANGE_TODO',
  ADD_CATEGORY: 'ADD_CATEGORY',
};

let initialState = {
  categories: [
    { category: 'Chores', color: '#1af901', id: 1 },
    { category: 'Programming', color: '#ff0000', id: 2 },
    { category: 'Hobby', color: '#0000ff', id: 3 },
  ],
  todos: [
    { category: 'Chores', todo: 'Cleanup your room', id: 1 },
    { category: 'Programming', todo: 'Learn React', id: 2 },
    { category: 'Hobby', todo: 'Watch Invincible 2nd season', id: 3 },
  ],
};

let dialogReducer = (state = initialState, action) => {
  const newState = { ...state };
  newState.todos = [...state.todos];
  if (action.type == ACTIONS.ADD_TODO) {
    let newMessage = {
      todo: action.payload.todo,
      category: action.payload.category,
      // id: Date.now(),
      id: new Date().getTime(),
    };

    newState.todos.unshift(newMessage);
    // newState.newMessageText = "";
  } else if (action.type == ACTIONS.CHANGE_TODO) {
    const messageItemIndex = newState.todos.findIndex(
      (el) => el.id === action.payload.id
    );
    newState.todos[messageItemIndex] = {
      ...newState.todos[messageItemIndex],
      todo: action.payload.todo,
      category: action.payload.category,
    };
  } else if (action.type == ACTIONS.ADD_CATEGORY) {
    newState.categories = [...state.categories];
    const newCategory = {
      color: action.payload.color,
      category: action.payload.category,
      id: new Date().getTime(),
    };
    // console.log(newCategory);

    newState.categories.push(newCategory);
  }
  // console.log(newState);
  return newState;
};

const store = createStore(dialogReducer);

export default store;
