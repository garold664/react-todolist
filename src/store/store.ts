import { createStore } from 'redux';

let ADD_MESSAGE = 'ADD-MESSAGE';
let MESSAGE_CHANGE = 'MESSAGE-CHANGE';

let initialState = {
  dialogNames: [
    { name: 'John', color: '#1af901', id: 1 },
    { name: 'David', color: '#ff0000', id: 2 },
    { name: 'Elizabet', color: '#0000ff', id: 3 },
  ],
  messageItems: [
    { name: 'John', message: 'Привет', id: 1 },
    { name: 'David', message: 'Го на Марс', id: 2 },
    { name: 'Elizabet', message: 'Где мой чип?', id: 3 },
  ],
};

let dialogReducer = (state = initialState, action) => {
  const newState = { ...state };
  newState.messageItems = [...state.messageItems];
  if (action.type == ADD_MESSAGE) {
    let newMessage = {
      message: action.payload.message,
      name: action.payload.name,
      // id: Date.now(),
      id: new Date().getTime(),
    };

    newState.messageItems.unshift(newMessage);
    // newState.newMessageText = "";
  } else if (action.type == MESSAGE_CHANGE) {
    const messageItemIndex = newState.messageItems.findIndex(
      (el) => el.id === action.payload.id
    );
    newState.messageItems[messageItemIndex] = {
      id: action.payload.id,
      message: action.payload.message,
      name: action.payload.name,
    };
    // newState.newMessageText = action.text;
  }

  return newState;
};

const store = createStore(dialogReducer);

export default store;
