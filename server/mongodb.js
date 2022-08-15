const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost/cards`);

let cardSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  value: String,
  suit: String,
  image: String
});

let Card = mongoose.model('Card', cardSchema);

let create = (card) => {
  var currentCard = new Card ({
    code: card.code,
    value: card.value,
    suit: card.suit,
    image: card.image
  })
  return currentCard.save()
  // console.log('db', card)
  // return 'this works';
}

let read = () => {
  return Card.find({})
}

module.exports.create = create;
module.exports.read = read;