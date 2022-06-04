import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div className="card">
      <h1>Study: {deck.name}</h1>
      <div className="card-body">
        <h1 className="card-title">
          Card {counter + 1 === counter.length ? counter : counter + 1} of
          {` ${cards.length}`}
        </h1>
        <p className="card-text">
          {flip
            ? cards[counter] && cards[counter].front
            : cards[counter] && cards[counter].back}
        </p>
        <button type="button" onClick={handleClick}>
          Flip
        </button>
        {!flip ? nextButton : false}
      </div>
    </div>
  );
}

export default StudyCard;
