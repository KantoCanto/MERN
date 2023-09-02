import { API_URL } from "./config";

export async function getDeck(deckId){
    const response = await fetch(`${API_URL}/decks/${deckId}`);
    return response.json();
}