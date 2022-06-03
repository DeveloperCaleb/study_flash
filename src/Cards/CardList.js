import React from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./CardList.css";

function CardList({ cards, deckId }) {
  const history = useHistory();

  //Will ask for confirmation and then delete the selected card on click and then refresh the page.
  const handleClick = ({ target }) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it")
    ) {
      deleteCard(target.id);
      history.go(0);
    }
  };

  //Creates card element for every card.
  const cardList = cards.map((card) => {
    return (
      <Card>
        <Card.Body key={cards.indexOf(card)}>
          <Card.Text>{card.front}</Card.Text>
          <Card.Text>{card.back}</Card.Text>
          <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button className="editCard">
              <FaPencilAlt /> {` Edit`}
            </button>
          </Link>
          <button
            className="deleteCardButton"
            type="button"
            id={`${card.id}`}
            onClick={handleClick}
          >
            <FaTrash />
          </button>
        </Card.Body>
      </Card>
    );
  });

  return cardList;
}

export default CardList;
