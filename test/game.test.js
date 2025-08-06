import { describe, it, expect, beforeEach } from 'vitest';
import Game from '../src/game.js';

describe('Game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
    game.start();
  });

  it('al iniciar, el jugador y el dealer tienen 2 cartas', () => {
    expect(game.player.hand.length).toBe(2);
    expect(game.dealer.hand.length).toBe(2);
  });

  it('playerHit agrega una carta a la mano del jugador', () => {
    const prev = game.player.hand.length;
    game.playerHit();
    expect(game.player.hand.length).toBe(prev + 1);
  });

  it('dealerTurn hace que el dealer tome cartas hasta tener al menos 17', () => {
    game.dealer.hand = [{ rank: '2', suit: '♠', value: 2 }, { rank: '3', suit: '♥', value: 3 }];
    game.dealerTurn();
    expect(game.dealer.getHandValue()).toBeGreaterThanOrEqual(17);
  });

  it('isPlayerBust detecta si el jugador se pasa de 21', () => {
    game.player.hand = [
      { rank: 'K', suit: '♠', value: 10 },
      { rank: 'Q', suit: '♥', value: 10 },
      { rank: '2', suit: '♦', value: 2 }
    ];
    expect(game.isPlayerBust()).toBe(true);
  });

  it('isDealerBust detecta si el dealer se pasa de 21', () => {
    game.dealer.hand = [
      { rank: 'K', suit: '♠', value: 10 },
      { rank: 'Q', suit: '♥', value: 10 },
      { rank: '2', suit: '♦', value: 2 }
    ];
    expect(game.isDealerBust()).toBe(true);
  });

  it('getResult devuelve el resultado correcto', () => {
    game.player.hand = [
      { rank: 'K', suit: '♠', value: 10 },
      { rank: 'Q', suit: '♥', value: 10 },
      { rank: '2', suit: '♦', value: 2 }
    ];
    expect(game.getResult()).toMatch(/Pierdes/);
    game.player.hand = [
      { rank: 'K', suit: '♠', value: 10 },
      { rank: 'Q', suit: '♥', value: 10 }
    ];
    game.dealer.hand = [
      { rank: '9', suit: '♠', value: 9 },
      { rank: '8', suit: '♥', value: 8 }
    ];
    expect(game.getResult()).toMatch(/¡Ganas/);
  });
}); 