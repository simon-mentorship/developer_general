# Step by step guide to solving the kata string calculator

## Step 1: Initiate a node.js project with TypeScript and Jest

1. Create a new directory for the project

```bash
mkdir string-calculator
cd string-calculator
```

2. Initialize a new node.js project

```bash
npm init -y
```

3. Install TypeScript and Jest

```bash
npm install --save-dev typescript jest ts-jest @types/jest
```

4. Initialize TypeScript

```bash
npx tsc --init
```

5. Configure Jest to Work with TypeScript

```bash
npx ts-jest config:init
```

6. Configure Jest as the test runner in `package.json`

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

7. Include the TypeScript folders

```json
{
  "compilerOptions": {
    "moduleResolution": "node10",
  },
  "include": ["src", "tests"]
}
```

Step 2: Create the folder structure

1. Create a `src` folder

```bash
mkdir src
```

2. Create a `tests` folder

```bash
mkdir tests
```

3. Create a file `string-calculator.ts` inside the `src` folder

```bash
touch src/string-calculator.ts
```

4. Create a file `string-calculator.test.ts` inside the `tests` folder

```bash
touch tests/string-calculator.test.ts
```

Reference the `add` function from the `string-calculator.ts` file

```typescript
import { add } from '../src/string-calculator';
```

Step 3: Prompt to write the first test

**Red phase**

> Prompt: Write a test that checks if the `add` function returns `0` when an empty string is passed

```typescript
test('returns 0 when input is an empty string', () => {
  expect(add('')).toBe(0);
});
```

> Note: the generated code might be varied.

**Green phase**

> Prompt: Write the calculator function that will make this test pass

```typescript
export function add(numbers: string): number {
  // return 0 when the input is an empty string
  return 0;
}
```

Step 4: Prompt to write the second test

**Red phase**

> Prompt: Write a test that checks if the `add` function returns the number when a single number is passed

```typescript
test('returns the number for a single number', () => {
  expect(add('5')).toBe(5);
});
```

**Green phase**

> Prompt: Return the number when a single number is passed

