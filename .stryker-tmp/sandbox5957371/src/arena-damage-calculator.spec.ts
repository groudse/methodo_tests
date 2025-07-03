// @ts-nocheck
function stryNS_9fa48() {
  var g = new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { ArenaDamageCalculator } from "../src/arena-damage-calculator";
import { Hero } from "../src/model/hero";
import { HeroElement } from "../src/model/hero-element";
import { Buff } from "../src/model/buff";
import { MockRandomProvider } from "./mock-random-provider";
function createHero(element: HeroElement, pow: number, def: number, leth: number, crtr: number, lp: number, buffs: Buff[] = stryMutAct_9fa48("0") ? ["Stryker was here"] : (stryCov_9fa48("0"), [])): Hero {
  if (stryMutAct_9fa48("1")) {
    {}
  } else {
    stryCov_9fa48("1");
    const h = new Hero(element, pow, def, leth, crtr, lp);
    h.buffs = buffs;
    return h;
  }
}
describe(stryMutAct_9fa48("2") ? "" : (stryCov_9fa48("2"), "ArenaDamageCalculator with interface-based mocking"), () => {
  if (stryMutAct_9fa48("3")) {
    {}
  } else {
    stryCov_9fa48("3");
    it(stryMutAct_9fa48("4") ? "" : (stryCov_9fa48("4"), "should match snapshot for known randomness sequence"), () => {
      if (stryMutAct_9fa48("5")) {
        {}
      } else {
        stryCov_9fa48("5");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("6") ? [] : (stryCov_9fa48("6"), [0.1, 0.2, 0.3]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 500, 100, 1000, stryMutAct_9fa48("7") ? [] : (stryCov_9fa48("7"), [Buff.Attack]));
        const defenders = stryMutAct_9fa48("8") ? [] : (stryCov_9fa48("8"), [createHero(HeroElement.Earth, 0, 500, 0, 0, 1000), createHero(HeroElement.Water, 0, 500, 0, 0, 1000, stryMutAct_9fa48("9") ? [] : (stryCov_9fa48("9"), [Buff.Defense]))]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("10") ? "" : (stryCov_9fa48("10"), "should compute basic damage without buffs or crit"), () => {
      if (stryMutAct_9fa48("11")) {
        {}
      } else {
        stryCov_9fa48("11");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("12") ? [] : (stryCov_9fa48("12"), [0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("13") ? [] : (stryCov_9fa48("13"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("14") ? "" : (stryCov_9fa48("14"), "should apply critical hit without buffs"), () => {
      if (stryMutAct_9fa48("15")) {
        {}
      } else {
        stryCov_9fa48("15");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("16") ? [] : (stryCov_9fa48("16"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 500, 100, 1000);
        const defenders = stryMutAct_9fa48("17") ? [] : (stryCov_9fa48("17"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), "should apply defender's Defense buff correctly"), () => {
      if (stryMutAct_9fa48("19")) {
        {}
      } else {
        stryCov_9fa48("19");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("20") ? [] : (stryCov_9fa48("20"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("21") ? [] : (stryCov_9fa48("21"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000, stryMutAct_9fa48("22") ? [] : (stryCov_9fa48("22"), [Buff.Defense]))]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("23") ? "" : (stryCov_9fa48("23"), "should reduce damage by 20% when attacker is at elemental disadvantage"), () => {
      if (stryMutAct_9fa48("24")) {
        {}
      } else {
        stryCov_9fa48("24");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("25") ? [] : (stryCov_9fa48("25"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("26") ? [] : (stryCov_9fa48("26"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("27") ? "" : (stryCov_9fa48("27"), "should never result in negative damage"), () => {
      if (stryMutAct_9fa48("28")) {
        {}
      } else {
        stryCov_9fa48("28");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("29") ? [] : (stryCov_9fa48("29"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("30") ? [] : (stryCov_9fa48("30"), [createHero(HeroElement.Earth, 0, 10000, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("31") ? "" : (stryCov_9fa48("31"), "should combine critical hit, attack buff, and defense buff"), () => {
      if (stryMutAct_9fa48("32")) {
        {}
      } else {
        stryCov_9fa48("32");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("33") ? [] : (stryCov_9fa48("33"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 1000, 100, 1000, stryMutAct_9fa48("34") ? [] : (stryCov_9fa48("34"), [Buff.Attack]));
        const defenders = stryMutAct_9fa48("35") ? [] : (stryCov_9fa48("35"), [createHero(HeroElement.Earth, 0, 500, 0, 0, 1000, stryMutAct_9fa48("36") ? [] : (stryCov_9fa48("36"), [Buff.Defense]))]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("37") ? "" : (stryCov_9fa48("37"), "should handle element equality and push to eq[]"), () => {
      if (stryMutAct_9fa48("38")) {
        {}
      } else {
        stryCov_9fa48("38");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("39") ? [] : (stryCov_9fa48("39"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("40") ? [] : (stryCov_9fa48("40"), [createHero(HeroElement.Fire, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("41") ? "" : (stryCov_9fa48("41"), "should handle element disadvantage and push to dis[]"), () => {
      if (stryMutAct_9fa48("42")) {
        {}
      } else {
        stryCov_9fa48("42");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("43") ? [] : (stryCov_9fa48("43"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Water, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("44") ? [] : (stryCov_9fa48("44"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("45") ? "" : (stryCov_9fa48("45"), "should apply attack buff without critical hit"), () => {
      if (stryMutAct_9fa48("46")) {
        {}
      } else {
        stryCov_9fa48("46");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("47") ? [] : (stryCov_9fa48("47"), [0.0, 1.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000, stryMutAct_9fa48("48") ? [] : (stryCov_9fa48("48"), [Buff.Attack]));
        const defenders = stryMutAct_9fa48("49") ? [] : (stryCov_9fa48("49"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("50") ? "" : (stryCov_9fa48("50"), "should reduce damage due to defense buff on defender"), () => {
      if (stryMutAct_9fa48("51")) {
        {}
      } else {
        stryCov_9fa48("51");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("52") ? [] : (stryCov_9fa48("52"), [0.0, 1.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("53") ? [] : (stryCov_9fa48("53"), [createHero(HeroElement.Earth, 0, 500, 0, 0, 1000, stryMutAct_9fa48("54") ? [] : (stryCov_9fa48("54"), [Buff.Defense]))]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("55") ? "" : (stryCov_9fa48("55"), "should go through dmg > 0 branch"), () => {
      if (stryMutAct_9fa48("56")) {
        {}
      } else {
        stryCov_9fa48("56");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("57") ? [] : (stryCov_9fa48("57"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 100, 1000);
        const defenders = stryMutAct_9fa48("58") ? [] : (stryCov_9fa48("58"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("59") ? "" : (stryCov_9fa48("59"), "should apply 1.2x multiplier for elemental advantage"), () => {
      if (stryMutAct_9fa48("60")) {
        {}
      } else {
        stryCov_9fa48("60");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("61") ? [] : (stryCov_9fa48("61"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("62") ? [] : (stryCov_9fa48("62"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("63") ? "" : (stryCov_9fa48("63"), "should not set lp below 0 when damage exceeds lp"), () => {
      if (stryMutAct_9fa48("64")) {
        {}
      } else {
        stryCov_9fa48("64");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("65") ? [] : (stryCov_9fa48("65"), [0.0, 0.0])); // adv, crit
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 10000, 0, 500, 100, 1000);
        const defenders = stryMutAct_9fa48("66") ? [] : (stryCov_9fa48("66"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 200)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result).toMatchSnapshot();
      }
    });
    it(stryMutAct_9fa48("67") ? "" : (stryCov_9fa48("67"), "should classify defender as equal element (eq.push)"), () => {
      if (stryMutAct_9fa48("68")) {
        {}
      } else {
        stryCov_9fa48("68");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("69") ? [] : (stryCov_9fa48("69"), [0.0, 0.0])); // eq used
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("70") ? [] : (stryCov_9fa48("70"), [createHero(HeroElement.Fire, 0, 0, 0, 0, 1000)]); // same element

        const result = calculator.computeDamage(attacker, defenders);
        expect(result[0].lp).toBeLessThan(1000); // ensure damage was done
      }
    });

    it(stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), "should not allow lp to go below 0 (lp = Math.max(..., 0))"), () => {
      if (stryMutAct_9fa48("72")) {
        {}
      } else {
        stryCov_9fa48("72");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("73") ? [] : (stryCov_9fa48("73"), [0.0, 0.0])); // adv, crit
        const calculator = new ArenaDamageCalculator(mockRandom);

        // Attaquant très puissant vs cible très faible
        const attacker = createHero(HeroElement.Fire, 10000, 0, 1000, 100, 1000);
        const defenders = stryMutAct_9fa48("74") ? [] : (stryCov_9fa48("74"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 100)]); // faible LP

        const result = calculator.computeDamage(attacker, defenders);
        expect(result[0].lp).toBe(0); // vérifie qu'on n'est pas passé sous 0
      }
    });

    it(stryMutAct_9fa48("75") ? "" : (stryCov_9fa48("75"), "should skip defenders with 0 or less lp"), () => {
      if (stryMutAct_9fa48("76")) {
        {}
      } else {
        stryCov_9fa48("76");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("77") ? [] : (stryCov_9fa48("77"), [0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000);
        const defenders = stryMutAct_9fa48("78") ? [] : (stryCov_9fa48("78"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 0), createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result[0].lp).toBe(0);
        expect(result[1].lp).toBeLessThan(1000);
      }
    });
    it(stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), "should apply critical hit when random < crtr"), () => {
      if (stryMutAct_9fa48("80")) {
        {}
      } else {
        stryCov_9fa48("80");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("81") ? [] : (stryCov_9fa48("81"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 500, 100, 1000);
        const defenders = stryMutAct_9fa48("82") ? [] : (stryCov_9fa48("82"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result[0].lp).toBeLessThan(1000);
      }
    });
    it(stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "should apply attack buff without crit"), () => {
      if (stryMutAct_9fa48("84")) {
        {}
      } else {
        stryCov_9fa48("84");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("85") ? [] : (stryCov_9fa48("85"), [0.0, 1.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 0, 1000, stryMutAct_9fa48("86") ? [] : (stryCov_9fa48("86"), [Buff.Attack]));
        const defenders = stryMutAct_9fa48("87") ? [] : (stryCov_9fa48("87"), [createHero(HeroElement.Earth, 0, 0, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result[0].lp).toBeLessThan(1000);
      }
    });
    it(stryMutAct_9fa48("88") ? "" : (stryCov_9fa48("88"), "should not modify defender if damage is 0 or less"), () => {
      if (stryMutAct_9fa48("89")) {
        {}
      } else {
        stryCov_9fa48("89");
        const mockRandom = new MockRandomProvider(stryMutAct_9fa48("90") ? [] : (stryCov_9fa48("90"), [0.0, 0.0]));
        const calculator = new ArenaDamageCalculator(mockRandom);
        const attacker = createHero(HeroElement.Fire, 1000, 0, 0, 100, 1000);
        const defenders = stryMutAct_9fa48("91") ? [] : (stryCov_9fa48("91"), [createHero(HeroElement.Earth, 0, 10000, 0, 0, 1000)]);
        const result = calculator.computeDamage(attacker, defenders);
        expect(result[0].lp).toBe(1000);
      }
    });
  }
});