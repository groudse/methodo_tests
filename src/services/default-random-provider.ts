import { IRandomProvider } from "./random-provider";

export class DefaultRandomProvider implements IRandomProvider {
  random(): number {
    return Math.random();
  }
}
