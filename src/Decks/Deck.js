import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CardList from "../Cards/CardList";
import { readDeck } from "../utils/api/index";

function Deck() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});

  //When the page first renders get the data of the deck with deckId from the DB and setDeck to it. Also set the cards to be the currentDecks cards array.
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      console.log("response", response);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  console.log(deck);

  //Deck information
  const deckItem = (
    <div>
      <Card.Body>
        <Card.Title>{deck.name}</Card.Title>
        <Card.Text>{deck.description}</Card.Text>
        <Link to={`/decks/${deckId}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
          <button>Study</button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button>+ Add Cards</button>
        </Link>
        <button>Delete</button>
      </Card.Body>
    </div>
  );

  //set cardItems using the CardList component.
  //const cardItems = <CardList cards={deck.cards} deckId={deckId} />;

  return (
    <>
      <div>
        {deckItem}
        <br></br>
        <h1>Cards</h1>
        <CardList cards={deck.cards || []} deckId={deckId} />
      </div>
    </>
  );
}

export default Deck;
