import { IRandomProvider } from "./services/random-provider";
import { Hero } from "./model/hero";
import { Buff } from "./model/buff";
import { HeroElement } from "./model/hero-element";

export class ArenaDamageCalculator {
  constructor(private readonly randomProvider: IRandomProvider) {}

  computeDamage(attacker: Hero, defenders: Hero[]): Hero[] {


    const adv: Hero[] = [];
    const eq: Hero[] = [];
    const dis: Hero[] = [];

    for (const h of defenders) {
      if (h.lp <= 0) continue;

      const relation = this.getElementRelation(attacker.element, h.element);
      if (relation === "adv") adv.push(h);
      else if (relation === "eq") eq.push(h);
      else dis.push(h);
    }

    const attacked =
      adv[Math.floor(this.randomProvider.random() * adv.length)] ||
      eq[Math.floor(this.randomProvider.random() * eq.length)] ||
      dis[Math.floor(this.randomProvider.random() * dis.length)];

    const isCrit = this.randomProvider.random() * 100 < attacker.crtr;
    let dmg = isCrit
      ? (attacker.pow + (0.5 + attacker.leth / 5000) * attacker.pow) * (1 - attacked.def / 7500)
      : attacker.pow * (1 - attacked.def / 7500);

    if (attacker.buffs.includes(Buff.Attack)) {
      dmg += isCrit
        ? (attacker.pow * 0.25 + (0.5 + attacker.leth / 5000) * attacker.pow * 0.25) * (1 - attacked.def / 7500)
        : attacker.pow * 0.25 * (1 - attacked.def / 7500);
    }

    if (attacked.buffs.includes(Buff.Defense)) {
      dmg = dmg / (1 - attacked.def / 7500) * (1 - attacked.def / 7500 - 0.25);
    }

    dmg = Math.max(dmg, 0);

    if (dmg > 0) {
      const relation = adv.includes(attacked) ? "adv" : eq.includes(attacked) ? "eq" : "dis";
      dmg = Math.floor(
        relation === "adv"
          ? dmg * 1.2
          : relation === "dis"
          ? dmg * 0.8
          : dmg
      );

      attacked.lp = Math.max(attacked.lp - dmg, 0);
    }

    return defenders;
  }

  private getElementRelation(att: HeroElement, def: HeroElement): "adv" | "eq" | "dis" {
    if (att === def) return "eq";
    if (
      (att === HeroElement.Water && def === HeroElement.Fire) ||
      (att === HeroElement.Fire && def === HeroElement.Earth) ||
      (att === HeroElement.Earth && def === HeroElement.Water)
    ) {
      return "adv";
    }
    return "dis";
  }
}
