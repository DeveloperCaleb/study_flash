import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api";

function EditDeckForm({ deck, setDeck }) {
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const response = readDeck(deckId);
      const currentDeck = await response;

      setDeck(currentDeck);
    }
    loadDeck();
  }, []);

  const [editDeckFormData, setEditDeckFormData] = useState(deck);

  const handleChange = ({ target }) => {
    setEditDeckFormData({
      ...editDeckFormData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(editDeckFormData);
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
        value={editDeckFormData.name}
      ></textarea>
      <br />
      <textarea
        id="description"
        name="description"
        onChange={handleChange}
        value={editDeckFormData.description}
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
