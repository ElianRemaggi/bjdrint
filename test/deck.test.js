import { describe, it, expect, beforeEach } from 'vitest';
import Deck from '../src/deck.js';

// Helper para contar cartas únicas
function cartasUnicas(cartas) {
  return new Set(cartas.map(c => `${c.rank}${c.suit}`)).size;
}

describe('Deck', () => {
  let deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it('debe crear una baraja con 52 cartas al hacer reset', () => {
    deck.reset();
    expect(deck.cards.length).toBe(52);
    expect(cartasUnicas(deck.cards)).toBe(52);
  });

  it('shuffle debe mezclar el mazo', () => {
    deck.reset();
    const original = [...deck.cards.map(c => `${c.rank}${c.suit}`)];
    deck.shuffle();
    const shuffled = deck.cards.map(c => `${c.rank}${c.suit}`);
    // No es 100% seguro, pero en la mayoría de los casos el orden será diferente
    expect(shuffled.join('')).not.toBe(original.join(''));
    expect(cartasUnicas(deck.cards)).toBe(52);
  });

  it('draw debe devolver una carta y reducir el tamaño del mazo', () => {
    deck.reset();
    const initialLength = deck.cards.length;
    const card = deck.draw();
    expect(card).toBeDefined();
    expect(deck.cards.length).toBe(initialLength - 1);
  });

  it('draw debe devolver undefined si el mazo está vacío', () => {
    deck.cards = [];
    expect(deck.draw()).toBeUndefined();
  });
}); 