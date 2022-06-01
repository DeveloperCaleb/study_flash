import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";

function StudyDeck() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);

      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  if (deck.cards.length < 3) {
    return (
      <div>
        <p>
          You need at least 3 cards to study. There are {`${deck.cards.length}`}
          in this deck
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
        <StudyCard cards={deck.cards} />
      </div>
    );
  }
}

export default StudyDeck;
