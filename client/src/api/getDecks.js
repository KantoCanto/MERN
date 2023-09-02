import { API_URL } from "./config";

export async function getDecks(){
    const response = await fetch(`${API_URL}/decks`);
    return response.json();
}