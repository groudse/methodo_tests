import { ArenaDamageCalculator } from './arena-damage-calculator';
import { HeroElement } from './model/hero-element';
import { Buff } from './model/buff';
import { TestableArenaDamageCalculator } from './__mocks__/testable-arena-damage-calculator';
import { 
  createMockHero,
  waterAttacker,
  fireAttacker,
  earthAttacker,
  waterDefender,
  fireDefender,
  earthDefender,
  defeatedDefender
} from './__mocks__/test-heroes';

describe("Arena damage calculator", function() {

  describe("Target selection", () => {
    it("should choose advantageous target when available", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const defenders = [waterDefender, fireDefender, earthDefender];
      const initialFireDefenderLp = fireDefender.lp;
      
      // Act
      calculator.computeDamage(waterAttacker, defenders);
      
      // Assert
      expect(fireDefender.lp).toBeLessThan(initialFireDefenderLp);
      expect(waterDefender.lp).toBe(8000);
      expect(earthDefender.lp).toBe(9000);
    });

    it("should ignore already defeated defenders", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const defenders = [defeatedDefender, waterDefender];
      const initialWaterDefenderLp = waterDefender.lp;
      
      // Act
      calculator.computeDamage(fireAttacker, defenders);
      
      // Assert
      expect(defeatedDefender.lp).toBe(0);
      expect(waterDefender.lp).toBeLessThan(initialWaterDefenderLp);
    });

    it("should handle target selection for Earth attacker", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const earthAttacker2 = createMockHero(HeroElement.Earth, 1000, 0, 0, 0, 1000);
      const waterDefender2 = createMockHero(HeroElement.Water, 0, 0, 0, 0, 2000); // Advantageous target
      const fireDefender2 = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);   // Disadvantageous target
      
      // Act
      calculator.computeDamage(earthAttacker2, [waterDefender2, fireDefender2]);
      
      // Assert - Should attack advantageous target (Water)
      expect(waterDefender2.lp).toBe(2000 - 1200); // Earth vs Water = advantageous
      expect(fireDefender2.lp).toBe(2000); // Fire defender should be untouched
    });

    it("should select equivalent target when Fire attacker vs Fire", () => {
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

    it("should select advantageous target when Fire attacker vs Earth", () => {
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

    it("should handle case where all Water defenders are defeated", () => {
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

    it("should handle case where all Earth defenders are defeated (line 41)", () => {
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

  describe("Damage calculation", () => {
    it("should calculate normal damage correctly", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      const expectedDamage = Math.floor(1000 * 1.2);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      expect(defender.lp).toBe(2000 - expectedDamage);
    });

    it("should calculate critical damage correctly", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.1);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 200, 50, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 3000);
      
      const critMultiplier = 0.5 + 200/5000;
      const expectedDamage = Math.floor((1000 + critMultiplier * 1000) * 1.2); 
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      expect(defender.lp).toBe(3000 - expectedDamage);
    });
    
    it("should apply advantageous element bonus", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      expect(defender.lp).toBe(2000 - 1200);
    });
    
    it("should apply disadvantageous element penalty", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const defender = createMockHero(HeroElement.Earth, 0, 0, 0, 0, 2000);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      expect(defender.lp).toBe(2000 - 800);
    });
  });

  describe("Buffs", () => {
    it("should increase damage when attacker has attack buff", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9);
      
      const attackerWithoutBuff = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const attackerWithBuff = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000, [Buff.Attack]);
      
      const defender1 = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      const defender2 = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      
      // Act
      calculator.computeDamage(attackerWithoutBuff, [defender1]);
      calculator.computeDamage(attackerWithBuff, [defender2]);
      
      // Assert
      expect(defender1.lp).toBe(2000 - 1200);
      expect(defender2.lp).toBe(2000 - 1500);
    });

    it("should increase damage with attack buff AND critical hit", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.1);
      
      const attackerWithBuff = createMockHero(HeroElement.Water, 1000, 0, 200, 50, 1000, [Buff.Attack]);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 5000);
      
      const baseCritDamage = Math.floor((1000 + (0.5 + 200/5000) * 1000) * 1.2);
      const buffCritDamage = Math.floor((1000 * 0.25 + (0.5 + 200/5000) * 1000 * 0.25) * 1.2);
      const expectedTotalDamage = baseCritDamage + buffCritDamage;
      
      // Act
      calculator.computeDamage(attackerWithBuff, [defender]);
      
      // Assert
      expect(defender.lp).toBe(5000 - expectedTotalDamage);
    });

    it("should reduce damage when defender has defense buff", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      
      const defenderWithoutBuff = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      const defenderWithBuff = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000, [Buff.Defense]);
      
      // Act
      calculator.computeDamage(attacker, [defenderWithoutBuff]);
      calculator.computeDamage(attacker, [defenderWithBuff]);
      
      // Assert
      expect(defenderWithoutBuff.lp).toBe(2000 - 1200);
      expect(defenderWithBuff.lp).toBe(2000 - 900);
    });
  });

  describe("Edge cases", () => {
    it("should never deal negative damage", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      const weakAttacker = createMockHero(HeroElement.Water, 10, 0, 0, 0, 1000);
      const strongDefender = createMockHero(HeroElement.Water, 0, 7500, 0, 0, 1000);
      
      // Act
      calculator.computeDamage(weakAttacker, [strongDefender]);
      
      // Assert
      expect(strongDefender.lp).toBe(1000);
    });

    it("should not reduce LP below zero", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      const strongAttacker = createMockHero(HeroElement.Water, 10000, 0, 0, 0, 1000);
      const lowHpDefender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 10);
      
      // Act
      calculator.computeDamage(strongAttacker, [lowHpDefender]);
      
      // Assert
      expect(lowHpDefender.lp).toBe(0);
    });
  });

  describe("Target selection specific branches", () => {


    it("should handle Earth attacker vs Fire defender", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const earthAttacker2 = createMockHero(HeroElement.Earth, 1000, 0, 0, 0, 1000);
      const fireDefender2 = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 2000);
      const initialFireDefenderLp = fireDefender2.lp;
      
      // Act
      calculator.computeDamage(earthAttacker2, [fireDefender2]);
      
      // Assert
      expect(fireDefender2.lp).toBeLessThan(initialFireDefenderLp);
      expect(fireDefender2.lp).toBe(2000 - 800);
    });

    it("should handle Earth attacker vs Water defender", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const earthAttacker2 = createMockHero(HeroElement.Earth, 1000, 0, 0, 0, 1000);
      const waterDefender2 = createMockHero(HeroElement.Water, 0, 0, 0, 0, 2000);
      const initialWaterDefenderLp = waterDefender2.lp;
      
      // Act
      calculator.computeDamage(earthAttacker2, [waterDefender2]);
      
      // Assert
      expect(waterDefender2.lp).toBeLessThan(initialWaterDefenderLp);
      expect(waterDefender2.lp).toBe(2000 - 1200);
    });

    it("should handle Earth attacker vs Earth defender", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0);
      
      const earthAttacker2 = createMockHero(HeroElement.Earth, 1000, 0, 0, 0, 1000);
      const earthDefender2 = createMockHero(HeroElement.Earth, 0, 0, 0, 0, 2000);
      const initialEarthDefenderLp = earthDefender2.lp;
      
      // Act
      calculator.computeDamage(earthAttacker2, [earthDefender2]);
      
      // Assert
      expect(earthDefender2.lp).toBeLessThan(initialEarthDefenderLp);
      expect(earthDefender2.lp).toBe(2000 - 1000);
    });
  });

  describe("Critical hit boundary conditions", () => {
    it("should handle critical hit probability at exact boundary", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.5);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 50, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 3000);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      expect(defender.lp).toBe(3000 - 1200);
    });

    it("should handle critical hit when random is just under threshold", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.49);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 50, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 0, 0, 0, 3000);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      const critMultiplier = 0.5 + 0/5000;
      const expectedDamage = Math.floor((1000 + critMultiplier * 1000) * 1.2);
      expect(defender.lp).toBe(3000 - expectedDamage);
    });
  });

  describe("Damage calculation boundary cases", () => {
    it("should handle maximum defense reduction", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9);
      
      const attacker = createMockHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
      const defenderHighDef = createMockHero(HeroElement.Fire, 0, 7500, 0, 0, 2000);
      
      // Act
      calculator.computeDamage(attacker, [defenderHighDef]);
      
      // Assert
      expect(defenderHighDef.lp).toBe(2000);
    });

    it("should handle defense buff calculation correctly", () => {
      // Arrange
      const calculator = new TestableArenaDamageCalculator();
      calculator.mockRandom(0.9);
      
      const attacker = createMockHero(HeroElement.Water, 2000, 0, 0, 0, 1000);
      const defender = createMockHero(HeroElement.Fire, 0, 1500, 0, 0, 5000, [Buff.Defense]);
      
      // Act
      calculator.computeDamage(attacker, [defender]);
      
      // Assert
      const expectedDamage = Math.floor(1100 * 1.2);
      expect(defender.lp).toBe(5000 - expectedDamage);
    });
  });
});