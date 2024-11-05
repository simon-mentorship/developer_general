import { add } from '../src/string-calculator';

// Write a test that checks if the `add` function returns `0` when an empty string is passed
test('returns 0 for an empty string', () => {
  expect(add('')).toBe(0);
});

// Write a test that checks if the `add` function returns the number when a single number is passed
test('returns the number for a single number', () => {
  expect(add('5')).toBe(5);
});

// Write a test that checks if the `add` function returns the sum of two numbers when two numbers are passed
test('returns the sum of two numbers', () => {
  expect(add('5,3')).toBe(8);
});

// Write a test that checks if the `add` function returns the sum of any amount of numbers when any amount of numbers are passed
test('returns the sum of any amount of numbers', () => {
  expect(add('1,2,3,4,5')).toBe(15);
  expect(add('1,2,3,4,5,6')).toBe(21);
});

// Write a test that checks if the `add` function returns the sum of numbers when new line breaks and commas are interchangeable between numbers
test('returns the sum of numbers when new line breaks and commas are interchangeable between numbers', () => {
  expect(add('1\n2,3')).toBe(6);
  expect(add('1,2\n3')).toBe(6);
});

// Write a test that checks if the `add` function returns the sum of numbers when a different delimiter is used
test('returns the sum of numbers when a different delimiter is used', () => {
  expect(add('//;\n1;2')).toBe(3);
  expect(add('//|\n1|2|3')).toBe(6);
});

// Write a test that checks if the `add` function throws an error when a negative number is passed
test('throws an error for negative numbers', () => {
  expect(() => add('1,-2')).toThrow('Negatives not allowed: -2');
  expect(() => add('1,-2,-3')).toThrow('Negatives not allowed: -2, -3');
});

// Write a test that checks if the `add` function ignores numbers greater than 1000
test('ignores numbers greater than 1000', () => {
  expect(add('2,1001')).toBe(2);
  expect(add('1001,1002')).toBe(0);
});

// Write a test that checks if the `add` function accepts a custom delimiter of any length with the format: `"//[delimiter]\n"`
test('returns the sum of numbers when a custom delimiter is used', () => {
  expect(add('//[***]\n1***2***3')).toBe(6);
  expect(add('//[|||]\n1|||2|||3')).toBe(6);
});