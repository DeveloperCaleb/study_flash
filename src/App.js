import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./Layout/NotFound";
import { CreateDeck, Deck } from "./Decks";
import StudyDeck from "./Study/StudyDeck";

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  return (
    <div className="app-routes">
      <Switch>
        <Route exact path="/">
          <Layout />
        </Route>
        <Route path={"/decks/new"}>
          <CreateDeck />
        </Route>
        <Route path={"decks/:deckId/study"}>
          <StudyDeck />
        </Route>
        <Route path={"decks/:deckId"}>
          <Deck />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
