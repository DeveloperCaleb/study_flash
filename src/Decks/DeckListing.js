import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckListing({ decks }) {
  const history = useHistory();

  //Ask for confirmation and then will delete the selected deck and refresh
  const handleClick = ({ target }) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it")
    ) {
      deleteDeck(target.id);
      history.go(0);
    }
  };

  //Creates a Card element for each Deck.
  return decks.map((deck) => {
    return (
      <div className="card" key={decks.indexOf(deck)}>
        <div className="card-body">
          <h1 className="card-title">{deck.name}</h1>
          <h3 className="card-title">{deck.cards.length} cards</h3>
          <p className="card-text">{deck.description}</p>
          <a href={`/decks/${deck.id}`}>
            <button className="view">View</button>
          </a>
          <a href={`/decks/${deck.id}/study`}>
            <button className="study">Study</button>
          </a>
          <button
            type="button"
            className="deleteDeck"
            id={`${deck.id}`}
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
}

export default DeckListing;
