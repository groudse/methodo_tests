import { Hero } from '../model/hero';
import { HeroElement } from '../model/hero-element';
import { Buff } from '../model/buff';

export function createMockHero(
  element: HeroElement, 
  pow: number, 
  def: number, 
  leth: number, 
  crtr: number, 
  lp: number, 
  buffs: Buff[] = []
): Hero {
  const hero = new Hero(element, pow, def, leth, crtr, lp);
  hero.buffs = [...buffs];
  return hero;
}

// Attaquants mockés
export const waterAttacker = createMockHero(HeroElement.Water, 1000, 500, 200, 50, 10000);
export const fireAttacker = createMockHero(HeroElement.Fire, 1200, 450, 250, 60, 9000);
export const earthAttacker = createMockHero(HeroElement.Earth, 900, 600, 180, 45, 11000);

// Défenseurs mockés
export const waterDefender = createMockHero(HeroElement.Water, 800, 700, 150, 40, 8000);
export const fireDefender = createMockHero(HeroElement.Fire, 850, 650, 160, 45, 7500);
export const earthDefender = createMockHero(HeroElement.Earth, 750, 800, 140, 35, 9000);

// Défenseurs spéciaux
export const defenderWithDefenseBuff = createMockHero(HeroElement.Water, 800, 700, 150, 40, 8000, [Buff.Defense]);
export const defeatedDefender = createMockHero(HeroElement.Water, 800, 700, 150, 40, 0);
