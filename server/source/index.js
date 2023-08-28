//handling .env
import 'dotenv/config';

//variable that holds the port number
const PORT = 3000;

//importing mongoose
import mongoose from 'mongoose';

//import cors
import cors from "cors";

//import the models
import Deck from "./models/Deck.js";

//importing express and creating app
import express from 'express';
const app = express();

//express.json() is a middleware function. here we tell express to use this.
//everytime someone makes a request to our API, it's going to first run wtv this code is
//use cors to avoid the browser throwing cors errors when running locally
app.use(cors("*"));
app.use(express.json());

//routing for  /decks path
app.post("/decks", async (req, res) => {
  //here we want to be able to create a new deck model and persist that onto our database
  const newDeck = new Deck({
    title: req.body.title,
  });
  //this still doesn't communicate to our database, so we need to save it:
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
})

//routing for requests on root path
app.get("/", (req, res) => {
  res.send("Hello World");
});

//connection to the specific flashcardproject db
//mongoose.connect() is a <promise>
mongoose.connect(process.env.MONGO_URL).then(() =>{ 
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
})


