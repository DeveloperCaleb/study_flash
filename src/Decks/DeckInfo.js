import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Deck from "./Deck";
import CreateCardForm from "../Cards/CreateCardForm";
import EditDeckForm from "./EditDeckForm";
import NotFound from "../Layout/NotFound";
import EditCardForm from "../Cards/EditCardForm";
import StudyDeck from "../Study/StudyDeck";

function DeckInfo({ deck, cards, card, setDeck, setCards, setCard }) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Deck deck={deck} cards={cards} setDeck={setDeck} setCards={setCards} />
      </Route>
      <Route path={`${path}/cards/new`}>
        <CreateCardForm deck={deck} />
      </Route>
      <Route path={`${path}/edit`}>
        <EditDeckForm
          deck={deck}
          cards={cards}
          setDeck={setDeck}
          setCards={setCards}
        />
      </Route>
      <Route path={`${path}/cards/:cardId/edit`}>
        <EditCardForm card={card} setCard={setCard} />
      </Route>
      <Route path={"/decks/:deckId/study"}>
        <StudyDeck
          deck={deck}
          cards={cards}
          card={card}
          setDeck={setDeck}
          setCards={setCards}
          setCard={setCard}
        />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default DeckInfo;
