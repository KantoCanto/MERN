import Deck from "../models/Deck.js"

export async function getDeckController(req,res){
    const {deckId} = req.params;
    const deck = await Deck.findById(deckId);
    res.json(deck);
}