import Deck from "../models/Deck.js";

export async function getDecksController(req, res) {
  //TODO fetch all decks and send them back to the user
  //1 - how do we fetch the decks from mongo?
  const decks = await Deck.find();
  //2 - how do we send back the array to the UI
  res.json(decks);
}
