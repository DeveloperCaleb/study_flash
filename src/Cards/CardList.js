import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ cards, deckId }) {
  const history = useHistory();

  //Will delete the selected card on click and then refresh the page.
  const handleClick = ({ target }) => {
    deleteCard(target.id);
    history.go(0);
  };

  //Creates card element for every card.
  const cardList = cards.map((card) => {
    return (
      <Card.Body key={cards.indexOf(card)}>
        <Card.Text>{card.front}</Card.Text>
        <Card.Text>{card.back}</Card.Text>
        <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
          <button>Edit</button>
        </Link>
        <button type="button" id={`${card.id}`} onClick={handleClick}>
          Delete
        </button>
      </Card.Body>
    );
  });

  return cardList;
}

export default CardList;
