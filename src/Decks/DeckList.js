import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function DeckList() {
  const history = useHistory();

  const [decks, setDecks] = useState([]);

  //Load all decks on initial render.
  useEffect(() => {
    async function getDecks() {
      const response = await listDecks();

      setDecks(response);
    }
    getDecks();
  }, []);

  //When clicked delete the selected deck and refresh the page.
  const handleClick = ({ target }) => {
    deleteDeck(target.id);
    history.go(0);
  };

  //Creates a card for each Deck. "Need to move this to it's own component"
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
