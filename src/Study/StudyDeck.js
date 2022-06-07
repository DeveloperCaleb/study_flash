import React, { useEffect, useState } from "react";
import Breadcrumb from "../Layout/BreadCrumb";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import NeedCards from "./NeedCards";
import StudyCard from "./StudyCard";

function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const [crumbs, setCrumbs] = useState([]);
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);

      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  useEffect(() => {
    function loadCrumbs() {
      setCrumbs(["Home", `${deck.name}`, "Study"]);
    }
    loadCrumbs();
  }, [deck]);

  const selectedCrumb = (crumb) => {
    if (crumb === "Home") {
      history.push("/");
    } else {
      history.push(`/decks/${deckId}`);
    }
  };

  if (deck && deck.cards && deck.cards.length < 3) {
    return (
      <div>
        <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
        <NeedCards cards={deck.cards} />
      </div>
    );
  } else {
    return (
      <div>
        <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
        <StudyCard deck={deck} cards={deck.cards || []} />
      </div>
    );
  }
}

export default StudyDeck;
