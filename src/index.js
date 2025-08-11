// index.js

import readline from 'readline';
import Game from './game.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta) {
  return new Promise(resolve => rl.question(pregunta, resolve));
}

async function main() {
  console.log('¡Bienvenido al Blackjack!');
  let saldo = 0;
  while (true) {
    const inputSaldo = await preguntar('¿Con cuántos dólares quieres comenzar? ');
    saldo = parseFloat(inputSaldo);
    if (!isNaN(saldo) && saldo > 0) break;
    console.log('Por favor, ingresa un número válido mayor a 0.');
  }
  let jugar = true;
  let apuestaSiguiente = null;
  while (jugar && saldo > 0) {
    const game = new Game();
    game.start();
    let turnoJugador = true;
    let apuesta = 0;
    // Preguntar apuesta
    if (apuestaSiguiente !== null) {
      apuesta = apuestaSiguiente;
      apuestaSiguiente = null;
      console.log(`\nApuesta automática: $${apuesta}`);
    } else {
      while (true) {
        const inputApuesta = await preguntar(`\nTienes $${saldo.toFixed(2)}. ¿Cuánto quieres apostar? `);
        apuesta = parseFloat(inputApuesta);
        if (!isNaN(apuesta) && apuesta > 0 && apuesta <= saldo) break;
        console.log('Apuesta inválida. Debe ser un número mayor a 0 y menor o igual a tu saldo.');
      }
    }
    while (turnoJugador) {
      const valorJugador = game.getPlayerValue();
      let manoJugador = game.player.showHand(false);
      console.log(`\nTus cartas: ${manoJugador} (Total: ${valorJugador})`);
      console.log(`Carta visible del crupier: ${game.dealer.showHand(true)}`);
      if (game.isPlayerBust()) {
        console.log('¡Te pasaste de 21!');
        turnoJugador = false;
        break;
      }
      const accion = await preguntar('¿Quieres pedir carta (p) o plantarte (x)? ');
      if (accion.toLowerCase() === 'p') {
        game.playerHit();
      } else if (accion.toLowerCase() === 'x') {
        turnoJugador = false;
      } else {
        console.log('Opción no válida. Escribe "p" para pedir o "x" para plantarte.');
      }
    }
    // Turno del crupier
    if (!game.isPlayerBust()) {
      game.dealerTurn();
      console.log(`\nCartas del crupier: ${game.dealer.showHand(false)} (Total: ${game.getDealerValue(false)})`);
    }
    // Resultado
    const valorJugador = game.getPlayerValue();
    let manoJugador = game.player.showHand(false);
    console.log(`\nTus cartas: ${manoJugador} (Total: ${valorJugador})`);
    console.log(`Cartas del crupier: ${game.dealer.showHand(false)} (Total: ${game.getDealerValue(false)})`);
    const resultado = game.getResult();
    console.log(resultado);

    // Ajustar saldo usando payout (incluye blackjack 3:2)
    const neto = game.calculatePayout(apuesta);
    saldo += neto;
    if (neto > 0) {
      console.log(`¡Ganaste $${neto.toFixed(2)}! Tu saldo es $${saldo.toFixed(2)}.`);
    } else if (neto < 0) {
      console.log(`Perdiste $${Math.abs(neto).toFixed(2)}. Tu saldo es $${saldo.toFixed(2)}.`);
    } else {
      console.log(`Empate. Tu saldo es $${saldo.toFixed(2)}.`);
    }

    if (saldo <= 0) {
      console.log('¡Te has quedado sin dinero!');
      break;
    }
    // ¿Jugar de nuevo?
    const otra = await preguntar('\n¿Quieres jugar otra vez? (s/n o monto de apuesta): ');
    if (otra.toLowerCase() === 's') {
      jugar = true;
    } else if (otra.toLowerCase() === 'n') {
      jugar = false;
    } else {
      // Si es un número válido y posible como apuesta, lo toma como apuesta automática
      const monto = parseFloat(otra);
      if (!isNaN(monto) && monto > 0 && monto <= saldo) {
        apuestaSiguiente = monto;
        jugar = true;
      } else {
        jugar = false;
      }
    }
  }
  rl.close();
  console.log('¡Gracias por jugar!');
}

main(); 