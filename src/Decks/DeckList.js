import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import DeckCard from "../Cards/DeckCard";
import { listDecks } from "../utils/api/index";
import "./DeckList.css";

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

  return (
    <div>
      <Link to={`/decks/new`}>
        <button className="createDeck">
          <FaPlus />
          {` Create Deck`}
        </button>
      </Link>
      <DeckCard decks={decks} />
    </div>
  );
}

export default DeckList;
