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

    // return the sum of numbers when a multiple delimiters are used
    if (numbers.startsWith('//')) {
        const match = numbers.match(/\/\/(\[?.*\]?)*\n(.*)/);
        let delimiters : string | RegExp = ',';
        
        if (match) {
            const delimiterGroup = match[1]
                .split(/\[|\]/g)
                .filter(delimiter => delimiter !== '');
            if (delimiterGroup.length === 1) {
                delimiters = delimiterGroup[0];
            } else {
                delimiters = new RegExp(delimiterGroup.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
            }
        }
        
        const nums = match ? match[2] : numbers;
        return nums
            .split(delimiters)
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