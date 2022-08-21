const express = require("express");
const cors = require('cors');

const app = express();

const db = require('./mongodb.js');

const axios = require('axios');

app.use(express.json());
app.use(cors());

let currentDeck = [];

app.get('/cards', (req, res) => {
  db.read()
  .then((response) => {
    var temp = response.slice();
    currentDeck = temp;
    res.send(response);
  })
  .catch((err) => {
    console.log(err);
  })
});

app.get('/draw', (req, res) => {
  var randomIndex = Math.floor(Math.random() * (currentDeck.length-1))
  res.send(currentDeck[randomIndex]);
  currentDeck.splice(randomIndex,1);
});


app.listen(3000, () => {
  console.log("listening on port 3000");
});

// app.get('/cards', (req, res) => {
//   console.log('from react-native');
//   axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then((response) => {
//       console.log('server cards', response.data.deck_id);
//       res.send(response.data.deck_id);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// });

//LOAD DATA INTO DB FROM API

// app.post('/cards', (req, res) => {
//   axios.get(`http://deckofcardsapi.com/api/deck/${req.body.data}/draw/?count=1`)
//   .then((response) => {
//     db.create(response.data.cards[0])
//     .then((response) => {
//       console.log(response);
//       res.send(response);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// });