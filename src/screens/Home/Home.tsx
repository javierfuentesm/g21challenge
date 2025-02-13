import { useNavigate } from "react-router-dom";
import { useQuiz } from "@/hooks/useQuiz.ts";
import StateContext from "../../context/StateContext";
import { FunctionComponent, useContext } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Home: FunctionComponent = () => {
  const navigate = useNavigate();
  const { setTotal } = useContext(StateContext);
  const { data: quiz, isLoading, isError, refetch } = useQuiz();

  const onClickBegin = () => {
    if (quiz) {
      setTotal(quiz.length);
      navigate("/quiz/1");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-2xl p-8 space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Welcome to the Trivia Challenge
          </h1>
          <div className="space-y-2">
            <p className="text-xl text-gray-600">
              You will be presented with 10 True or False questions
            </p>
            <p className="text-xl font-medium text-gray-800">
              Can you score 100%?
            </p>
          </div>
        </div>

        {isError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex items-center gap-2">
              Failed to load quiz
              <Button variant="outline" size="sm" onClick={() => refetch()}>
                Try Again
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-center">
          <Button
            onClick={onClickBegin}
            disabled={isLoading || isError}
            className="w-40 h-12 text-lg shadow-lg"
          >
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Begin"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
