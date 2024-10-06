import { createContext, useContext, useState } from 'react';

type MessageType = 'success' | 'error';
type MessageContextType = {
  message: string;
  type: MessageType;
  setMessage: (message: string) => void;
  setType: (type: MessageType) => void;
};

type MessageContextProps = {
  children: React.ReactNode;
};

const initialState: MessageContextType = {
  message: '',
  type: 'success',
  setMessage: () => {},
  setType: () => {},
};
export const messageContext = createContext<MessageContextType>(initialState);

export function useMessage() {
  return useContext(messageContext);
}

export const MessageContext = ({ children }: MessageContextProps) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<MessageType>('success');
  return (
    <messageContext.Provider value={{ message, type, setMessage, setType }}>
      {children}
    </messageContext.Provider>
  );
};
