import React, { useEffect, useState } from "react";
import Breadcrumb from "../Layout/BreadCrumb";
import { useHistory, useParams } from "react-router-dom";
import CardList from "../Cards/CardList";
import { readDeck } from "../utils/api/index";

import DeckInformation from "./DeckInformation";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [crumbs, setCrumbs] = useState([]);
  const [deck, setDeck] = useState({});

  //When the page first renders get the data of the deck with deckId from the DB and setDeck to it. Also set the cards to be the currentDecks cards array.
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);

      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  useEffect(() => {
    function loadCrumbs() {
      setCrumbs(["Home", `${deck.name}`]);
    }
    loadCrumbs();
  }, [deck]);

  const selectedCrumb = (crumb) => {
    history.push("/");
  };

  return (
    <div>
      <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
      {<DeckInformation deck={deck} />}
      <br></br>
      <h1>Cards</h1>
      <CardList cards={deck.cards || []} deckId={deckId} />
    </div>
  );
}

export default Deck;
