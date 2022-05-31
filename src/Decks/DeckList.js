import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function DeckList({ decks, setDecks }) {
  const history = useHistory();
  useEffect(() => {
    async function getDecks() {
      const response = listDecks();
      const deckList = await response;

      setDecks(deckList);
    }
    getDecks();
  }, []);

  const handleClick = ({ target }) => {
    deleteDeck(target.id);
    history.go(0);
  };

  const deckCard = decks.map((deck) => {
    return (
      <Card key={decks.indexOf(deck)}>
        <Card.Body>
          <Card.Title>{deck.name}</Card.Title>
          <Card.Subtitle>{deck.cards.length} cards</Card.Subtitle>
          <Card.Text>{deck.description}</Card.Text>
          <Link to={`/decks/${deck.id}`}>
            <button>View</button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <button>Study</button>
          </Link>
          <button type="button" id={`${deck.id}`} onClick={handleClick}>
            Delete
          </button>
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
