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
  constructor(private readonly randomProvider: IRandomProvider) {}
  computeDamage(attacker: Hero, defenders: Hero[]): Hero[] {
    if (stryMutAct_9fa48("92")) {
      {}
    } else {
      stryCov_9fa48("92");
      const adv: Hero[] = stryMutAct_9fa48("93") ? ["Stryker was here"] : (stryCov_9fa48("93"), []);
      const eq: Hero[] = stryMutAct_9fa48("94") ? ["Stryker was here"] : (stryCov_9fa48("94"), []);
      const dis: Hero[] = stryMutAct_9fa48("95") ? ["Stryker was here"] : (stryCov_9fa48("95"), []);
      for (const h of defenders) {
        if (stryMutAct_9fa48("96")) {
          {}
        } else {
          stryCov_9fa48("96");
          if (stryMutAct_9fa48("100") ? h.lp > 0 : stryMutAct_9fa48("99") ? h.lp < 0 : stryMutAct_9fa48("98") ? false : stryMutAct_9fa48("97") ? true : (stryCov_9fa48("97", "98", "99", "100"), h.lp <= 0)) continue;
          const relation = this.getElementRelation(attacker.element, h.element);
          if (stryMutAct_9fa48("103") ? relation !== "adv" : stryMutAct_9fa48("102") ? false : stryMutAct_9fa48("101") ? true : (stryCov_9fa48("101", "102", "103"), relation === (stryMutAct_9fa48("104") ? "" : (stryCov_9fa48("104"), "adv")))) adv.push(h);else if (stryMutAct_9fa48("107") ? relation !== "eq" : stryMutAct_9fa48("106") ? false : stryMutAct_9fa48("105") ? true : (stryCov_9fa48("105", "106", "107"), relation === (stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "eq")))) eq.push(h);else dis.push(h);
        }
      }
      const attacked = stryMutAct_9fa48("111") ? (adv[Math.floor(this.randomProvider.random() * adv.length)] || eq[Math.floor(this.randomProvider.random() * eq.length)]) && dis[Math.floor(this.randomProvider.random() * dis.length)] : stryMutAct_9fa48("110") ? false : stryMutAct_9fa48("109") ? true : (stryCov_9fa48("109", "110", "111"), (stryMutAct_9fa48("113") ? adv[Math.floor(this.randomProvider.random() * adv.length)] && eq[Math.floor(this.randomProvider.random() * eq.length)] : stryMutAct_9fa48("112") ? false : (stryCov_9fa48("112", "113"), adv[Math.floor(stryMutAct_9fa48("114") ? this.randomProvider.random() / adv.length : (stryCov_9fa48("114"), this.randomProvider.random() * adv.length))] || eq[Math.floor(stryMutAct_9fa48("115") ? this.randomProvider.random() / eq.length : (stryCov_9fa48("115"), this.randomProvider.random() * eq.length))])) || dis[Math.floor(stryMutAct_9fa48("116") ? this.randomProvider.random() / dis.length : (stryCov_9fa48("116"), this.randomProvider.random() * dis.length))]);
      const isCrit = stryMutAct_9fa48("120") ? this.randomProvider.random() * 100 >= attacker.crtr : stryMutAct_9fa48("119") ? this.randomProvider.random() * 100 <= attacker.crtr : stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118", "119", "120"), (stryMutAct_9fa48("121") ? this.randomProvider.random() / 100 : (stryCov_9fa48("121"), this.randomProvider.random() * 100)) < attacker.crtr);
      let dmg = isCrit ? stryMutAct_9fa48("122") ? (attacker.pow + (0.5 + attacker.leth / 5000) * attacker.pow) / (1 - attacked.def / 7500) : (stryCov_9fa48("122"), (stryMutAct_9fa48("123") ? attacker.pow - (0.5 + attacker.leth / 5000) * attacker.pow : (stryCov_9fa48("123"), attacker.pow + (stryMutAct_9fa48("124") ? (0.5 + attacker.leth / 5000) / attacker.pow : (stryCov_9fa48("124"), (stryMutAct_9fa48("125") ? 0.5 - attacker.leth / 5000 : (stryCov_9fa48("125"), 0.5 + (stryMutAct_9fa48("126") ? attacker.leth * 5000 : (stryCov_9fa48("126"), attacker.leth / 5000)))) * attacker.pow)))) * (stryMutAct_9fa48("127") ? 1 + attacked.def / 7500 : (stryCov_9fa48("127"), 1 - (stryMutAct_9fa48("128") ? attacked.def * 7500 : (stryCov_9fa48("128"), attacked.def / 7500))))) : stryMutAct_9fa48("129") ? attacker.pow / (1 - attacked.def / 7500) : (stryCov_9fa48("129"), attacker.pow * (stryMutAct_9fa48("130") ? 1 + attacked.def / 7500 : (stryCov_9fa48("130"), 1 - (stryMutAct_9fa48("131") ? attacked.def * 7500 : (stryCov_9fa48("131"), attacked.def / 7500)))));
      if (stryMutAct_9fa48("133") ? false : stryMutAct_9fa48("132") ? true : (stryCov_9fa48("132", "133"), attacker.buffs.includes(Buff.Attack))) {
        if (stryMutAct_9fa48("134")) {
          {}
        } else {
          stryCov_9fa48("134");
          stryMutAct_9fa48("135") ? dmg -= isCrit ? (attacker.pow * 0.25 + (0.5 + attacker.leth / 5000) * attacker.pow * 0.25) * (1 - attacked.def / 7500) : attacker.pow * 0.25 * (1 - attacked.def / 7500) : (stryCov_9fa48("135"), dmg += isCrit ? stryMutAct_9fa48("136") ? (attacker.pow * 0.25 + (0.5 + attacker.leth / 5000) * attacker.pow * 0.25) / (1 - attacked.def / 7500) : (stryCov_9fa48("136"), (stryMutAct_9fa48("137") ? attacker.pow * 0.25 - (0.5 + attacker.leth / 5000) * attacker.pow * 0.25 : (stryCov_9fa48("137"), (stryMutAct_9fa48("138") ? attacker.pow / 0.25 : (stryCov_9fa48("138"), attacker.pow * 0.25)) + (stryMutAct_9fa48("139") ? (0.5 + attacker.leth / 5000) * attacker.pow / 0.25 : (stryCov_9fa48("139"), (stryMutAct_9fa48("140") ? (0.5 + attacker.leth / 5000) / attacker.pow : (stryCov_9fa48("140"), (stryMutAct_9fa48("141") ? 0.5 - attacker.leth / 5000 : (stryCov_9fa48("141"), 0.5 + (stryMutAct_9fa48("142") ? attacker.leth * 5000 : (stryCov_9fa48("142"), attacker.leth / 5000)))) * attacker.pow)) * 0.25)))) * (stryMutAct_9fa48("143") ? 1 + attacked.def / 7500 : (stryCov_9fa48("143"), 1 - (stryMutAct_9fa48("144") ? attacked.def * 7500 : (stryCov_9fa48("144"), attacked.def / 7500))))) : stryMutAct_9fa48("145") ? attacker.pow * 0.25 / (1 - attacked.def / 7500) : (stryCov_9fa48("145"), (stryMutAct_9fa48("146") ? attacker.pow / 0.25 : (stryCov_9fa48("146"), attacker.pow * 0.25)) * (stryMutAct_9fa48("147") ? 1 + attacked.def / 7500 : (stryCov_9fa48("147"), 1 - (stryMutAct_9fa48("148") ? attacked.def * 7500 : (stryCov_9fa48("148"), attacked.def / 7500))))));
        }
      }
      if (stryMutAct_9fa48("150") ? false : stryMutAct_9fa48("149") ? true : (stryCov_9fa48("149", "150"), attacked.buffs.includes(Buff.Defense))) {
        if (stryMutAct_9fa48("151")) {
          {}
        } else {
          stryCov_9fa48("151");
          dmg = stryMutAct_9fa48("152") ? dmg / (1 - attacked.def / 7500) / (1 - attacked.def / 7500 - 0.25) : (stryCov_9fa48("152"), (stryMutAct_9fa48("153") ? dmg * (1 - attacked.def / 7500) : (stryCov_9fa48("153"), dmg / (stryMutAct_9fa48("154") ? 1 + attacked.def / 7500 : (stryCov_9fa48("154"), 1 - (stryMutAct_9fa48("155") ? attacked.def * 7500 : (stryCov_9fa48("155"), attacked.def / 7500)))))) * (stryMutAct_9fa48("156") ? 1 - attacked.def / 7500 + 0.25 : (stryCov_9fa48("156"), (stryMutAct_9fa48("157") ? 1 + attacked.def / 7500 : (stryCov_9fa48("157"), 1 - (stryMutAct_9fa48("158") ? attacked.def * 7500 : (stryCov_9fa48("158"), attacked.def / 7500)))) - 0.25)));
        }
      }
      dmg = Math.max(dmg, 0);
      if (stryMutAct_9fa48("162") ? dmg <= 0 : stryMutAct_9fa48("161") ? dmg >= 0 : stryMutAct_9fa48("160") ? false : stryMutAct_9fa48("159") ? true : (stryCov_9fa48("159", "160", "161", "162"), dmg > 0)) {
        if (stryMutAct_9fa48("163")) {
          {}
        } else {
          stryCov_9fa48("163");
          const relation = adv.includes(attacked) ? stryMutAct_9fa48("164") ? "" : (stryCov_9fa48("164"), "adv") : eq.includes(attacked) ? stryMutAct_9fa48("165") ? "" : (stryCov_9fa48("165"), "eq") : stryMutAct_9fa48("166") ? "" : (stryCov_9fa48("166"), "dis");
          dmg = Math.floor((stryMutAct_9fa48("169") ? relation !== "adv" : stryMutAct_9fa48("168") ? false : stryMutAct_9fa48("167") ? true : (stryCov_9fa48("167", "168", "169"), relation === (stryMutAct_9fa48("170") ? "" : (stryCov_9fa48("170"), "adv")))) ? stryMutAct_9fa48("171") ? dmg / 1.2 : (stryCov_9fa48("171"), dmg * 1.2) : (stryMutAct_9fa48("174") ? relation !== "dis" : stryMutAct_9fa48("173") ? false : stryMutAct_9fa48("172") ? true : (stryCov_9fa48("172", "173", "174"), relation === (stryMutAct_9fa48("175") ? "" : (stryCov_9fa48("175"), "dis")))) ? stryMutAct_9fa48("176") ? dmg / 0.8 : (stryCov_9fa48("176"), dmg * 0.8) : dmg);
          attacked.lp = Math.max(stryMutAct_9fa48("177") ? attacked.lp + dmg : (stryCov_9fa48("177"), attacked.lp - dmg), 0);
        }
      }
      return defenders;
    }
  }
  private getElementRelation(att: HeroElement, def: HeroElement): "adv" | "eq" | "dis" {
    if (stryMutAct_9fa48("178")) {
      {}
    } else {
      stryCov_9fa48("178");
      if (stryMutAct_9fa48("181") ? att !== def : stryMutAct_9fa48("180") ? false : stryMutAct_9fa48("179") ? true : (stryCov_9fa48("179", "180", "181"), att === def)) return stryMutAct_9fa48("182") ? "" : (stryCov_9fa48("182"), "eq");
      if (stryMutAct_9fa48("185") ? (att === HeroElement.Water && def === HeroElement.Fire || att === HeroElement.Fire && def === HeroElement.Earth) && att === HeroElement.Earth && def === HeroElement.Water : stryMutAct_9fa48("184") ? false : stryMutAct_9fa48("183") ? true : (stryCov_9fa48("183", "184", "185"), (stryMutAct_9fa48("187") ? att === HeroElement.Water && def === HeroElement.Fire && att === HeroElement.Fire && def === HeroElement.Earth : stryMutAct_9fa48("186") ? false : (stryCov_9fa48("186", "187"), (stryMutAct_9fa48("189") ? att === HeroElement.Water || def === HeroElement.Fire : stryMutAct_9fa48("188") ? false : (stryCov_9fa48("188", "189"), (stryMutAct_9fa48("191") ? att !== HeroElement.Water : stryMutAct_9fa48("190") ? true : (stryCov_9fa48("190", "191"), att === HeroElement.Water)) && (stryMutAct_9fa48("193") ? def !== HeroElement.Fire : stryMutAct_9fa48("192") ? true : (stryCov_9fa48("192", "193"), def === HeroElement.Fire)))) || (stryMutAct_9fa48("195") ? att === HeroElement.Fire || def === HeroElement.Earth : stryMutAct_9fa48("194") ? false : (stryCov_9fa48("194", "195"), (stryMutAct_9fa48("197") ? att !== HeroElement.Fire : stryMutAct_9fa48("196") ? true : (stryCov_9fa48("196", "197"), att === HeroElement.Fire)) && (stryMutAct_9fa48("199") ? def !== HeroElement.Earth : stryMutAct_9fa48("198") ? true : (stryCov_9fa48("198", "199"), def === HeroElement.Earth)))))) || (stryMutAct_9fa48("201") ? att === HeroElement.Earth || def === HeroElement.Water : stryMutAct_9fa48("200") ? false : (stryCov_9fa48("200", "201"), (stryMutAct_9fa48("203") ? att !== HeroElement.Earth : stryMutAct_9fa48("202") ? true : (stryCov_9fa48("202", "203"), att === HeroElement.Earth)) && (stryMutAct_9fa48("205") ? def !== HeroElement.Water : stryMutAct_9fa48("204") ? true : (stryCov_9fa48("204", "205"), def === HeroElement.Water)))))) {
        if (stryMutAct_9fa48("206")) {
          {}
        } else {
          stryCov_9fa48("206");
          return stryMutAct_9fa48("207") ? "" : (stryCov_9fa48("207"), "adv");
        }
      }
      return stryMutAct_9fa48("208") ? "" : (stryCov_9fa48("208"), "dis");
    }
  }
}