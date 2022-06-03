import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import { FaBookReader, FaPlus, FaTrash } from "react-icons/fa";
import "./DeckInformation.css";

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
    <div>
      <Card.Body>
        <Card.Title>{deck.name}</Card.Title>
        <Card.Text>{deck.description}</Card.Text>
        <Link to={`/decks/${deck.id}/edit`}>
          <button className="edit">Edit</button>
        </Link>
        <Link to={`/decks/${deck.id}/study`}>
          <button className="study2">
            <FaBookReader /> {` Study`}
          </button>
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`}>
          <button className="createDeck2">
            <FaPlus /> {` Add Cards`}
          </button>
        </Link>

        <button
          className="deleteButton"
          type="button"
          id={`${deck.id}`}
          onClick={handleClick}
        >
          <FaTrash />
        </button>
      </Card.Body>
    </div>
  );
}

export default DeckInformation;
