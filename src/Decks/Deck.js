import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardList from "../Cards/CardList";

function Deck({ deck, setDeck, cards, setCards }) {
  //Set initial hook to an empty array

  const deckId = useParams().deckId;

  //When the page first renders get the data of the deck with id ${deckId} from the DB and setDeck to it
  useEffect(() => {
    async function loadDeck() {
      const response = readDeck(deckId);
      const currentDeck = await response;

      setDeck(currentDeck);
      setCards(currentDeck.cards);
    }
    loadDeck();
  }, []);

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

  //set cardItems to the CardList component with the current deck being the prop
  //I think this is where I am having the problem. If I add {cardItems} to the return after the deck is initially set it is no problem but if I reload the page breaks.
  const cardItems = <CardList cards={cards} deckId={deckId} />;

  return (
    <>
      <div>
        {deckItem}
        <br></br>
        <h1>Cards</h1>
        {cardItems}
      </div>
    </>
  );
}

export default Deck;
