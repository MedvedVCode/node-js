const nums = process.argv.slice(2).map((n) => +n);
const sum = nums.reduce((sum, item) => sum + item, 0);
console.log('sum:', sum);
