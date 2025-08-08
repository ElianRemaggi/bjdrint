import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('index.js', () => {
  it('debe existir el archivo src/index.js', () => {
    const filePath = path.resolve('src/index.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('debe ser un archivo ejecutable por Node.js', () => {
    const filePath = path.resolve('src/index.js');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toMatch(/main\(\)/);
  });
});

describe('Game API', () => {
  it('debe exponer calculatePayout(bet)', async () => {
    const Game = (await import('../src/game.js')).default || (await import('../src/game.js'));
    const G = Game.default || Game;
    const g = new G();
    expect(typeof g.calculatePayout).toBe('function');
  });
}); 