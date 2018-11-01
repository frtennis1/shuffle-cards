enum Suit {Diamonds, Hearts, Clubs, Spades}

class Card {
  static valueMappings = {1: "A", 11: "J", 12: "Q", 13: "K"}

  static suitMappings = {
    Diamonds : "&diams;",
    Hearts   : "&hearts;",
    Clubs    : "&clubs;",
    Spades   : "&spades;"}

  constructor(public suit:string, public value:number) {}

  public toString() : string {
    const suitString : string = Card.suitMappings[this.suit]
    const valueString : string = Card.valueMappings[this.value] || this.value

    return valueString + suitString
  }


}

class Deck {
  cards : Card[];

  // initializes the deck with cards in predictable order
  constructor () {
    this.cards = [];
    for (let suit in Suit) {
      // hacky way to iterate through enum, see
      // https://stackoverflow.com/questions/39372804/typescript-how-to-loop-through-enum-values-for-display-in-radio-buttons
      if (isNaN(Number(suit))) {
        for (let i = 1; i <= 13; i ++) {
          this.cards.push(new Card(suit, i));
        }
      }
    }
  }

  // shuffles the deck cards in-place uniformly at random
  // no return value
  shuffle () {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  // returns n cards which are removed from the deck
  // if the deck has fewer than n cards, throws an exception
  dealCards(n : number):Card[] {
    if (n > this.cards.length) {
      throw new Error('Deck did not have enough cards')
    }
    return this.cards.splice(0,n)
  }
}

