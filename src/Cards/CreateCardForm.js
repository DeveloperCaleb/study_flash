import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumb } from "react-bootstrap";
import { createCard, readDeck } from "../utils/api";
import "./CreateCardForm.css";

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
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href={`/decks/${deckId}`}>{deck.name}</Breadcrumb.Item>
        <Breadcrumb.Item active="false">Add Card</Breadcrumb.Item>
      </Breadcrumb>
      <form name="createCard" onSubmit={handleSubmit}>
        <h1>{`${deck.name}`}: Add Card</h1>
        <br />
        <h3>Front</h3>
        <br />
        <textarea
          cols={120}
          rows={3}
          id="front"
          name="front"
          placeholder="Front side of card"
          onChange={handleChange}
          value={cardFormData.front}
        ></textarea>
        <br />
        <br />
        <h3>Back</h3>
        <br />
        <textarea
          cols={120}
          rows={3}
          id="back"
          name="back"
          placeholder="Back side of card"
          onChange={handleChange}
          value={cardFormData.back}
        ></textarea>
        <br />
        <Link to={`/decks/${deckId}`}>
          <button className="done">Done</button>
        </Link>
        <button className="save" type="submit">
          Save
        </button>
      </form>
    </>
  );
}

export default CreateCardForm;
