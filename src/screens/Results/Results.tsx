import React from "react";
import { navigate } from "@reach/router";
import StateContext from "../../context/StateContext";
import CTAButton from "../../components/CTAButton/CTAButton";
import Card from "../../components/Card/Card";
import Container from "../../components/Container/Container";
import { getScore, isCorrect } from "../../selectors";

function Results(): JSX.Element {
  const { state, resetGame } = React.useContext(StateContext);

  React.useEffect(() => {
    if (state.answers.length <= 0) {
      navigate("/");
    }
  }, [state]);

  const onClickPlayAgain = () => {
    resetGame();
    navigate("/");
  };

  return (
    <Container>
      <h1>
        You Scored {getScore(state)}/{state.total}
      </h1>
      <Card>
        <ul>
          {state.answers.map((item) => (
            <li
              key={item.question}
              style={{
                fontWeight: isCorrect(item) ? "bold" : "normal"
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: item.question }} />
            </li>
          ))}
        </ul>
      </Card>
      <CTAButton onClick={onClickPlayAgain} text="Play Again" />
    </Container>
  );
}

export default Results;