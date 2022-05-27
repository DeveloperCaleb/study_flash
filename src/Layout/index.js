import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Deck from "../Decks/Deck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Deck />
      </div>
    </>
  );
}

export default Layout;
