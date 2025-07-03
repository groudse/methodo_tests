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
import { IRandomProvider } from "./services/random-provider";
import { Hero } from "./model/hero";
import { Buff } from "./model/buff";
import { HeroElement } from "./model/hero-element";
export class ArenaDamageCalculator {
  constructor(private randomProvider: IRandomProvider) {}
  computeDamage(attacker: Hero, defenders: Hero[]): Hero[] {
    if (stryMutAct_9fa48("0")) {
      {}
    } else {
      stryCov_9fa48("0");
      const pow = attacker.pow;
      const adv: Hero[] = stryMutAct_9fa48("1") ? ["Stryker was here"] : (stryCov_9fa48("1"), []);
      const eq: Hero[] = stryMutAct_9fa48("2") ? ["Stryker was here"] : (stryCov_9fa48("2"), []);
      const dis: Hero[] = stryMutAct_9fa48("3") ? ["Stryker was here"] : (stryCov_9fa48("3"), []);
      for (const h of defenders) {
        if (stryMutAct_9fa48("4")) {
          {}
        } else {
          stryCov_9fa48("4");
          if (stryMutAct_9fa48("8") ? h.lp > 0 : stryMutAct_9fa48("7") ? h.lp < 0 : stryMutAct_9fa48("6") ? false : stryMutAct_9fa48("5") ? true : (stryCov_9fa48("5", "6", "7", "8"), h.lp <= 0)) continue;
          const relation = this.getElementRelation(attacker.element, h.element);
          if (stryMutAct_9fa48("11") ? relation !== "adv" : stryMutAct_9fa48("10") ? false : stryMutAct_9fa48("9") ? true : (stryCov_9fa48("9", "10", "11"), relation === (stryMutAct_9fa48("12") ? "" : (stryCov_9fa48("12"), "adv")))) adv.push(h);else if (stryMutAct_9fa48("15") ? relation !== "eq" : stryMutAct_9fa48("14") ? false : stryMutAct_9fa48("13") ? true : (stryCov_9fa48("13", "14", "15"), relation === (stryMutAct_9fa48("16") ? "" : (stryCov_9fa48("16"), "eq")))) eq.push(h);else dis.push(h);
        }
      }
      const attacked = stryMutAct_9fa48("19") ? (adv[Math.floor(this.randomProvider.random() * adv.length)] || eq[Math.floor(this.randomProvider.random() * eq.length)]) && dis[Math.floor(this.randomProvider.random() * dis.length)] : stryMutAct_9fa48("18") ? false : stryMutAct_9fa48("17") ? true : (stryCov_9fa48("17", "18", "19"), (stryMutAct_9fa48("21") ? adv[Math.floor(this.randomProvider.random() * adv.length)] && eq[Math.floor(this.randomProvider.random() * eq.length)] : stryMutAct_9fa48("20") ? false : (stryCov_9fa48("20", "21"), adv[Math.floor(stryMutAct_9fa48("22") ? this.randomProvider.random() / adv.length : (stryCov_9fa48("22"), this.randomProvider.random() * adv.length))] || eq[Math.floor(stryMutAct_9fa48("23") ? this.randomProvider.random() / eq.length : (stryCov_9fa48("23"), this.randomProvider.random() * eq.length))])) || dis[Math.floor(stryMutAct_9fa48("24") ? this.randomProvider.random() / dis.length : (stryCov_9fa48("24"), this.randomProvider.random() * dis.length))]);
      const isCrit = stryMutAct_9fa48("28") ? this.randomProvider.random() * 100 >= attacker.crtr : stryMutAct_9fa48("27") ? this.randomProvider.random() * 100 <= attacker.crtr : stryMutAct_9fa48("26") ? false : stryMutAct_9fa48("25") ? true : (stryCov_9fa48("25", "26", "27", "28"), (stryMutAct_9fa48("29") ? this.randomProvider.random() / 100 : (stryCov_9fa48("29"), this.randomProvider.random() * 100)) < attacker.crtr);
      let dmg = isCrit ? stryMutAct_9fa48("30") ? (attacker.pow + (0.5 + attacker.leth / 5000) * attacker.pow) / (1 - attacked.def / 7500) : (stryCov_9fa48("30"), (stryMutAct_9fa48("31") ? attacker.pow - (0.5 + attacker.leth / 5000) * attacker.pow : (stryCov_9fa48("31"), attacker.pow + (stryMutAct_9fa48("32") ? (0.5 + attacker.leth / 5000) / attacker.pow : (stryCov_9fa48("32"), (stryMutAct_9fa48("33") ? 0.5 - attacker.leth / 5000 : (stryCov_9fa48("33"), 0.5 + (stryMutAct_9fa48("34") ? attacker.leth * 5000 : (stryCov_9fa48("34"), attacker.leth / 5000)))) * attacker.pow)))) * (stryMutAct_9fa48("35") ? 1 + attacked.def / 7500 : (stryCov_9fa48("35"), 1 - (stryMutAct_9fa48("36") ? attacked.def * 7500 : (stryCov_9fa48("36"), attacked.def / 7500))))) : stryMutAct_9fa48("37") ? attacker.pow / (1 - attacked.def / 7500) : (stryCov_9fa48("37"), attacker.pow * (stryMutAct_9fa48("38") ? 1 + attacked.def / 7500 : (stryCov_9fa48("38"), 1 - (stryMutAct_9fa48("39") ? attacked.def * 7500 : (stryCov_9fa48("39"), attacked.def / 7500)))));
      if (stryMutAct_9fa48("41") ? false : stryMutAct_9fa48("40") ? true : (stryCov_9fa48("40", "41"), attacker.buffs.includes(Buff.Attack))) {
        if (stryMutAct_9fa48("42")) {
          {}
        } else {
          stryCov_9fa48("42");
          stryMutAct_9fa48("43") ? dmg -= isCrit ? (attacker.pow * 0.25 + (0.5 + attacker.leth / 5000) * attacker.pow * 0.25) * (1 - attacked.def / 7500) : attacker.pow * 0.25 * (1 - attacked.def / 7500) : (stryCov_9fa48("43"), dmg += isCrit ? stryMutAct_9fa48("44") ? (attacker.pow * 0.25 + (0.5 + attacker.leth / 5000) * attacker.pow * 0.25) / (1 - attacked.def / 7500) : (stryCov_9fa48("44"), (stryMutAct_9fa48("45") ? attacker.pow * 0.25 - (0.5 + attacker.leth / 5000) * attacker.pow * 0.25 : (stryCov_9fa48("45"), (stryMutAct_9fa48("46") ? attacker.pow / 0.25 : (stryCov_9fa48("46"), attacker.pow * 0.25)) + (stryMutAct_9fa48("47") ? (0.5 + attacker.leth / 5000) * attacker.pow / 0.25 : (stryCov_9fa48("47"), (stryMutAct_9fa48("48") ? (0.5 + attacker.leth / 5000) / attacker.pow : (stryCov_9fa48("48"), (stryMutAct_9fa48("49") ? 0.5 - attacker.leth / 5000 : (stryCov_9fa48("49"), 0.5 + (stryMutAct_9fa48("50") ? attacker.leth * 5000 : (stryCov_9fa48("50"), attacker.leth / 5000)))) * attacker.pow)) * 0.25)))) * (stryMutAct_9fa48("51") ? 1 + attacked.def / 7500 : (stryCov_9fa48("51"), 1 - (stryMutAct_9fa48("52") ? attacked.def * 7500 : (stryCov_9fa48("52"), attacked.def / 7500))))) : stryMutAct_9fa48("53") ? attacker.pow * 0.25 / (1 - attacked.def / 7500) : (stryCov_9fa48("53"), (stryMutAct_9fa48("54") ? attacker.pow / 0.25 : (stryCov_9fa48("54"), attacker.pow * 0.25)) * (stryMutAct_9fa48("55") ? 1 + attacked.def / 7500 : (stryCov_9fa48("55"), 1 - (stryMutAct_9fa48("56") ? attacked.def * 7500 : (stryCov_9fa48("56"), attacked.def / 7500))))));
        }
      }
      if (stryMutAct_9fa48("58") ? false : stryMutAct_9fa48("57") ? true : (stryCov_9fa48("57", "58"), attacked.buffs.includes(Buff.Defense))) {
        if (stryMutAct_9fa48("59")) {
          {}
        } else {
          stryCov_9fa48("59");
          dmg = stryMutAct_9fa48("60") ? dmg / (1 - attacked.def / 7500) / (1 - attacked.def / 7500 - 0.25) : (stryCov_9fa48("60"), (stryMutAct_9fa48("61") ? dmg * (1 - attacked.def / 7500) : (stryCov_9fa48("61"), dmg / (stryMutAct_9fa48("62") ? 1 + attacked.def / 7500 : (stryCov_9fa48("62"), 1 - (stryMutAct_9fa48("63") ? attacked.def * 7500 : (stryCov_9fa48("63"), attacked.def / 7500)))))) * (stryMutAct_9fa48("64") ? 1 - attacked.def / 7500 + 0.25 : (stryCov_9fa48("64"), (stryMutAct_9fa48("65") ? 1 + attacked.def / 7500 : (stryCov_9fa48("65"), 1 - (stryMutAct_9fa48("66") ? attacked.def * 7500 : (stryCov_9fa48("66"), attacked.def / 7500)))) - 0.25)));
        }
      }
      dmg = Math.max(dmg, 0);
      if (stryMutAct_9fa48("70") ? dmg <= 0 : stryMutAct_9fa48("69") ? dmg >= 0 : stryMutAct_9fa48("68") ? false : stryMutAct_9fa48("67") ? true : (stryCov_9fa48("67", "68", "69", "70"), dmg > 0)) {
        if (stryMutAct_9fa48("71")) {
          {}
        } else {
          stryCov_9fa48("71");
          const relation = adv.includes(attacked) ? stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), "adv") : eq.includes(attacked) ? stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "eq") : stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "dis");
          dmg = Math.floor((stryMutAct_9fa48("77") ? relation !== "adv" : stryMutAct_9fa48("76") ? false : stryMutAct_9fa48("75") ? true : (stryCov_9fa48("75", "76", "77"), relation === (stryMutAct_9fa48("78") ? "" : (stryCov_9fa48("78"), "adv")))) ? stryMutAct_9fa48("79") ? dmg / 1.2 : (stryCov_9fa48("79"), dmg * 1.2) : (stryMutAct_9fa48("82") ? relation !== "dis" : stryMutAct_9fa48("81") ? false : stryMutAct_9fa48("80") ? true : (stryCov_9fa48("80", "81", "82"), relation === (stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "dis")))) ? stryMutAct_9fa48("84") ? dmg / 0.8 : (stryCov_9fa48("84"), dmg * 0.8) : dmg);
          attacked.lp = Math.max(stryMutAct_9fa48("85") ? attacked.lp + dmg : (stryCov_9fa48("85"), attacked.lp - dmg), 0);
        }
      }
      return defenders;
    }
  }
  private getElementRelation(att: HeroElement, def: HeroElement): "adv" | "eq" | "dis" {
    if (stryMutAct_9fa48("86")) {
      {}
    } else {
      stryCov_9fa48("86");
      if (stryMutAct_9fa48("89") ? att !== def : stryMutAct_9fa48("88") ? false : stryMutAct_9fa48("87") ? true : (stryCov_9fa48("87", "88", "89"), att === def)) return stryMutAct_9fa48("90") ? "" : (stryCov_9fa48("90"), "eq");
      if (stryMutAct_9fa48("93") ? (att === HeroElement.Water && def === HeroElement.Fire || att === HeroElement.Fire && def === HeroElement.Earth) && att === HeroElement.Earth && def === HeroElement.Water : stryMutAct_9fa48("92") ? false : stryMutAct_9fa48("91") ? true : (stryCov_9fa48("91", "92", "93"), (stryMutAct_9fa48("95") ? att === HeroElement.Water && def === HeroElement.Fire && att === HeroElement.Fire && def === HeroElement.Earth : stryMutAct_9fa48("94") ? false : (stryCov_9fa48("94", "95"), (stryMutAct_9fa48("97") ? att === HeroElement.Water || def === HeroElement.Fire : stryMutAct_9fa48("96") ? false : (stryCov_9fa48("96", "97"), (stryMutAct_9fa48("99") ? att !== HeroElement.Water : stryMutAct_9fa48("98") ? true : (stryCov_9fa48("98", "99"), att === HeroElement.Water)) && (stryMutAct_9fa48("101") ? def !== HeroElement.Fire : stryMutAct_9fa48("100") ? true : (stryCov_9fa48("100", "101"), def === HeroElement.Fire)))) || (stryMutAct_9fa48("103") ? att === HeroElement.Fire || def === HeroElement.Earth : stryMutAct_9fa48("102") ? false : (stryCov_9fa48("102", "103"), (stryMutAct_9fa48("105") ? att !== HeroElement.Fire : stryMutAct_9fa48("104") ? true : (stryCov_9fa48("104", "105"), att === HeroElement.Fire)) && (stryMutAct_9fa48("107") ? def !== HeroElement.Earth : stryMutAct_9fa48("106") ? true : (stryCov_9fa48("106", "107"), def === HeroElement.Earth)))))) || (stryMutAct_9fa48("109") ? att === HeroElement.Earth || def === HeroElement.Water : stryMutAct_9fa48("108") ? false : (stryCov_9fa48("108", "109"), (stryMutAct_9fa48("111") ? att !== HeroElement.Earth : stryMutAct_9fa48("110") ? true : (stryCov_9fa48("110", "111"), att === HeroElement.Earth)) && (stryMutAct_9fa48("113") ? def !== HeroElement.Water : stryMutAct_9fa48("112") ? true : (stryCov_9fa48("112", "113"), def === HeroElement.Water)))))) {
        if (stryMutAct_9fa48("114")) {
          {}
        } else {
          stryCov_9fa48("114");
          return stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), "adv");
        }
      }
      return stryMutAct_9fa48("116") ? "" : (stryCov_9fa48("116"), "dis");
    }
  }
}