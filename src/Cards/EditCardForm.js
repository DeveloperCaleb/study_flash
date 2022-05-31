import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCardForm({ card, setCard }) {
  const { cardId, deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadCard() {
      const response = readCard(cardId);
      const currentCard = await response;

      setCard(currentCard);
    }
    loadCard();
  }, []);

  const [editCardDataForm, setEditCardDataForm] = useState(card);

  const handleChange = ({ target }) => {
    setEditCardDataForm({
      ...editCardDataForm,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(editCardDataForm);
    history.go(-1);
  };

  return (
    <form name="editCard" onSubmit={handleSubmit}>
      <h1>Edit Card</h1>
      <br />
      <h3>Front</h3>
      <br />
      <textarea
        name="front"
        id="front"
        onChange={handleChange}
        value={editCardDataForm.front}
      ></textarea>
      <br />
      <h3>Back</h3>
      <br />
      <textarea
        name="back"
        id="back"
        onChange={handleChange}
        value={editCardDataForm.back}
      ></textarea>
      <br />
      <Link to={`/decks/${deckId}`}>
        <button>Cancel</button>
      </Link>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditCardForm;
