import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Route, Switch, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardList from "../Cards/CardList";

function Deck() {
  //Set initial hook to an empty array
  const [deck, setDeck] = useState({});

  //When the page first renders get the data of the deck with id 1 from the DB and setDeck to it
  useEffect(() => {
    async function loadDeck() {
      const response = readDeck(1);
      const currentDeck = await response;

      setDeck(currentDeck);
    }
    loadDeck();
  }, []);

  //Deck information
  const deckItem = (
    <div>
      {" "}
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
    </div>
  );

  //set cardItems to the CardList component with the current deck being the prop
  //I think this is where I am having the problem. If I add {cardItems} to the return after the deck is initially set it is no problem but if I reload the page breaks.

  return (
    <div>
      {deckItem}
      <br></br>
      <h1>Cards</h1>
    </div>
  );
}

export default Deck;
