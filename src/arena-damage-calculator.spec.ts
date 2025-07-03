import { ArenaDamageCalculator } from './arena-damage-calculator';
import { Hero } from './model/hero';
import { HeroElement } from './model/hero-element';
import { Buff } from './model/buff';
import { TestableArenaDamageCalculator } from './__mocks__/testable-arena-damage-calculator';

describe("Arena damage calculator", function() {
  // Fonction helper pour créer facilement des héros mockés
  function createMockHero(element: HeroElement, pow: number, def: number, leth: number, crtr: number, lp: number, buffs: Buff[] = []): Hero {
    const hero = new Hero(element, pow, def, leth, crtr, lp);
    hero.buffs = [...buffs];
    return hero;
  }
  
  // Attaquants mockés
  const waterAttacker = createMockHero(HeroElement.Water, 1000, 500, 200, 50, 10000);
  const fireAttacker = createMockHero(HeroElement.Fire, 1200, 450, 250, 60, 9000);
  const earthAttacker = createMockHero(HeroElement.Earth, 900, 600, 180, 45, 11000);
  
  // Défenseurs mockés
  const waterDefender = createMockHero(HeroElement.Water, 800, 700, 150, 40, 8000);
  const fireDefender = createMockHero(HeroElement.Fire, 850, 650, 160, 45, 7500);
  const earthDefender = createMockHero(HeroElement.Earth, 750, 800, 140, 35, 9000);
  
  // Défenseurs spéciaux
  const defenderWithDefenseBuff = createMockHero(HeroElement.Water, 800, 700, 150, 40, 8000, [Buff.Defense]);
  const defeatedDefender = createMockHero(HeroElement.Water, 800, 700, 150, 40, 0);

  describe("Sélection de cible", () => {
    it("devrait choisir une cible avantageuse quand disponible", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      // Force Math.random à 0 pour sélectionner le premier élément du tableau
      calculator.mockRandom(0);
      
      const defenders = [waterDefender, fireDefender, earthDefender];
      const initialFireDefenderLp = fireDefender.lp;
      
      // Act
      calculator.computeDamage(waterAttacker, defenders);
      
      // Assert
      // Vérifie que le défenseur de feu (cible avantageuse) a subi des dégâts
      expect(fireDefender.lp).toBeLessThan(initialFireDefenderLp);
      // Vérifie que les autres n'ont pas subi de dégâts
      expect(waterDefender.lp).toBe(8000);
      expect(earthDefender.lp).toBe(9000);
    });

    it("devrait ignorer les défenseurs déjà vaincus", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const defenders = [defeatedDefender, waterDefender];
      const initialWaterDefenderLp = waterDefender.lp;
      
      // Act
      calculator.computeDamage(fireAttacker, defenders);
      
      // Assert
      // Le défenseur vaincu reste à 0 LP
      expect(defeatedDefender.lp).toBe(0);
      // L'autre défenseur subit des dégâts
      expect(waterDefender.lp).toBeLessThan(initialWaterDefenderLp);
    });

    it("devrait gérer la sélection de cible pour attaquant Earth", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const defenders = [waterDefender, fireDefender, earthDefender];
      const initialWaterDefenderLp = waterDefender.lp;
      
      // Act - Earth vs Water (advantage), Fire (disadvantage), Earth (equal)
      calculator.computeDamage(earthAttacker, defenders);
      
      // Assert
      // Vérifie qu'une cible a subi des dégâts
      expect(waterDefender.lp < initialWaterDefenderLp || fireDefender.lp < 7500 || earthDefender.lp < 9000).toBeTruthy();
    });

    it("devrait sélectionner une cible équivalente quand attaquant Fire vs Fire", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const fireAttacker2 = createMockHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
      const fireDefender2 = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      const initialFireDefenderLp = fireDefender2.lp;
      
      // Act
      calculator.computeDamage(fireAttacker2, [fireDefender2]);
      
      // Assert
      expect(fireDefender2.lp).toBeLessThan(initialFireDefenderLp);
      expect(fireDefender2.lp).toBe(2000 - 1000);
    });

    it("devrait sélectionner une cible avantageuse quand attaquant Fire vs Earth", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const fireAttacker2 = createMockHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
      const earthDefender2 = createMockHero(HeroElement.Earth, 0, 0, 0, 0, 2000);
      const initialEarthDefenderLp = earthDefender2.lp;
      
      // Act
      calculator.computeDamage(fireAttacker2, [earthDefender2]);
      
      // Assert
      expect(earthDefender2.lp).toBeLessThan(initialEarthDefenderLp);
      expect(earthDefender2.lp).toBe(2000 - 1200);
    });

    xit("devrait gérer le cas où tous les défenseurs Water sont vaincus (ligne 17)", () => {
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const waterAttacker2 = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const allDefeatedDefenders = [
        createMockHero(HeroElement.Water, 0, 0, 0, 0, 0),
        createMockHero(HeroElement.Fire, 0, 0, 0, 0, 0),
        createMockHero(HeroElement.Earth, 0, 0, 0, 0, 0)
      ];
      
      // Act & Assert
      // Note: Ces tests couvrent bien les branches continue mais révèlent un comportement
      // potentiellement problématique quand tous les défenseurs sont vaincus car l'appli crash
      // À corriger pour plus tard
      expect(() => {
        calculator.computeDamage(waterAttacker2, allDefeatedDefenders);
      }).toThrow();
    });

    xit("devrait gérer le cas où tous les défenseurs Earth sont vaincus (ligne 41)", () => {
      // Arrange - Teste la ligne 41 : if (h.lp <= 0) { continue; } pour Earth attacker
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const earthAttacker2 = createMockHero(HeroElement.Earth, 1000, 0, 0, 0, 1000);
      const allDefeatedDefenders = [
        createMockHero(HeroElement.Water, 0, 0, 0, 0, 0),
        createMockHero(HeroElement.Fire, 0, 0, 0, 0, 0),
        createMockHero(HeroElement.Earth, 0, 0, 0, 0, 0)
      ];
      
      // Act & Assert
      // Note: Ces tests couvrent bien les branches continue mais révèlent un comportement
      // potentiellement problématique quand tous les défenseurs sont vaincus car l'appli crash
      // À corriger pour plus tard
      expect(() => {
        calculator.computeDamage(earthAttacker2, allDefeatedDefenders);
      }).toThrow();
    });
  });

  describe("Calcul de dégâts", () => {
    it("devrait calculer les dégâts normaux correctement", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      // Math.random = 0.9 pour éviter un coup critique (0.9 * 100 = 90, qui est > 0 du crtr)
      calculator.mockRandom(0.9);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      // Formule: pow * (1 - def/7500) * bonus élémentaire
      // 1000 * (1 - 0/7500) * 1.2 = 1000 * 1 * 1.2 = 1200
      const expectedDamage = Math.floor(1000 * 1.2);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      expect(defender.lp).toBe(2000 - expectedDamage);
    });

    it("devrait calculer les dégâts critiques correctement", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      // Math.random = 0.1 pour forcer un coup critique (0.1 * 100 = 10, qui est < 50 du crtr)
      calculator.mockRandom(0.1);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 200, 50, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 3000);
      
      // Formule critique: (pow + (0.5 + leth/5000) * pow) * bonus élémentaire
      const critMultiplier = 0.5 + 200/5000; // = 0.54
      const expectedDamage = Math.floor((1000 + critMultiplier * 1000) * 1.2); // ≈ 1848
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      expect(defender.lp).toBe(3000 - expectedDamage);
    });
    
    it("devrait appliquer le bonus d'élément avantageux", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9); // Sans critique
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      // 1000 * 1.2 = 1200
      expect(defender.lp).toBe(2000 - 1200);
    });
    
    it("devrait appliquer le malus d'élément désavantageux", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9); // Sans critique
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const defender = createMockHero(HeroElement.Earth, 0, 0, 0, 0, 2000);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      // 1000 * 0.8 = 800
      expect(defender.lp).toBe(2000 - 800);
    });
  });

  describe("Buffs", () => {
    it("devrait augmenter les dégâts quand l'attaquant a un buff d'attaque", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9); // Sans critique
      
      const attackerWithoutBuff = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const attackerWithBuff = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000, [Buff.Attack]);
      
      const defender1 = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      const defender2 = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      
      // Act
      calculator.computeDamage(attackerWithoutBuff, [defender1]);
      calculator.computeDamage(attackerWithBuff, [defender2]);
      
      // Assert
      // Sans buff: 1000 * 1.2 = 1200
      // Avec buff: (1000 + 1000*0.25) * 1.2 = 1500
      expect(defender1.lp).toBe(2000 - 1200);
      expect(defender2.lp).toBe(2000 - 1500);
    });

    it("devrait augmenter les dégâts avec buff d'attaque ET coup critique", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.1); // Force coup critique
      
      const attackerWithBuff = createMockHero(HeroElement.Water, 1000, 0, 200, 50, 1000, [Buff.Attack]);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 5000);
      
      // Formule avec critique ET buff d'attaque:
      // Base critique: (1000 + (0.5 + 200/5000) * 1000) * 1.2 = (1000 + 0.54 * 1000) * 1.2 = 1848
      // Buff critique: (1000 * 0.25 + (0.5 + 200/5000) * 1000 * 0.25) * 1.2 = 462
      // Total: 1848 + 462 = 2310
      const baseCritDamage = Math.floor((1000 + (0.5 + 200/5000) * 1000) * 1.2);
      const buffCritDamage = Math.floor((1000 * 0.25 + (0.5 + 200/5000) * 1000 * 0.25) * 1.2);
      const expectedTotalDamage = baseCritDamage + buffCritDamage;
      
      // Act
      calculator.computeDamage(attackerWithBuff, [defender]);
      
      // Assert
      expect(defender.lp).toBe(5000 - expectedTotalDamage);
    });

    it("devrait réduire les dégâts quand le défenseur a un buff de défense", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9); // Sans critique
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      
      const defenderWithoutBuff = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      const defenderWithBuff = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000, [Buff.Defense]);
      
      // Act
      calculator.computeDamage(attacker, [defenderWithoutBuff]);
      calculator.computeDamage(attacker, [defenderWithBuff]);
      
      // Assert
      // Sans buff: 1000 * 1.2 = 1200
      // Avec buff de défense: la réduction est de 25% donc 1000 * 1.2 * 0.75 = 900
      expect(defenderWithoutBuff.lp).toBe(2000 - 1200);
      expect(defenderWithBuff.lp).toBe(2000 - 900);
    });
  });

  describe("Cas limites", () => {
    it("ne devrait jamais faire de dégâts négatifs", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      // Attaquant très faible contre défenseur très fort
      const weakAttacker = createMockHero(HeroElement.Water, 10, 0, 0, 0, 1000);
      const strongDefender = createMockHero(HeroElement.Water, 0, 7500, 0, 0, 1000);
      
      // Act
      calculator.computeDamage(weakAttacker, [strongDefender]);
      
      // Assert
      expect(strongDefender.lp).toBe(1000); // Pas de changement de LP
    });

    it("ne devrait pas réduire les LP en dessous de zéro", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      // Attaquant puissant contre défenseur faible
      const strongAttacker = createMockHero(HeroElement.Water, 10000, 0, 0, 0, 1000);
      const lowHpDefender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 10);
      
      // Act
      calculator.computeDamage(strongAttacker, [lowHpDefender]);
      
      // Assert
      expect(lowHpDefender.lp).toBe(0); // LP réduits à 0, pas en dessous
    });
  });
});