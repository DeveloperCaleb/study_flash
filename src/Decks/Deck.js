import React from "react";
import { Route, Switch } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Deck() {
  const currentDeck = readDeck(1);

  return <p>This is a deck {currentDeck.description}</p>;
}

export default Deck;
