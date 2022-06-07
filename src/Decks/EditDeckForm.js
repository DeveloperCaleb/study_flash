import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Breadcrumb from "../Layout/BreadCrumb";
import { readDeck, updateDeck } from "../utils/api";

function EditDeckForm() {
  const { deckId } = useParams();
  const history = useHistory();

  const [crumbs, setCrumbs] = useState([]);
  const [deck, setDeck] = useState({});

  //Get deck data on initial render
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);

      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  useEffect(() => {
    function loadCrumbs() {
      setCrumbs(["Home", `${deck.name}`, "Edit Deck"]);
    }
    loadCrumbs();
  }, [deck]);

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
      <form name="editDeck" onSubmit={handleSubmit}>
        <h1>Edit Deck</h1>
        <br />
        <h3>Name</h3>
        <br />
        <textarea
          rows={3}
          cols={120}
          id="name"
          name="name"
          onChange={handleChange}
          value={deck.name}
        ></textarea>
        <br />
        <textarea
          rows={5}
          cols={120}
          id="description"
          name="description"
          onChange={handleChange}
          value={deck.description}
        ></textarea>
        <br />
        <a href={`/decks/${deckId}`}>
          <button>Cancel</button>
        </a>
        <button className="editDeckSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeckForm;
