import Deck from "../models/Deck.js";

export async function createCardForDeckController(req, res) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);

    if(!deck) return res.status(400).send("no deck of this ID exists");

    const { text } = req.body;
    deck.cards.push(text);
    await deck.save();
   
    res.json(deck);
}
