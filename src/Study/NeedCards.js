import React from "react";
import { Link, useParams } from "react-router-dom";
import "./NeedCards.css";

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
      <Link to={`/decks/${deckId}/cards/new`}>
        <button className="needCard">Add Cards</button>
      </Link>
    </div>
  );
}

export default NeedCards;
