import React from "react";
import { useHistory } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardList({ cards, deckId }) {
  const history = useHistory();

  //Will ask for confirmation and then delete the selected card on click and then refresh the page.
  const handleClick = ({ target }) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it")
    ) {
      deleteCard(target.id);
      history.go(0);
    }
  };

  //Creates card element for every card.
  const cardList = cards.map((card, index) => {
    return (
      <div key={index} className="card">
        <div className="card-body" key={cards.indexOf(card)}>
          <p className="card.text">{card.front}</p>
          <p className="card.text">{card.back}</p>
          <a href={`/decks/${deckId}/cards/${card.id}/edit`}>
            <button className="editCard">Edit</button>
          </a>
          <button
            className="deleteCardButton"
            type="button"
            id={`${card.id}`}
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return cardList;
}

export default CardList;
