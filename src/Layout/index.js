import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckInfo from "../Decks/DeckInfo";
import DeckList from "../Decks/DeckList";
import CreateDeckForm from "../Decks/CreateDeckForm";
import StudyDeck from "../Study/StudyDeck";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState({});

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>
          <Route path={"/decks/new"}>
            <CreateDeckForm />
          </Route>
          <Route path={"/decks/:deckId"}>
            <DeckInfo
              deck={deck}
              cards={cards}
              setDeck={setDeck}
              setCards={setCards}
              card={card}
              setCard={setCard}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
