'use client';
import { createContext, useReducer } from 'react';
import {
  Actions,
  ApplicationState,
  Message,
  messageReducer,
} from './messageReducer';

export interface Store extends ApplicationState {
  setMessage: (message: Message) => void;
}

const MessageContext = createContext<Store | null>(null);
const initialState: ApplicationState = {
  messages: [],
};

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const setMessage = (data: Message) => {
    dispatch({ type: Actions.ADDMESSAGE, payload: data });
  };
  return (
    <MessageContext.Provider value={{ ...state, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
