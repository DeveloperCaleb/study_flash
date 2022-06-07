import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api/index";
import DeckListing from "./DeckListing";

function DeckList() {
  const [decks, setDecks] = useState([]);

  //Load all decks on initial render.
  useEffect(() => {
    async function getDecks() {
      const response = await listDecks();

      setDecks(response);
    }
    getDecks();
  }, []);

  return (
    <div>
      <a href={`/decks/new`}>
        <button className="createDeck">Create Deck</button>
      </a>
      <DeckListing decks={decks} />
    </div>
  );
}

export default DeckList;
