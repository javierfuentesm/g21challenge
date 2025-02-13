import StateContext from "../../context/StateContext";
import { useNavigate } from "react-router-dom";
import { FunctionComponent, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Results: FunctionComponent = () => {
  const navigate = useNavigate();
  const { state, resetGame } = useContext(StateContext);

  useEffect(() => {
    if (state.answers.length <= 0) {
      navigate("/");
      return;
    }
  }, [navigate, state.answers.length]);

  const score = state.answers.filter(
    (answer) => answer.answer === answer.correct_answer,
  ).length;

  const onClickPlayAgain = () => {
    resetGame();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto text-center p-4">
      <h1 className="text-3xl font-bold mb-8">
        You scored {score} / {state.total}
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <ul className="space-y-4">
          {state.answers.map((item, index) => {
            const isCorrect = item.answer === item.correct_answer;
            return (
              <li
                key={index}
                className={`p-4 rounded-lg ${
                  isCorrect ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                  <span
                    className="text-left"
                    dangerouslySetInnerHTML={{ __html: item.question }}
                  />
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Your answer: {item.answer} (Correct: {item.correct_answer})
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Button className="w-32 h-10 text-sm" onClick={onClickPlayAgain}>
        Play Again
      </Button>
    </div>
  );
};
