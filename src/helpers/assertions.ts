import { expect } from '@playwright/test';

export function expectNumberClose(a: number, b: number, tolerance = 0.01) {
  expect(Math.abs(a - b)).toBeLessThanOrEqual(tolerance);
}
