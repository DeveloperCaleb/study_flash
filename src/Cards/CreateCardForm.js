import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Route, Switch, useParams } from "react-router-dom";
import { createCard } from "../utils/api";

function CreateCardForm({ deck }) {
  const { deckId } = useParams();

  const initialRender = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [cardFormData, setCardFormData] = useState(initialRender);

  const handleChange = ({ target }) => {
    setCardFormData({
      ...cardFormData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, cardFormData);
    setCardFormData(initialRender);
  };

  return (
    <>
      <form name="createCard" onSubmit={handleSubmit}>
        <h1>{`${deck.name}`}: Add Card</h1>
        <br />
        <h3>Front</h3>
        <br />
        <textarea
          id="front"
          name="front"
          placeholder="Front side of card"
          onChange={handleChange}
          value={cardFormData.front}
        ></textarea>
        <br />
        <textarea
          id="back"
          name="back"
          placeholder="Back side of card"
          onChange={handleChange}
          value={cardFormData.back}
        ></textarea>
        <br />
        <Link to={`/decks/${deckId}`}>
          <button>Done</button>
        </Link>
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default CreateCardForm;
