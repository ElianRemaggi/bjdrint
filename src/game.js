// game.js

import Deck from './deck.js';
import Player from './player.js';
import Dealer from './dealer.js';

class Game {
  constructor() {
    this.deck = new Deck();
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.deck.reset();
    this.deck.shuffle();
    this.player.resetHand();
    this.dealer.resetHand();
    // Repartir dos cartas a cada uno
    this.player.addCard(this.deck.draw());
    this.dealer.addCard(this.deck.draw());
    this.player.addCard(this.deck.draw());
    this.dealer.addCard(this.deck.draw());
  }

  playerHit() {
    this.player.addCard(this.deck.draw());
  }

  dealerTurn() {
    while (this.dealer.shouldDraw()) {
      this.dealer.addCard(this.deck.draw());
    }
  }

  getPlayerHand() {
    return this.player.showHand();
  }

  getDealerHand(hideFirstCard = true) {
    return this.dealer.showHand(hideFirstCard);
  }

  getPlayerValue() {
    return this.player.getHandValue();
  }

  getDealerValue(hideFirstCard = true) {
    if (hideFirstCard) {
      // Solo mostrar el valor de la carta visible
      const hand = this.dealer.hand.slice(1);
      let value = 0;
      let aces = 0;
      for (const card of hand) {
        value += card.value;
        if (card.rank === 'A') aces++;
      }
      while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
      }
      return value;
    }
    return this.dealer.getHandValue();
  }

  isPlayerBust() {
    return this.player.getHandValue() > 21;
  }

  isDealerBust() {
    return this.dealer.getHandValue() > 21;
  }

  getResult() {
    const playerValue = this.player.getHandValue();
    const dealerValue = this.dealer.getHandValue();
    if (playerValue > 21) return '¡Te pasaste! Pierdes.';
    if (dealerValue > 21) return '¡El crupier se pasó! ¡Ganas!';
    if (playerValue > dealerValue) return '¡Ganas!';
    if (playerValue < dealerValue) return 'Pierdes.';
    return 'Empate.';
  }
}

module.exports = Game; 