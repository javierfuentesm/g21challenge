import { useContext, useState, useEffect, FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "@/hooks/useQuiz.ts";
import StateContext from "../../context/StateContext";
import { Card } from "../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Loading } from "../../components/Loading/Loading";
import Container from "../../components/Container/Container";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export const Quiz: FunctionComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, answerQuestion } = useContext(StateContext);
  const { data: quiz, isLoading } = useQuiz();

  const currentQuestionIndex = Number(id) - 1;
  const currentQuiz = quiz?.[currentQuestionIndex];

  const savedAnswer = state.answers[currentQuestionIndex];

  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    savedAnswer?.answer,
  );

  const [direction, setDirection] = useState<1 | -1>(1);

  useEffect(() => {
    // Handle initial validations
    if ((!isLoading && !quiz) || state.total === 0) {
      navigate("/");
      return;
    }
  }, [isLoading, quiz, currentQuestionIndex, navigate, state.total]);

  if (isLoading || !currentQuiz) {
    return <Loading />;
  }

  const handleNextClick = () => {
    if (!currentQuiz || !selectedAnswer) return;
    setDirection(1);

    // Dispara el confeti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4F46E5", "#818CF8", "#C7D2FE"],
    });

    answerQuestion(
      { ...currentQuiz, answer: selectedAnswer },
      currentQuestionIndex,
    );
    const nextQuestionAnswer = state.answers[currentQuestionIndex + 1];
    setSelectedAnswer(nextQuestionAnswer?.answer);

    if (currentQuestionIndex + 1 === state.total) {
      // Confeti especial para el final
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 160,
          origin: { y: 0.6 },
          colors: ["#4F46E5", "#818CF8", "#C7D2FE"],
        });
      }, 300);
      navigate("/results");
    } else {
      navigate(`/quiz/${currentQuestionIndex + 2}`);
    }
  };

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setSelectedAnswer(state.answers[currentQuestionIndex - 1]?.answer);
      navigate(`/quiz/${currentQuestionIndex}`);
    }
  };

  const canGoNext = savedAnswer != undefined || !!selectedAnswer;
  const canGoPrevious = currentQuestionIndex > 0;
  return (
    <Container>
      <div className="max-w-2xl mx-auto space-y-6 px-4">
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="block text-xs font-medium text-primary text-center uppercase tracking-wider">
            {currentQuiz.category}
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-center text-foreground">
            Question {id} of {state.total}
          </h1>
          <Progress
            value={(currentQuestionIndex / state.total) * 100}
            className="h-2 w-full"
          />
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <div className="space-y-8">
                <p
                  className="text-lg leading-relaxed text-card-foreground text-center"
                  dangerouslySetInnerHTML={{ __html: currentQuiz.question }}
                />

                <RadioGroup
                  key={currentQuestionIndex}
                  value={selectedAnswer}
                  onValueChange={handleAnswerSelect}
                  className="flex flex-col items-center gap-4"
                >
                  {["True", "False"].map((value) => (
                    <motion.div
                      key={value}
                      className="w-full max-w-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: value === "True" ? 0.1 : 0.2,
                      }}
                    >
                      <label
                        className="flex items-center justify-center gap-3 p-4 rounded-lg border-2 border-input hover:border-primary transition-all cursor-pointer"
                        htmlFor={value.toLowerCase()}
                      >
                        <RadioGroupItem
                          value={value}
                          id={value.toLowerCase()}
                        />
                        <span className="text-base font-medium text-foreground">
                          {value}
                        </span>
                      </label>
                    </motion.div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousClick}
                    disabled={!canGoPrevious}
                    className="w-32 h-10 text-sm"
                  >
                    ← Previous
                  </Button>
                  <Button
                    onClick={handleNextClick}
                    disabled={!canGoNext}
                    className="w-32 h-10 text-sm"
                  >
                    {Number(id) === state.total ? "Finish" : "Next →"}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
};
