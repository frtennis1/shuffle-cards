var Suit;
(function (Suit) {
    Suit[Suit["Diamonds"] = 0] = "Diamonds";
    Suit[Suit["Hearts"] = 1] = "Hearts";
    Suit[Suit["Clubs"] = 2] = "Clubs";
    Suit[Suit["Spades"] = 3] = "Spades";
})(Suit || (Suit = {}));
var Card = /** @class */ (function () {
    function Card(suit, value) {
        this.suit = suit;
        this.value = value;
    }
    Card.prototype.toString = function () {
        var suitString = Card.suitMappings[this.suit];
        var valueString = Card.valueMappings[this.value] || this.value;
        return valueString + suitString;
    };
    Card.valueMappings = { 1: "A", 11: "J", 12: "Q", 13: "K" };
    Card.suitMappings = {
        Diamonds: "&diams;",
        Hearts: "&hearts;",
        Clubs: "&clubs;",
        Spades: "&spades;"
    };
    return Card;
}());
var Deck = /** @class */ (function () {
    // initializes the deck with cards in predictable order
    function Deck() {
        this.cards = [];
        for (var suit in Suit) {
            // hacky way to iterate through enum, see
            // https://stackoverflow.com/questions/39372804/typescript-how-to-loop-through-enum-values-for-display-in-radio-buttons
            if (isNaN(Number(suit))) {
                for (var i = 1; i <= 13; i++) {
                    this.cards.push(new Card(suit, i));
                }
            }
        }
    }
    // shuffles the deck cards in-place uniformly at random
    // no return value
    Deck.prototype.shuffle = function () {
        var _a;
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
    };
    // returns n cards which are removed from the deck
    // if the deck has fewer than n cards, throws an exception
    Deck.prototype.dealCards = function (n) {
        if (n > this.cards.length) {
            throw new Error('Deck did not have enough cards');
        }
        return this.cards.splice(0, n);
    };
    return Deck;
}());
