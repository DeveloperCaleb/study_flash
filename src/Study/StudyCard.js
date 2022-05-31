import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { readCard } from "../utils/api";

function StudyCard({ cards, card, setCard, deck }) {
  let counter = 0;
  const [cardData, setCardData] = useState("");

  useEffect(() => {
    async function loadCard() {
      const response = readCard(cards[counter].id);
      const currentCard = await response;
      setCard(currentCard);
    }
    loadCard();
  }, [cardData]);

  console.log(card);
  cardData = card.front;

  const handleFlip = ({ target }) => {
    cardData = card.back;
    console.log(cardData);
  };

  return (
    <div>
      <h1>{`${deck.name}:`} Study</h1>
      <Card.Body>
        <Card.Title>
          Card {counter + 1} of {cards.length}
        </Card.Title>
        <Card.Text>{cardData}</Card.Text>
        <button type="button" onClick={handleFlip}>
          Flip
        </button>
      </Card.Body>
    </div>
  );
}

export default StudyCard;
