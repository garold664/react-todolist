import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
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

const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const newMessage = {
        todo: action.payload.todo,
        category: action.payload.category,
        // id: Date.now(),
        id: new Date().getTime(),
      };

      state.todos.unshift(newMessage);
      console.log(state.todos.length);
    },
    changeTodo: (state, action) => {
      const messageItemIndex = state.todos.findIndex(
        (el) => el.id === action.payload.id
      );
      state.todos[messageItemIndex] = {
        ...state.todos[messageItemIndex],
        todo: action.payload.todo,
        category: action.payload.category,
      };
      console.log('Redux: ', action.payload.todo);
    },
    addCategory: (state, action) => {
      const newCategory = {
        color: action.payload.color,
        category: action.payload.category,
        id: new Date().getTime(),
      };

      state.categories.push(newCategory);
    },
  },
});

const store = configureStore({
  reducer: todosSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const { addTodo, changeTodo, addCategory } = todosSlice.actions;
export default store;
