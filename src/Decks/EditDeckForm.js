import React, { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api";
import "./EditDeckForm.css";

function EditDeckForm() {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});

  //Get deck data on initial render
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);

      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  //On change update the deck data.
  const handleChange = ({ target }) => {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  };

  //On submit update the deck and return to the deck screen.
  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deck);
    history.go(-1);
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/decks/${deckId}`}>
          {deck?.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item active="false">Edit Deck</Breadcrumb.Item>
      </Breadcrumb>
      <form name="editDeck" onSubmit={handleSubmit}>
        <h1>Edit Deck</h1>
        <br />
        <h3>Name</h3>
        <br />
        <textarea
          rows={3}
          cols={120}
          id="name"
          name="name"
          onChange={handleChange}
          value={deck.name}
        ></textarea>
        <br />
        <textarea
          rows={5}
          cols={120}
          id="description"
          name="description"
          onChange={handleChange}
          value={deck.description}
        ></textarea>
        <br />
        <Link to={`/decks/${deckId}`}>
          <button>Cancel</button>
        </Link>
        <button className="editDeckSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeckForm;
