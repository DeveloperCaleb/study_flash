import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeckForm() {
  const initialRender = {
    id: "",
    name: "",
    description: "",
  };

  const [deckFormdata, setDeckFormdata] = useState(initialRender);

  //When textareas change uodate the deckFormData with the changes.
  const handleChange = ({ target }) => {
    setDeckFormdata({
      ...deckFormdata,
      [target.name]: target.value,
    });
  };

  //When the form is submitted a new deck is created and the form is reset to be blank.
  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(deckFormdata);
    setDeckFormdata(initialRender);
  };

  return (
    <form name="createDeck" onSubmit={handleSubmit}>
      <h1>Create Deck</h1>
      <br />
      <h3>Name</h3>
      <textarea
        id="name"
        name="name"
        placeholder="Deck Name"
        onChange={handleChange}
        value={deckFormdata.name}
      ></textarea>
      <br />
      <textarea
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateDeckForm;
