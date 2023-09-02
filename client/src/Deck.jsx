import { useState, useEffect} from "react";
import { getDeck } from "./api/getDeck";
import { useParams } from "react-router-dom";
import { createCard } from "./api/createCard";
import { deleteCard} from "./api/deleteCard";
import "./Deck.css"

export default function Deck() {

    const [deck, setDeck] = useState("");
    const [cards, setCards] = useState([]);
    const [text, setText] = useState("");
    const { deckId } = useParams();

  async function handleCreateDeck(e) {
    e.preventDefault();
    const {cards: serverCards} = await createCard(deckId, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index) {
    if(!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  useEffect(() => {
    async function fetchDeck() {
      if(!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards);
    }

    fetchDeck();
  }, [deckId]);


  return (
    <div className="Deck">
        <h1>{deck?.title}</h1>
        <ul className="cards">
            {cards.map((card, index) => (
            <li key={index}>
                <button onClick={() => handleDeleteCard(index)}>X</button>
                {card}
            </li>
            ))}
        </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-text">Card Text: </label>
        <input
          id="card-text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button>Create Card</button>
      </form>
    </div>
  );
}
