//handling .env
import 'dotenv/config';
//variable that holds the port number
const PORT = 3000;
//importing mongoose
import mongoose from 'mongoose';
//import cors
import cors from "cors";
//importing express and creating app
import express from 'express';
//import routes
import { getDecksController } from './controllers/getDecksController.js';
import { createDeckController } from './controllers/createDeckController.js';
import { deleteDeckController } from './controllers/deleteDeckController.js';
import { getDeckController } from './controllers/getDeckController.js';
import { createCardForDeckController } from './controllers/createCardForDeckController.js';
import { deleteCardOnDeckController } from './controllers/deleteCardOnDeckController.js';

const app = express();

//express.json() is a middleware function. here we tell express to use this.
//everytime someone makes a request to our API, it's going to first run wtv this code is
//use cors to avoid the browser throwing cors errors when running locally
app.use(cors("*"));
app.use(express.json());


//endpoint responsible for fetching the created decks and presenting them to the user
app.get("/decks", getDecksController);
//routing for  /decks path
app.post("/decks", createDeckController);
//creting a delete endpoint
app.delete("/decks/:deckId", deleteDeckController);

//
app.get("/decks/:deckId", getDeckController);
//endpoint for creating card in specific deck
app.post("/decks/:deckId/cards", createCardForDeckController);
//
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

//connection to the specific flashcardproject db
//mongoose.connect() is a <promise>
mongoose.connect(process.env.MONGO_URL).then(() =>{ 
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
})