```typescript
export function add(numbers: string): number {
  // return 0 when the input is an empty string
  if (numbers === '') return 0;

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

Step 5: Prompt to write the third test

**Red phase**

> Prompt: Write a test that checks if the `add` function returns the sum of two numbers when two numbers are passed

```typescript
test('returns the sum of two numbers', () => {
  expect(add('5,3')).toBe(8);
});
```

**Green phase**

> Prompt: Return the sum of two numbers when two numbers are passed

```typescript
export function add(numbers: string): number {
  // return 0 when the input is an empty string
  if (numbers === '') return 0;

  // return the sum of two numbers when two numbers are passed
  if (numbers.includes(',')) {
    const [num1, num2] = numbers.split(',').map((num) => parseInt(num));
    return num1 + num2;
  }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

Step 6: Prompt to write the fourth test

**Red phase**

> Prompt: Write a test that checks if the `add` function returns the sum of any amount of numbers when any amount of numbers are passed

```typescript
test('returns the sum of any amount of numbers', () => {
  expect(add('5,3,2')).toBe(10);
});

test('returns the sum of any amount of numbers', () => {
  expect(add('5,3,2,1')).toBe(11);
});
```

**Green phase**

> Prompt: Return the sum of any amount of numbers when any amount of numbers are passed

```typescript
export function add(numbers: string): number {
  // Return 0 when an empty string is passed
  if (numbers === '') return 0;

  // return the sum of any amount of numbers when any amount of numbers are passed
  if (numbers.includes(',')) {
    return numbers.split(',').reduce((acc, num) => acc + parseInt(num), 0);
  }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

> Note: the previous implementation is refactored to use the `reduce` method.

Step 7: Prompt to write the fifth test

**Red phase**

> Prompt: Write a test that checks if the `add` function returns the sum of numbers when new line breaks and commas are interchangeable between numbers

```typescript
test('returns the sum of numbers when new line breaks and commas are interchangeable', () => {
  expect(add('5\n3,2')).toBe(10);
});
```

**Green phase**

> Prompt: Return the sum of numbers when new line breaks and commas are interchangeable between numbers

```typescript
export function add(numbers: string): number {
  // Return 0 when an empty string is passed
  if (numbers === '') return 0;

  // return the sum of numbers when new line breaks and commas are interchangeable between numbers
  if (numbers.includes(',') || numbers.includes('\n')) {
    return numbers
      .split(/,|\n/)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

Step 8: Prompt to write the sixth test

**Red phase**

> Prompt: Write a test that checks if the `add` function returns the sum of numbers when a different delimiter is used

```typescript
test('returns the sum of numbers when a different delimiter is used', () => {
  expect(add('//;\n5;3;2')).toBe(10);
});
```

**Green phase**

> Prompt: Return the sum of numbers when a different delimiter is used

```typescript
export function add(numbers: string): number {
  // Return 0 when an empty string is passed
  if (numbers === '') return 0;

  // return the sum of numbers when a different delimiter is used
  if (numbers.startsWith('//')) {
    const delimiter = numbers[2];
    return numbers
      .split(delimiter)
      .slice(1)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }  
  
  // return the sum of numbers when new line breaks and commas are interchangeable between numbers
  if (numbers.includes(',') || numbers.includes('\n')) {
    return numbers
      .split(/,|\n/)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

Step 9 (Optional): Refactor the code

1. Refactor the `add` function to use a regular expression to match the delimiter

```typescript
export function add(numbers: string): number {
  // Return 0 when an empty string is passed
  if (numbers === '') return 0;

  // return the sum of numbers when a different delimiter is used
  if (numbers.startsWith('//')) {
      const match = numbers.match(/\/\/(.)\n/);
      const delimiter = match ? match[1] : ',';
      return numbers
          .split(delimiter)
          .slice(1)
          .reduce((acc, num) => acc + parseInt(num), 0);
  }
  
  // return the sum of numbers when new line breaks and commas are interchangeable between numbers
  if (numbers.includes(',') || numbers.includes('\n')) {
    return numbers
      .split(/,|\n/)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

2. Refactor the `add` function to use a regular expression to match the delimiter and numbers

```typescript
export function add(numbers: string): number {
  // Return 0 when an empty string is passed
  if (numbers === '') return 0;

  // return the sum of numbers when a different delimiter is used
  if (numbers.startsWith('//')) {
    const match = numbers.match(/\/\/(.)\n(.*)/);
    const delimiter = match ? match[1] : ',';
    const nums = match ? match[2] : numbers;
    return nums
      .split(delimiter)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }
  
  // return the sum of numbers when new line breaks and commas are interchangeable between numbers
  if (numbers.includes(',') || numbers.includes('\n')) {
    return numbers
      .split(/,|\n/)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

Step 10: Prompt to write the seventh test

**Red phase**

> Prompt: Write a test that checks if the `add` function throws an error when a negative number is passed

```typescript
test('throws an error when a negative number is passed', () => {
  expect(() => add('5,-3,2')).toThrow('Negatives not allowed: -3');
});
```

**Green phase**

> Prompt: Throw an error when a negative number is passed

```typescript
export function add(numbers: string): number {
  // Return 0 when an empty string is passed
  if (numbers === '') return 0;

  // throw an error when a negative number is passed
  if (numbers.includes('-')) {
    const negatives = numbers
      .split(/,|\n/)
      .filter((num) => num.includes('-'))
      .map((num) => parseInt(num));
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  // return the sum of numbers when a different delimiter is used
  if (numbers.startsWith('//')) {
    const match = numbers.match(/\/\/(.)\n(.*)/);
    const delimiter = match ? match[1] : ',';
    const nums = match ? match[2] : numbers;
    return nums
      .split(delimiter)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }
  
  // return the sum of numbers when new line breaks and commas are interchangeable between numbers
  if (numbers.includes(',') || numbers.includes('\n')) {
    return numbers
      .split(/,|\n/)
      .reduce((acc, num) => acc + parseInt(num), 0);
  }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

> Note: it tests on the copy "Negatives not allowed: ". At the same time, it is before return the sum of numbers when a different delimiter is used.

Step 11: Prompt to write the eighth test

**Red phase**

> Prompt: Write a test that checks if the `add` function ignores numbers greater than 1000

```typescript
test('ignores numbers greater than 1000', () => {
  expect(add('5,1001,2')).toBe(7);
});
```

**Green phase**

> Prompt: Ignore numbers greater than 1000

```typescript
export function add(numbers: string): number {
  // Return 0 when an empty string is passed
  if (numbers === '') return 0;

  // throw an error when a negative number is passed
  if (numbers.includes('-')) {
    const negatives = numbers
      .split(/,|\n/)
      .filter((num) => num.includes('-'))
      .map((num) => parseInt(num));
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

    // return the sum of numbers when new line breaks and commas are interchangeable between numbers
    if (numbers.includes('\n') || numbers.includes(',')) {
        return numbers
        .split(/\n|,/)
        .reduce((acc, num) => { 
            // ignore numbers greater than 1000
            if (parseInt(num) > 1000) return acc;
            return acc + parseInt(num)
        }, 0);
    }

  // return the number when a single number is passed
  return parseInt(numbers);
}
```

Step 12: Prompt to write the ninth test

**Red phase**

> Prompt: Write a test that checks if the `add` function accepts a custom delimiter of any length with the format: `"//[delimiter]\n"`

```typescript
test('accepts a custom delimiter of any length', () => {
  expect(add('//[***]\n1***2***3')).toBe(6);
});
```

**Green phase**

> Prompt: Accept a custom delimiter of any length

```typescript
// Write the calculator function that will make this test pass
export function add(numbers: string): number {
    // return 0 when an empty string is passed
    if (numbers === '') return 0;

    // throw an error when a negative number is passed
    if (numbers.includes('-')) {
        const negativeNumbers = numbers
            .split(/\n|,/)
            .filter(num => num.includes('-'))
            .join(', ');
        throw new Error(`Negatives not allowed: ${negativeNumbers}`);
    }

    // return the sum of numbers when a different delimiter is used
    if (numbers.startsWith('//')) {
        const match = numbers.match(/\/\/\[?(.*?)\]?\n(.*)/);
        const delimiter = match ? match[1] : ',';
        const nums = match ? match[2] : numbers;
        return nums
            .split(delimiter)
            .reduce((acc, num) => acc + parseInt(num), 0);
    }

    // return the sum of numbers when new line breaks and commas are interchangeable between numbers
    if (numbers.includes('\n') || numbers.includes(',')) {
        return numbers
            .split(/\n|,/)
            .reduce((acc, num) => {
                // ignore numbers greater than 1000
                if (parseInt(num) > 1000) return acc;
                return acc + parseInt(num)
            }, 0);
    }

    // return the number when a single number is passed
    return parseInt(numbers);
}
```