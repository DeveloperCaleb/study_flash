import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api/index";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getDecks() {
      const response = listDecks();
      const deckList = await response;

      setDecks(deckList);
    }
    getDecks();
  }, []);

  console.log(decks);

  const deckCard = decks.map((deck) => {
    return (
      <Card>
        <Card.Body>
          <Card.Title>{deck.name}</Card.Title>
          <Card.Subtitle>{deck.cards.length} cards</Card.Subtitle>
          <Card.Text>{deck.description}</Card.Text>
          <Link to={`/decks/${deck.id}`}>
            <button>View</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button>Create</button>
          </Link>
          <button>Delete</button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div>
      <Link to={`/decks/new`}>
        <button>Create Deck</button>
      </Link>
      {deckCard}
    </div>
  );
}

export default DeckList;
