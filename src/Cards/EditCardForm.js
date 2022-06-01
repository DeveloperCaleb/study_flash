import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../utils/api";

function EditCardForm() {
  const { cardId, deckId } = useParams();
  const history = useHistory();

  const [card, setCard] = useState({});

  //The selected card data is loaded.
  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId);

      setCard(response);
    }

    loadCard();
  }, [cardId]);

  //editCardDataForm is set to be the information of the card. This allows for the text area to have the current data for editing.

  //When a textarea is changed the value editCardDataForm is updated.
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  //On submit update the card and return to the deck page.
  const handleSubmit = (event) => {
    event.preventDefault();
    updateCard(card);
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
        value={card.front}
      ></textarea>
      <br />
      <h3>Back</h3>
      <br />
      <textarea
        name="back"
        id="back"
        onChange={handleChange}
        value={card.back}
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
