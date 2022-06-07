import React, { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import Breadcrumb from "../Layout/BreadCrumb";
import { createCard, readDeck, readCard, updateCard } from "../utils/api";
import EditCardForm from "./EditCardForm";
import CreateCardForm from "./CreateCardForm";

function CardForm() {
  console.log(useRouteMatch());
  const { path } = useRouteMatch;
  console.log(path);

  if (path === "/decks/:deckId/cards/new") {
    return <CreateCardForm />;
  } else {
    return <EditCardForm />;
  }
}

export default CardForm;
