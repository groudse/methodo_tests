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
export class MockRandomProvider implements IRandomProvider {
  private readonly values: number[];
  private index = 0;
  constructor(values: number[]) {
    if (stryMutAct_9fa48("209")) {
      {}
    } else {
      stryCov_9fa48("209");
      this.values = values;
    }
  }
  random(): number {
    if (stryMutAct_9fa48("210")) {
      {}
    } else {
      stryCov_9fa48("210");
      return this.values[stryMutAct_9fa48("211") ? this.index++ * this.values.length : (stryCov_9fa48("211"), (stryMutAct_9fa48("212") ? this.index-- : (stryCov_9fa48("212"), this.index++)) % this.values.length)];
    }
  }
}