import Deck from "../models/Deck.js";

export async function deleteDeckController(req, res) {
  //TODO:
  //1. get the deck id from the url
  const deckId = req.params.deckId;
  //2. delete the deck from mongo
  const deck = await Deck.findByIdAndDelete(deckId);
  //3. return the deleted deck to the user who made the request
  res.json(deck);
}
