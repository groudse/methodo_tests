import { ArenaDamageCalculator } from "../arena-damage-calculator";
import { Hero } from "../model/hero";

/**
 * Version testable du calculateur de dégâts qui permet de contrôler
 * les comportements aléatoires pour les tests unitaires.
 */
export class TestableArenaDamageCalculator extends ArenaDamageCalculator {
  // Force le résultat de la fonction Math.random pour les tests
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
    // Sauvegarde de la fonction originale
    const originalRandom = Math.random;
    
    try {
      // Remplace Math.random si une valeur mockée est définie
      if (this._mockRandom !== null) {
        const mockValue = this._mockRandom;
        Math.random = () => mockValue;
      }
      
      // Appelle l'implémentation originale
      return super.computeDamage(attacker, defenders);
    } finally {
      // Restaure toujours la fonction originale, même en cas d'erreur
      Math.random = originalRandom;
      // Réinitialise la valeur mockée après utilisation
      this._mockRandom = null;
    }
  }
}
