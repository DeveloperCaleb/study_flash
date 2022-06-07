import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../Layout/BreadCrumb";
import { createCard, readCard, readDeck, updateCard } from "../utils/api";

function CardForm() {
  const params = useParams();

  const history = useHistory();

  const [crumbs, setCrumbs] = useState([]);
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});

  const initialRender = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [cardFormData, setCardFormData] = useState(initialRender);

  useEffect(() => {
    if (params.cardId) {
      async function loadCard() {
        const response = await readCard(params.cardId);

        setCard(response);
      }
      loadCard();
    }

    async function loadDeck() {
      const response = await readDeck(params.deckId);
      setDeck(response);
    }

    loadDeck();
  }, [params.cardId, params.deckId]);

  useEffect(() => {
    function loadCrumbs() {
      if (params.cardId) {
        setCrumbs(["Home", `${deck.name}`, `Edit Card ${params.cardId}`]);
      } else {
        setCrumbs(["Home", `${deck.name}`, "Add Card"]);
      }
    }
    loadCrumbs();
  }, [deck, params.cardId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const handleSubmitNew = (event) => {
    event.preventDefault();
    createCard(params.deckId, cardFormData);
    setCardFormData(initialRender);
  };

  const handleSubmitUpdate = (event) => {
    event.preventDefault();
    updateCard(card);
    history.go(-1);
  };

  const selectedCrumb = (crumb) => {
    if (crumb === "Home") {
      history.push("/");
    } else {
      history.push(`/decks/${params.deckId}`);
    }
  };

  return (
    <div>
      <Breadcrumb crumbs={crumbs} selected={selectedCrumb} />
      <form
        name="editCard"
        onSubmit={params.cardId ? handleSubmitUpdate : handleSubmitNew}
      >
        <h1>Edit Card</h1>
        <br />
        <h3>Front</h3>
        <textarea
          cols={120}
          rows={3}
          name="front"
          id="front"
          onChange={handleChange}
          value={params.cardId ? card.front : cardFormData.front}
        ></textarea>
        <br />
        <h3>Back</h3>
        <textarea
          cols={120}
          rows={3}
          name="back"
          id="back"
          onChange={handleChange}
          value={params.cardId ? card.back : cardFormData.back}
        ></textarea>
        <br />
        <a href={`/decks/${params.deckId}`}>
          <button>{params.cardId ? "Cancel" : "Done"}</button>
        </a>
        <button className="editCardSubmit" type="submit">
          {params.cardId ? "Submit" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
