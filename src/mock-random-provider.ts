import { IRandomProvider } from "./services/random-provider";

export class MockRandomProvider implements IRandomProvider {
  private readonly values: number[];
  private index = 0;

  constructor(values: number[]) {
    this.values = values;
  }

  random(): number {
    return this.values[this.index++ % this.values.length];
  }
}
