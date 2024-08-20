const { showTask:task } = require('add_seminar_task');
task(1);
let sum = 0;
console.time('timer');
for (let i = 0; i < 1000000; i++) {
	sum += i;
}
console.log('sum:', sum);
console.timeEnd('timer');
