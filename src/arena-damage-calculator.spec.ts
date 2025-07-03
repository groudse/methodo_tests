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


});
