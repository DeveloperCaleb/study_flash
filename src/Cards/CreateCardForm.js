import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../Layout/BreadCrumb";
import { createCard, readDeck } from "../utils/api";

function CreateCardForm() {
  const history = useHistory();

  const { deckId } = useParams();

  const [crumbs, setCrumbs] = useState([]);
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
      console.log(response);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  useEffect(() => {
    function loadCrumbs() {
      setCrumbs(["Home", `${deck.name}`, "Add Card"]);
    }
    loadCrumbs();
  }, [deck]);

  const [cardFormData, setCardFormData] = useState(initialRender);

  //When a change is made to the text area card formdata is set to match the target.
  const handleChange = ({ target }) => {
    setCardFormData({
      ...cardFormData,
      [target.name]: target.value,
    });
  };

  const selectedCrumb = (crumb) => {
    if (crumb == "Home") {
      history.push("/");
    } else {
      history.push(`/decks/${deckId}`);
    }
  };

  //When form is submitted a new card is created and cardFormData is reset to be blank.
  const handleSubmit = (event) => {
    event.preventDefault();
    createCard(deckId, cardFormData);
    setCardFormData(initialRender);
  };

  return (
    <div>
      <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
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
        <a href={`/decks/${deckId}`}>
          <button className="done">Done</button>
        </a>
        <button className="save" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default CreateCardForm;
