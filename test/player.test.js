import { describe, it, expect, beforeEach } from 'vitest';
import Player from '../src/player.js';

function carta(rank, suit, value) {
  return { rank, suit, value };
}

describe('Player', () => {
  let player;

  beforeEach(() => {
    player = new Player('Test');
  });

  it('debe tener el nombre correcto', () => {
    expect(player.name).toBe('Test');
  });

  it('addCard debe agregar una carta a la mano', () => {
    player.addCard(carta('A', '♠', 11));
    expect(player.hand.length).toBe(1);
  });

  it('resetHand debe vaciar la mano', () => {
    player.addCard(carta('A', '♠', 11));
    player.resetHand();
    expect(player.hand.length).toBe(0);
  });

  it('getHandValue debe sumar correctamente sin As', () => {
    player.addCard(carta('5', '♠', 5));
    player.addCard(carta('9', '♥', 9));
    expect(player.getHandValue()).toBe(14);
  });

  it('getHandValue debe ajustar el valor del As si es necesario', () => {
    player.addCard(carta('A', '♠', 11));
    player.addCard(carta('9', '♥', 9));
    player.addCard(carta('5', '♦', 5)); // 11+9+5=25 -> 15
    expect(player.getHandValue()).toBe(15);
  });

  it('showHand debe mostrar la mano correctamente', () => {
    player.addCard(carta('A', '♠', 11));
    player.addCard(carta('9', '♥', 9));
    expect(player.showHand()).toBe('[A♠] [9♥]');
  });

  it('showHand debe ocultar la primera carta si hideFirstCard es true', () => {
    player.addCard(carta('A', '♠', 11));
    player.addCard(carta('9', '♥', 9));
    expect(player.showHand(true)).toBe('[??] [9♥]');
  });
}); 