import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

function App() {

  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState([]);

  async function handleCreateDeck(e){
    e.preventDefault();
    const response = await fetch("http://localhost:3000/decks",{
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });
    setTitle("");
    const deck = await response.json();
    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId){
     await fetch(`http://localhost:3000/decks/${deckId}`, {
       method: "DELETE",
     });
     //optimistic uptdates -> goes through the decks array and detele the one that we just manually deleted
     setDecks(decks.filter(deck => deck._id !== deckId));
  }

  useEffect(() => {
   
    async function fetchDeck() {
      const response = await fetch("http://localhost:3000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }

    fetchDeck();
  }, []);


  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => 
            <li key={deck._id}>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
              {deck.title}</li>
          )}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title: </label>
        <input id="deck-title" 
          value = { title }
          onChange={(e) =>{ 
            setTitle(e.target.value)
          }}/>
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
