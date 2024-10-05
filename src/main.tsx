import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import store from './store/store.ts';
import { MessageContext } from './context/MessageContext.tsx';
import Message from './components/Message.tsx';
import { useMessage } from './context/MessageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <MessageContext>
        <App />
        <Message />
      </MessageContext>
    </Provider>
  </React.StrictMode>
);
