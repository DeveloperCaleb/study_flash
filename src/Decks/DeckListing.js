import React from "react";
import { Card } from "react-bootstrap";
import { FaBookReader, FaTrash } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckListing({ decks }) {
  {
    const history = useHistory();

    //Ask for confirmation and then will delete the selected deck and refresh
    const handleClick = ({ target }) => {
      if (
        window.confirm(
          "Delete this deck?\n\nYou will not be able to recover it"
        )
      ) {
        deleteDeck(target.id);
        history.go(0);
      }
    };

    //Creates a Card element for each Deck.
    return decks.map((deck) => {
      return (
        <Card key={decks.indexOf(deck)}>
          <Card.Body>
            <Card.Title>{deck.name}</Card.Title>
            <Card.Subtitle>{deck.cards.length} cards</Card.Subtitle>
            <Card.Text>{deck.description}</Card.Text>
            <Link to={`/decks/${deck.id}`}>
              <button className="view">View</button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button className="study">
                <FaBookReader /> {` Study`}
              </button>
            </Link>
            <button
              type="button"
              className="deleteDeck"
              id={`${deck.id}`}
              onClick={handleClick}
            >
              <FaTrash />
            </button>
          </Card.Body>
        </Card>
      );
    });
  }
}

export default DeckListing;
