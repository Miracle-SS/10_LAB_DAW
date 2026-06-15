import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  imports: [CommonModule, FormsModule],
  templateUrl: './game.html',
  styleUrl: './game.css',
})
export class Game {

  palabras = [
    'AREQUIPA',
    'MISTI',
    'PERU',
    'ALGORITMO',
    'PROGRAMACION',
    'SOFTWARE',
    'HARDWARE',
    'UNIVERSIDAD',
    'COMPUTADORA',
    'TECNOLOGIA'
  ];

  palabraSecreta = '';
  letrasAdivinadas: string[] = [];
  letrasIntentadas: string[] = [];

  errores = 0;
  maxErrores = 6;

  letra = '';

  victorias = 0;

  constructor() {

  if (typeof window !== 'undefined') {

  localStorage.setItem(
    'victorias',
    this.victorias.toString()
  );
}
  this.iniciarJuego();
}

  iniciarJuego() {

    const indice =
      Math.floor(Math.random() * this.palabras.length);

    this.palabraSecreta =
      this.palabras[indice];

    this.letrasAdivinadas = [];
    this.letrasIntentadas = [];

    this.errores = 0;
    this.letra = '';
  }

  probarLetra() {

    const letraMayus =
      this.letra.toUpperCase();

    if (!letraMayus) return;

    if (this.letrasIntentadas.includes(letraMayus)) {
      this.letra = '';
      return;
    }

    this.letrasIntentadas.push(letraMayus);

    if (
      this.palabraSecreta.includes(letraMayus)
    ) {

      this.letrasAdivinadas.push(
        letraMayus
      );

      if (this.gano()) {

        this.victorias++;

        localStorage.setItem(
          'victorias',
          this.victorias.toString()
        );
      }

    } else {

      this.errores++;

    }

    this.letra = '';
  }

  obtenerPalabraVisible() {

    return this.palabraSecreta
      .split('')
      .map(letra =>
        this.letrasAdivinadas.includes(letra)
          ? letra
          : '_'
      )
      .join(' ');
  }

  gano() {

    return this.palabraSecreta
      .split('')
      .every(letra =>
        this.letrasAdivinadas.includes(letra)
      );
  }

  perdio() {

    return this.errores >= this.maxErrores;
  }
}