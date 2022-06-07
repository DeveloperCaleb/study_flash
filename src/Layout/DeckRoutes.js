import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Deck from "../Decks/Deck";
import EditDeckForm from "../Decks/EditDeckForm";
import NotFound from "./NotFound";
import StudyDeck from "../Study/StudyDeck";
import CardForm from "../Cards/CardForm";

function DeckRoutes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Deck />
      </Route>
      <Route path={`${path}/cards/new`}>
        <CardForm />
      </Route>
      <Route path={`${path}/edit`}>
        <EditDeckForm />
      </Route>
      <Route path={`${path}/cards/:cardId/edit`}>
        <CardForm />
      </Route>
      <Route path={"/decks/:deckId/study"}>
        <StudyDeck />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default DeckRoutes;
