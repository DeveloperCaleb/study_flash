import React, { useEffect, useState } from "react";
import { Card, Breadcrumb } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";
import CardList from "../Cards/CardList";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import DeckInformation from "./DeckInformation";
import "./Deck.css";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});

  //When the page first renders get the data of the deck with deckId from the DB and setDeck to it. Also set the cards to be the currentDecks cards array.
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);

      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  return (
    <>
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active="false">{deck?.name}</Breadcrumb.Item>
        </Breadcrumb>
        {<DeckInformation deck={deck} />}
        <br></br>
        <h1>Cards</h1>
        <CardList cards={deck.cards || []} deckId={deckId} />
      </div>
    </>
  );
}

export default Deck;
