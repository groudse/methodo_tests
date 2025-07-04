import { ArenaDamageCalculator } from "../arena-damage-calculator";
import { Hero } from "../model/hero";

export class TestableArenaDamageCalculator extends ArenaDamageCalculator {
  private _mockRandom: number | null = null;

  /**
   * Définit une valeur fixe pour Math.random() pendant l'exécution de computeDamage
   * @param value - Valeur entre 0 et 1 à utiliser pour Math.random
   */
  mockRandom(value: number): void {
    this._mockRandom = value;
  }

  /**
   * Surcharge de computeDamage qui utilise la valeur mockée pour Math.random
   */
  computeDamage(attacker: Hero, defenders: Hero[]): Hero[] {
    const originalRandom = Math.random;

    try {
      if (this._mockRandom !== null) {
        const mockValue = this._mockRandom;
        Math.random = () => mockValue;
      }

      return super.computeDamage(attacker, defenders);
    } finally {
      Math.random = originalRandom;
      this._mockRandom = null;
    }
  }
}
