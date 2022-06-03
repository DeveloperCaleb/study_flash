import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./StudyCard.css";

function StudyCard({ deck, cards }) {
  const history = useHistory();

  const [flip, setFlip] = useState(true);
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    flip ? setFlip(!flip) : setFlip(!flip);
  };

  const handleNext = () => {
    if (counter + 1 < cards.length) {
      setCounter((counter) => counter + 1);
      setFlip(true);
    } else if (
      window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page."
      )
    ) {
      setCounter(0);
      setFlip(true);
    } else {
      history.push("/");
    }
  };

  const nextButton = (
    <button className="next" type="button" onClick={handleNext}>
      Next
    </button>
  );

  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <Card.Body>
        <Card.Title>
          Card {counter + 1 === counter.length ? counter : counter + 1} of
          {` ${cards.length}`}
        </Card.Title>
        <Card.Text>
          {flip ? cards[counter]?.front : cards[counter]?.back}
        </Card.Text>
        <button type="button" onClick={handleClick}>
          Flip
        </button>
        {!flip ? nextButton : false}
      </Card.Body>
    </div>
  );
}

export default StudyCard;
