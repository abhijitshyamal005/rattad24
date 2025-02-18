export enum Actions {
  ADDMESSAGE = 'add_message',
}

export type ActionReducer = {
  type: Actions;
  payload?: Message;
};

export enum MessageRole {
  USER = 'user',
  BOT = 'bot',
}
export interface Message {
  role?: MessageRole;
  question?: string;
  answer?: string;
  content?: string;
}

export interface ApplicationState {
  messages: Message[];
}

export const messageReducer = (
  state: ApplicationState,
  { payload, type }: ActionReducer
): ApplicationState => {
  switch (type) {
    case Actions.ADDMESSAGE:
      return {
        ...state,
        messages: [...state.messages, { ...payload }],
      };
    default:
      return state; // Always return the state for unrecognized actions
  }
};
