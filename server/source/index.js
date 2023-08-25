//handling .env
import 'dotenv/config';

//variable that holds the port number
const PORT = 3000;

//importing mongoose
import mongoose from 'mongoose';

//import the models
import DeckModel from "./models/Deck.js";

//importing express and creating app
import express from 'express';
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

//connection to the specific flashcardproject db
//mongoose.connect() is a <promise>
mongoose.connect(process.env.MONGO_URL).then(() =>{ 
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
})


