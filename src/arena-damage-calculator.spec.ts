import { ArenaDamageCalculator } from "./arena-damage-calculator";
import { Hero } from "./model/hero";
import { HeroElement } from "./model/hero-element";
import { Buff } from "./model/buff";

// Mock Math.random pour que les résultats soient déterministes
beforeAll(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.1);
});

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

describe("ArenaDamageCalculator (Approval Tests)", () => {
  const calculator = new ArenaDamageCalculator();

  it("should compute damage without buffs", () => {
    const attacker = createHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
    const defenders = [
      createHero(HeroElement.Fire, 0, 500, 0, 0, 1000),
      createHero(HeroElement.Earth, 0, 500, 0, 0, 1000),
    ];

    const result = calculator.computeDamage(attacker, defenders);

    expect(result).toMatchSnapshot();
  });

  it("should compute damage with attack buff", () => {
    const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000, [Buff.Attack]);
    const defenders = [
      createHero(HeroElement.Earth, 0, 500, 0, 0, 1000),
      createHero(HeroElement.Water, 0, 500, 0, 0, 1000),
    ];

    const result = calculator.computeDamage(attacker, defenders);

    expect(result).toMatchSnapshot();
  });

  it("should compute damage with defense buff", () => {
    const attacker = createHero(HeroElement.Earth, 1000, 0, 0, 0, 1000);
    const defenders = [
      createHero(HeroElement.Fire, 0, 500, 0, 0, 1000, [Buff.Defense]),
      createHero(HeroElement.Water, 0, 500, 0, 0, 1000),
    ];

    const result = calculator.computeDamage(attacker, defenders);

    expect(result).toMatchSnapshot();
  });

  it("should compute damage with critical hit and buffs", () => {
    const attacker = createHero(HeroElement.Water, 1000, 0, 1000, 100, 1000, [Buff.Attack]);
    const defenders = [
      createHero(HeroElement.Fire, 0, 500, 0, 0, 1000, [Buff.Defense]),
      createHero(HeroElement.Earth, 0, 500, 0, 0, 1000),
    ];

    const result = calculator.computeDamage(attacker, defenders);

    expect(result).toMatchSnapshot();
  });

});
