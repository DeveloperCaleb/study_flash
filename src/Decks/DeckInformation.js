import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckInformation({ deck }) {
  const history = useHistory();

  //Will ask for confirmation and then delete the selected card on click and then refresh the page.
  const handleClick = ({ target }) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it")
    ) {
      deleteDeck(target.id);
      history.push("/");
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">{deck.name}</h1>
        <p className="card-text">{deck.description}</p>
        <a href={`/decks/${deck.id}/edit`}>
          <button className="edit">Edit</button>
        </a>
        <a href={`/decks/${deck.id}/study`}>
          <button className="study2">Study</button>
        </a>
        <a href={`/decks/${deck.id}/cards/new`}>
          <button className="createDeck2">Add Cards</button>
        </a>

        <button
          className="deleteButton"
          type="button"
          id={`${deck.id}`}
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeckInformation;
