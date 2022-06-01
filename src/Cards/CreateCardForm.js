import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function CreateCardForm() {
  const { deckId } = useParams();

  const [deck, setDeck] = useState({});

  const initialRender = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);

      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  const [cardFormData, setCardFormData] = useState(initialRender);

  //When a change is made to the text area card formdata is set to match the target.
  const handleChange = ({ target }) => {
    setCardFormData({
      ...cardFormData,
      [target.name]: target.value,
    });
  };

  //When form is submitted a new card is created and cardFormData is reset to be blank.
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
