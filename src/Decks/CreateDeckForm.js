import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Breadcrumb from "../Layout/BreadCrumb";
import { createDeck, listDecks } from "../utils/api";

function CreateDeckForm() {
  const history = useHistory();
  const initialRender = {
    id: "",
    name: "",
    description: "",
  };

  const [crumbs, setCrumbs] = useState([]);
  const [deckFormdata, setDeckFormdata] = useState(initialRender);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();

      setDecks(response);
    }
    loadDecks();
  }, []);

  useEffect(() => {
    function loadCrumbs() {
      setCrumbs(["Home", "Create Deck"]);
    }
    loadCrumbs();
  }, []);

  //When textareas change uodate the deckFormData with the changes.
  const handleChange = ({ target }) => {
    setDeckFormdata({
      ...deckFormdata,
      [target.name]: target.value,
    });
  };

  //When the form is submitted a new deck is created and user is taken to the new Deck's information page.
  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(deckFormdata);
    history.push(`/decks/${decks.length + 1}`);
  };

  const selectedCrumb = (crumb) => {
    history.push("/");
  };

  return (
    <div>
      <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />`
      <form name="createDeck" onSubmit={handleSubmit}>
        <h1>Create Deck</h1>
        <br />
        <h3>Name</h3>
        <input
          id="name"
          name="name"
          placeholder="Deck Name"
          onChange={handleChange}
          value={deckFormdata.name}
        ></input>
        <br />
        <textarea
          cols={120}
          rows={3}
          id="description"
          name="description"
          placeholder="Brief description of the deck"
          onChange={handleChange}
          value={deckFormdata.description}
        ></textarea>
        <br />
        <a href={"/"}>
          <button>Cancel</button>
        </a>
        <button className="createDeckSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeckForm;
