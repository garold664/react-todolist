import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
// import store from './store/store.ts';
import Message from './components/Message/Message.tsx';
import { MessageContext } from './context/MessageContext.tsx';
import { createReduxStore } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={createReduxStore()}>
      <MessageContext>
        <App />
        <Message />
      </MessageContext>
    </Provider>
  </React.StrictMode>
);
