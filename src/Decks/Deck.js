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
  
  /*My ideas was that calling this component would let me display the different cards in a deck. But it can't map because deck is undefined. 
  If I reload the page and then add the code it works but then if I reload again it breaks. I think what is happening is the useEffect
  isn't completing before I call this component*/
  const cardItems = <CardList deck={deck}/>
 

  return (
    <div>
      {deckItem}
      <br></br>
      <h1>Cards</h1>
      {cardItems}
    </div>
  );
}

export default Deck;
