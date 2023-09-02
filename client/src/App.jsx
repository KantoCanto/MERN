import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { getDecks } from "./api/getDecks";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";

function App() {

  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState([]);

  async function handleCreateDeck(e){
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId){
     await deleteDeck(deckId);
     //optimistic uptdates -> goes through the decks array and detele the one that we just manually deleted
     setDecks(decks.filter(deck => deck._id !== deckId));
  }

  useEffect(() => {
   
    async function fetchDeck() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }

    fetchDeck();
  }, []);


  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title: </label>
        <input
          id="deck-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
