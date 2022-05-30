import React, { useEffect, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function CardList({ deck }) {
  //set initial hook
  const [cards, setCards] = useState(deck.cards);

  console.log(cards);

  //Creates card element for every card.
  const cardList = cards.map((card) => {
    return (
      <Card.Body>
        <Card.Text>{card.front}</Card.Text>
        <Card.Text>{card.back}</Card.Text>
        <Link to={`/decks/1/edit`}>
          <button>Edit</button>
        </Link>
        <button>Delete</button>
      </Card.Body>
    );
  });

  return cardList;
}

export default CardList;
