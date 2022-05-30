import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "../Decks/Deck";
import DeckList from "../Decks/DeckList";
import DeckForm from "../Decks/DeckForm";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <DeckForm />
      </div>
    </>
  );
}

export default Layout;
