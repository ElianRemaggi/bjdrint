// player.js

class Player {
  constructor(name = 'Jugador') {
    this.name = name;
    this.hand = [];
  }

  addCard(card) {
    this.hand.push(card);
  }

  getHandValue() {
    let value = 0;
    let aces = 0;
    for (const card of this.hand) {
      value += card.value;
      if (card.rank === 'A') aces++;
    }
    // Ajustar el valor del As si es necesario
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    return value;
  }

  resetHand() {
    this.hand = [];
  }

  showHand(hideFirstCard = false) {
    const showCard = (card) => `[${card.rank}${card.suit}]`;
    if (hideFirstCard) {
      return '[??] ' + this.hand.slice(1).map(showCard).join(' ');
    }
    return this.hand.map(showCard).join(' ');
  }
}

export default Player; 