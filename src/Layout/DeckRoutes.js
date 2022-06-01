import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Deck from "../Decks/Deck";
import CreateCardForm from "../Cards/CreateCardForm";
import EditDeckForm from "../Decks/EditDeckForm";
import NotFound from "./NotFound";
import EditCardForm from "../Cards/EditCardForm";
import StudyDeck from "../Study/StudyDeck";

function DeckRoutes() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <Deck />
      </Route>
      <Route path={`${path}/cards/new`}>
        <CreateCardForm />
      </Route>
      <Route path={`${path}/edit`}>
        <EditDeckForm />
      </Route>
      <Route path={`${path}/cards/:cardId/edit`}>
        <EditCardForm />
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
