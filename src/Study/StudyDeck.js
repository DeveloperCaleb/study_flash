import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NeedCards from "./NeedCards";
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

  if (deck?.cards?.length < 3) {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`/decks/${deckId}`}>
            {deck?.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active="false">Study</Breadcrumb.Item>
        </Breadcrumb>
        <NeedCards cards={deck.cards} />
      </div>
    );
  } else {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href={`/decks/${deckId}`}>
            {deck?.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item active="false">Study</Breadcrumb.Item>
        </Breadcrumb>
        <StudyCard deck={deck} cards={deck.cards || []} />
      </div>
    );
  }
}

export default StudyDeck;
