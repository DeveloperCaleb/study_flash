import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api";

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
    <form name="editDeck" onSubmit={handleSubmit}>
      <h1>Edit Deck</h1>
      <br />
      <h3>Name</h3>
      <br />
      <textarea
        id="name"
        name="name"
        onChange={handleChange}
        value={deck.name}
      ></textarea>
      <br />
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        value={deck.description}
      ></textarea>
      <br />
      <Link to={`/decks/${deckId}`}>
        <button>Cancel</button>
      </Link>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditDeckForm;
