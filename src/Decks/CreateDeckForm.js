import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, listDecks } from "../utils/api";
import { Breadcrumb } from "react-bootstrap";
import "./CreateDeckForm.css";

function CreateDeckForm() {
  const history = useHistory();
  const initialRender = {
    id: "",
    name: "",
    description: "",
  };

  const [deckFormdata, setDeckFormdata] = useState(initialRender);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();

      setDecks(response);
    }
    loadDecks();
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

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active="false">Create Deck</Breadcrumb.Item>
      </Breadcrumb>
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
        <Link to={"/"}>
          <button>Cancel</button>
        </Link>
        <button className="createDeckSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeckForm;
