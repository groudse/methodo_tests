import { ArenaDamageCalculator } from "../src/arena-damage-calculator";
import { Hero } from "../src/model/hero";
import { HeroElement } from "../src/model/hero-element";
import { Buff } from "../src/model/buff";
import { MockRandomProvider } from "./mock-random-provider";

function createHero(
  element: HeroElement,
  pow: number,
  def: number,
  leth: number,
  crtr: number,
  lp: number,
  buffs: Buff[] = []
): Hero {
  const h = new Hero(element, pow, def, leth, crtr, lp);
  h.buffs = buffs;
  return h;
}

describe("ArenaDamageCalculator with interface-based mocking", () => {
  it("should match snapshot for known randomness sequence", () => {
    const mockRandom = new MockRandomProvider([0.1, 0.2, 0.3]); 
    const calculator = new ArenaDamageCalculator(mockRandom);

    const attacker = createHero(HeroElement.Fire, 1000, 0, 500, 100, 1000, [Buff.Attack]);
    const defenders = [
      createHero(HeroElement.Earth, 0, 500, 0, 0, 1000),
      createHero(HeroElement.Water, 0, 500, 0, 0, 1000, [Buff.Defense]),
    ];

    const result = calculator.computeDamage(attacker, defenders);

    expect(result).toMatchSnapshot();
  });

  it("should compute basic damage without buffs or crit", () => {
    const mockRandom = new MockRandomProvider([0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });
  
  it("should apply critical hit without buffs", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 500, 100, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });

  it("should apply defender's Defense buff correctly", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000, [Buff.Defense])];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });

  it("should reduce damage by 20% when attacker is at elemental disadvantage", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]);
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });

  it("should never result in negative damage", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]);
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 10000, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });

  it("should combine critical hit, attack buff, and defense buff", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 1000, 100, 1000, [Buff.Attack]);
    const defenders = [createHero(HeroElement.Earth, 0, 500, 0, 0, 1000, [Buff.Defense])];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });

  it("should handle element equality and push to eq[]", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Fire, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });
  
  it("should handle element disadvantage and push to dis[]", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });
  
  it("should apply attack buff without critical hit", () => {
    const mockRandom = new MockRandomProvider([0.0, 1.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000, [Buff.Attack]);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });
  
  it("should reduce damage due to defense buff on defender", () => {
    const mockRandom = new MockRandomProvider([0.0, 1.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 500, 0, 0, 1000, [Buff.Defense])];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });
  
  it("should go through dmg > 0 branch", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 100, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });
  

  it("should apply 1.2x multiplier for elemental advantage", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]);
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });
  
  it("should not set lp below 0 when damage exceeds lp", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); // adv, crit
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 10000, 0, 500, 100, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 200)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result).toMatchSnapshot();
  });

  it("should classify defender as equal element (eq.push)", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); // eq used
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [createHero(HeroElement.Fire, 0, 0, 0, 0, 1000)]; // same element
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result[0].lp).toBeLessThan(1000); // ensure damage was done
  });

  it("should not allow lp to go below 0 (lp = Math.max(..., 0))", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); // adv, crit
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    // Attaquant très puissant vs cible très faible
    const attacker = createHero(HeroElement.Fire, 10000, 0, 1000, 100, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 100)]; // faible LP
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result[0].lp).toBe(0); // vérifie qu'on n'est pas passé sous 0
  });

  it("should skip defenders with 0 or less lp", () => {
    const mockRandom = new MockRandomProvider([0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
    const defenders = [
      createHero(HeroElement.Earth, 0, 0, 0, 0, 0),
      createHero(HeroElement.Earth, 0, 0, 0, 0, 1000) 
    ];
  
    const result = calculator.computeDamage(attacker, defenders);
  
  
    expect(result[0].lp).toBe(0); 
    expect(result[1].lp).toBeLessThan(1000); 
  });

  it("should apply critical hit when random < crtr", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 500, 100, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result[0].lp).toBeLessThan(1000); 
  });

  it("should apply attack buff without crit", () => {
    const mockRandom = new MockRandomProvider([0.0, 1.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000, [Buff.Attack]);
    const defenders = [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result[0].lp).toBeLessThan(1000); 
  });

  it("should not modify defender if damage is 0 or less", () => {
    const mockRandom = new MockRandomProvider([0.0, 0.0]); 
    const calculator = new ArenaDamageCalculator(mockRandom);
  
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 100, 1000);
    const defenders = [createHero(HeroElement.Earth, 0, 10000, 0, 0, 1000)];
  
    const result = calculator.computeDamage(attacker, defenders);
  
    expect(result[0].lp).toBe(1000); 
  });

  
});
