
import { describe, it, expect, beforeEach } from 'vitest';
import Dealer from '../src/dealer.js';
import Player from '../src/player.js';

// Mock para una carta
function carta(rank, suit, value) {
  return { rank, suit, value };
}

describe('Dealer', () => {
  let dealer;

  beforeEach(() => {
    dealer = new Dealer();
  });

  it('debe ser instancia de Player', () => {
    expect(dealer).toBeInstanceOf(Player);
  });

  it('debe tener nombre "Crupier"', () => {
    expect(dealer.name).toBe('Crupier');
  });

  it('shouldDraw() debe devolver true si el valor de la mano es menor a 17', () => {
    dealer.hand = [carta('5', '♠', 5), carta('9', '♥', 9)]; // total 14
    expect(dealer.shouldDraw()).toBe(true);
  });

  it('shouldDraw() debe devolver false si el valor de la mano es 17 o más', () => {
    dealer.hand = [carta('10', '♠', 10), carta('7', '♥', 7)]; // total 17
    expect(dealer.shouldDraw()).toBe(false);
    dealer.hand = [carta('K', '♠', 10), carta('9', '♥', 9)]; // total 19
    expect(dealer.shouldDraw()).toBe(false);
  });

  it('resetHand() debe vaciar la mano', () => {
    dealer.hand = [carta('A', '♠', 11)];
    dealer.resetHand();
    expect(dealer.hand.length).toBe(0);
  });

  it('getHandValue() debe calcular correctamente el valor de la mano con As', () => {
    dealer.hand = [carta('A', '♠', 11), carta('9', '♥', 9)]; // 20
    expect(dealer.getHandValue()).toBe(20);
    dealer.hand = [carta('A', '♠', 11), carta('9', '♥', 9), carta('5', '♦', 5)]; // 25 -> 15
    expect(dealer.getHandValue()).toBe(15);
  });
}); 