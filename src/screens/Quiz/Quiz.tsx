import React from "react";
import { navigate } from "@reach/router";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import CTAButton from "../../components/CTAButton/CTAButton";
import Container from "../../components/Container/Container";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import StateContext from "../../context/StateContext";
import { getQuizById } from "../../selectors";

interface QuizProps {
  id?: string;
}

function Quiz({ id }: QuizProps): JSX.Element {
  const { state, answerQuestion } = React.useContext(StateContext);
  const [answerState, setSelectedAnswer] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (state.total <= 0) {
      navigate("/");
    }
    if (state.answers.length >= state.total) {
      navigate("/results");
    }
  }, [state]);

  if (!id) {
    return <Loading />;
  }

  const quiz = getQuizById(state, parseInt(id, 10));

  const handleNextClick = () => {
    if (!quiz) return;
    answerQuestion({ ...quiz, answer: answerState });
    navigate(`/quiz/${parseInt(id, 10) + 1}`);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  if (!quiz) {
    return <Loading />;
  }

  return (
    <Container>
      <h1>{quiz.category}</h1>
      <Card>
        <p dangerouslySetInnerHTML={{ __html: quiz.question }} />
        <RadioButtons
          items={[
            {
              id: 1,
              value: "True",
              label: "True",
              onChange: handleAnswerChange
            },
            {
              id: 2,
              value: "False",
              label: "False",
              onChange: handleAnswerChange
            }
          ]}
        />
        <CTAButton
          onClick={handleNextClick}
          text="Next"
          disabled={!answerState}
        />
      </Card>
      <p>
        {id} of {state.total}
      </p>
    </Container>
  );
}

export default Quiz;