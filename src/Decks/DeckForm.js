import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { createDeck } from "../utils/api";

function DeckForm() {
  const initialRender = {
    id: "",
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialRender);

  const handleChange = ({ target }) => {
    console.log(target);
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createDeck(formData);
    setFormData(initialRender);
  };

  return (
    <form name="create" onSubmit={handleSubmit}>
      <h1>Create Deck</h1>
      <br />
      <h3>Name</h3>
      <textarea
        id="name"
        name="name"
        placeholder="Deck Name"
        onChange={handleChange}
        value={formData.name}
      ></textarea>
      <br />
      <textarea
        id="description"
        name="description"
        placeholder="Brief description of the deck"
        onChange={handleChange}
        value={formData.description}
      ></textarea>
      <br />
      <Link to={"/"}>
        <button>Cancel</button>
      </Link>
      <button type="submit">Submit</button>
    </form>
  );
}

export default DeckForm;
