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

  isPlayerBlackjack() {
    return this.player.hand.length === 2 && this.player.getHandValue() === 21;
  }

  isDealerBlackjack() {
    return this.dealer.hand.length === 2 && this.dealer.getHandValue() === 21;
  }

  getResult() {
    const playerValue = this.player.getHandValue();
    const dealerValue = this.dealer.getHandValue();

    const playerBJ = this.isPlayerBlackjack();
    const dealerBJ = this.isDealerBlackjack();

    if (playerBJ && dealerBJ) return 'Empate.';
    if (playerBJ) return '¡Blackjack! ¡Ganas!';
    if (dealerBJ) return 'El crupier tiene Blackjack. Pierdes.';

    if (playerValue > 21) return '¡Te pasaste! Pierdes.';
    if (dealerValue > 21) return '¡El crupier se pasó! ¡Ganas!';
    if (playerValue > dealerValue) return '¡Ganas!';
    if (playerValue < dealerValue) return 'Pierdes.';
    return 'Empate.';
  }

  calculatePayout(bet) {
    const playerBJ = this.isPlayerBlackjack();
    const dealerBJ = this.isDealerBlackjack();

    if (playerBJ && dealerBJ) return 0;
    if (playerBJ) return bet * 1.5;
    if (dealerBJ) return -bet;

    const playerValue = this.player.getHandValue();
    const dealerValue = this.dealer.getHandValue();

    if (playerValue > 21) return -bet;
    if (dealerValue > 21) return bet;
    if (playerValue > dealerValue) return bet;
    if (playerValue < dealerValue) return -bet;
    return 0;
  }
}

export default Game; 