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
mongoose.connect(
  "mongodb+srv://flascardproject:4uavobNvUDT1BkEH@cluster0.u5j5yv9.mongodb.net/?retryWrites=true&w=majority"
).then(() =>{ 
    console.log(`listening on port ${PORT}`)
    app.listen(PORT);
})


