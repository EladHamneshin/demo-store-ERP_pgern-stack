import { expect, test } from 'vitest';
import { add } from "./sun";

test('adds two numbers together', () => {
  expect(add(1, 2)).toBe(3);
});

test('works with negative numbers', () => {
  expect(add(-1, 2)).toBe(1);  
});

test('works with floating point numbers', () => {
  expect(add(0.1, 0.2)).toBeCloseTo(0.3);
});

test('works with very large numbers', () => {
  expect(add(987654321, 123456789)).toBe(1111111110); 
});

