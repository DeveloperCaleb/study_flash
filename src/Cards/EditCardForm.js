import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../Layout/BreadCrumb";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCardForm() {
  const { cardId, deckId } = useParams();
  const history = useHistory();

  const [crumbs, setCrumbs] = useState([]);
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});

  //The selected card data is loaded.
  useEffect(() => {
    async function loadCard() {
      const response = await readCard(cardId);

      setCard(response);
    }

    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }

    loadCard();
    loadDeck();
  }, [cardId, deckId]);

  useEffect(() => {
    function loadCrumbs() {
      setCrumbs(["Home", `${deck.name}`, `Edit Card ${cardId}`]);
    }
    loadCrumbs();
  }, [deck, cardId]);

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

  const selectedCrumb = (crumb) => {
    if (crumb === "Home") {
      history.push("/");
    } else {
      history.push(`/decks/${deckId}`);
    }
  };

  return (
    <div>
      <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
      <form name="editCard" onSubmit={handleSubmit}>
        <h1>Edit Card</h1>
        <br />
        <h3>Front</h3>
        <textarea
          cols={120}
          rows={3}
          name="front"
          id="front"
          onChange={handleChange}
          value={card.front}
        ></textarea>
        <br />
        <h3>Back</h3>
        <textarea
          cols={120}
          rows={3}
          name="back"
          id="back"
          onChange={handleChange}
          value={card.back}
        ></textarea>
        <br />
        <a href={`/decks/${deckId}`}>
          <button>Cancel</button>
        </a>
        <button className="editCardSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCardForm;
