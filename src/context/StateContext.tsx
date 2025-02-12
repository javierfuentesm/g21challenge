import React from "react";

interface QuizItem {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  answer?: string;
}

interface GameState {
  quiz: Array<QuizItem>;
  total: number;
  answers: Array<QuizItem>;
}

interface StateContextValue {
  state: GameState;
  fetchQuiz: () => Promise<Array<QuizItem> | undefined>;
  storeQuiz: (quizItems: Array<QuizItem>) => void;
  answerQuestion: (quizItem: QuizItem) => void;
  resetGame: () => void;
}

const initialState: GameState = {
  quiz: [],
  total: 0,
  answers: []
};

const StateContext = React.createContext<StateContextValue>({
  state: initialState,
  fetchQuiz: async () => [],
  storeQuiz: () => undefined,
  answerQuestion: () => undefined,
  resetGame: () => undefined
});

const QUIZ_ENDPOINT =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

enum ActionType {
  STORE_QUIZ = "STORE_QUIZ",
  ANSWER_QUESTION = "ANSWER_QUESTION",
  RESET_GAME = "RESET_GAME"
}

type Action =
  | { type: ActionType.STORE_QUIZ; payload: { quiz: Array<QuizItem> } }
  | { type: ActionType.ANSWER_QUESTION; payload: { answer: QuizItem } }
  | { type: ActionType.RESET_GAME };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case ActionType.STORE_QUIZ:
      return {
        ...state,
        quiz: action.payload.quiz,
        total: action.payload.quiz.length
      };
    case ActionType.ANSWER_QUESTION:
      return {
        ...state,
        answers: [...state.answers, action.payload.answer]
      };
    case ActionType.RESET_GAME:
      return initialState;
    default:
      return state;
  }
}

async function fetchQuiz(): Promise<Array<QuizItem> | undefined> {
  try {
    const response = await fetch(QUIZ_ENDPOINT);
    const json = await response.json();
    return json.results as Array<QuizItem>;
  } catch (e) {
    console.error(e);
  }
}

export function StateProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function storeQuiz(quiz: Array<QuizItem>) {
    dispatch({ type: ActionType.STORE_QUIZ, payload: { quiz } });
  }

  function answerQuestion(answer: QuizItem) {
    dispatch({ type: ActionType.ANSWER_QUESTION, payload: { answer } });
  }

  function resetGame() {
    dispatch({ type: ActionType.RESET_GAME });
  }

  return (
    <StateContext.Provider
      value={{
        state,
        fetchQuiz,
        storeQuiz,
        answerQuestion,
        resetGame
      }}
    >
      {props.children}
    </StateContext.Provider>
  );
}

export default StateContext;