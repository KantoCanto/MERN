import Deck from "../../models/Deck.js";

export async function createDeckController(req, res) {
  //here we want to be able to create a new deck model and persist that onto our database
  const newDeck = new Deck({
    title: req.body.title,
  });
  //this still doesn't communicate to our database, so we need to save it:
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
}
