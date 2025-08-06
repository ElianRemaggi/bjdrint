// dealer.js

import Player from './player.js';

class Dealer extends Player {
  constructor() {
    super('Crupier');
  }

  shouldDraw() {
    // El crupier pide carta si tiene menos de 17
    return this.getHandValue() < 17;
  }

  // showHand ya hereda el de Player, que ahora soporta colores
}

module.exports = Dealer; 