import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Route, Switch, useParams } from "react-router-dom";
import StudyCard from "./StudyCard";
import { useEffect } from "react";
import { readDeck } from "../utils/api";

function StudyDeck({ deck, cards, setCards, setDeck, card, setCard }) {
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const response = readDeck(deckId);
      const currentDeck = await response;

      setDeck(currentDeck);
      setCards(currentDeck.cards);
    }
    loadDeck();
  }, []);

  if (cards.length < 3) {
    return (
      <div>
        <p>
          You need at least 3 cards to study. There are {`${cards.length}`} in
          this deck
        </p>
        <br />
        <Link to={`/decks/${deckId}/cards/new`}>
          <button>Add Cards</button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <StudyCard cards={cards} card={card} setCard={setCard} deck={deck} />
      </div>
    );
  }
}

export default StudyDeck;
