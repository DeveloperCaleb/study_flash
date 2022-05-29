import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Route, Switch, useParams, Link } from "react-router-dom";
import { readDeck, listDecks } from "../utils/api/index";

function Deck() {
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const response = readDeck(1);
      const currentDeck = await response;

      setDeck(currentDeck);
    }
    loadDeck();
  }, []);

  console.log(deck);

  const deckItem = (
    <Card.Body>
      <Card.Title>{deck.name}</Card.Title>
      <Card.Text>{deck.description}</Card.Text>
      <Link to={`/decks/1/edit`}>
        <button>Edit</button>
      </Link>
      <Link to={`/decks/1/study`}>
        <button>Study</button>
      </Link>
      <Link to={`/decks/1/new`}>
        <button>+ Add Cards</button>
      </Link>
      <button>Delete</button>
    </Card.Body>
  );

  const cards = deck.cards;

  const cardItem = cards.map((card) => {
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

  return (
    <div>
      {deckItem}
      <br></br>
      <h1>Cards</h1>
      {cardItem}
    </div>
  );
}

export default Deck;
