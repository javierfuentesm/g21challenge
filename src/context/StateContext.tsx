import React from "react";
import { QuizItem } from "@/types";

interface GameState {
  answers: QuizItem[];
  total: number;
}

interface StateContextValue {
  state: GameState;
  answerQuestion: (answer: QuizItem, index: number) => void;
  resetGame: () => void;
  setTotal: (total: number) => void;
}

const initialState: GameState = {
  answers: [],
  total: 0,
};

enum ActionType {
  ANSWER_QUESTION = "ANSWER_QUESTION",
  RESET_GAME = "RESET_GAME",
  SET_TOTAL = "SET_TOTAL",
}

type Action =
  | {
      type: ActionType.ANSWER_QUESTION;
      payload: { answer: QuizItem; index: number };
    }
  | { type: ActionType.RESET_GAME }
  | { type: ActionType.SET_TOTAL; payload: { total: number } };

const StateContext = React.createContext<StateContextValue>({
  state: initialState,
  answerQuestion: () => {},
  resetGame: () => {},
  setTotal: () => {},
});

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case ActionType.ANSWER_QUESTION: {
      const { answer, index } = action.payload;
      const newAnswers = [...state.answers];
      newAnswers[index] = answer;

      return {
        ...state,
        answers: newAnswers,
      };
    }
    case ActionType.SET_TOTAL:
      return {
        ...state,
        total: action.payload.total,
      };
    case ActionType.RESET_GAME:
      return initialState;
    default:
      return state;
  }
}

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    state,
    answerQuestion: (answer: QuizItem, index: number) =>
      dispatch({
        type: ActionType.ANSWER_QUESTION,
        payload: { answer, index },
      }),
    resetGame: () => dispatch({ type: ActionType.RESET_GAME }),
    setTotal: (total: number) =>
      dispatch({ type: ActionType.SET_TOTAL, payload: { total } }),
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}

export default StateContext;
