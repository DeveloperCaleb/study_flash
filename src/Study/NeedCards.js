import React from "react";
import { useParams } from "react-router-dom";

function NeedCards({ cards }) {
  const { deckId } = useParams();

  return (
    <div>
      <h1>Not enough cards.</h1>
      <p>
        You need at least 3 cards to study. There are
        {` ${cards.length} `}
        in this deck.
      </p>
      <br />
      <a href={`/decks/${deckId}/cards/new`}>
        <button className="needCard">Add Cards</button>
      </a>
    </div>
  );
}

export default NeedCards;
