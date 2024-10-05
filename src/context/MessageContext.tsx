import { createContext, useContext, useState } from 'react';

const initialState = {
  message: 'fsf',
  type: 'success',
  setMessage: (message: string) => {},
  setType: (type: string) => {},
};

type MessageContextType = {
  children: React.ReactNode;
};
export const messageContext = createContext(initialState);

export function useMessage() {
  return useContext(messageContext);
}

export const MessageContext = ({ children }: MessageContextType) => {
  const [message, setMessage] = useState(initialState.message);
  const [type, setType] = useState(initialState.type);
  return (
    <messageContext.Provider value={{ message, type, setMessage, setType }}>
      {children}
    </messageContext.Provider>
  );
};
