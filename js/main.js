var deck = new Deck();

deck.shuffle();
updateDisplayDeck();

// update the #deck div to have the contents of the deck object
function updateDisplayDeck() {
  const deckStr = deck.cards.map(c => c.toString()).join(", ");

  d3.select("#deck")
    .html(deckStr);
}

// get a fresh deck -- it will start off unshuffled
function newDeck() {
  deck = new Deck();

  d3.select("#actions")
    .append("li")
    .text("A fresh deck was just brought in")

  updateDisplayDeck();
}

// shuffle the deck and update the DOM
function shuffleDeck() {
  deck.shuffle();

  d3.select("#actions")
    .append("li")
    .text("The deck was shuffled");

  updateDisplayDeck();
}

// deal the first numCards of the deck and update the DOM
function dealCards(numCards) {
  var displayMsg;

  // the deck might not have enough cards
  try {
    const dealtCards = deck.dealCards(numCards);
    const cardsStr = dealtCards.map(c => c.toString()).join(", ");
    displayMsg = "The following cards were dealt: " + cardsStr;
  }  catch (err) {
    displayMsg = err.message;
  }

  d3.select("#actions")
    .append("li")
    .html(displayMsg);

  updateDisplayDeck();
}
