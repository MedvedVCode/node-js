const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const secretNumber = Math.floor(Math.random() * 101);
let min = 0;
let max = 100;

console.log(`Введите число от ${min} до ${max}:`);

readline.on('line', (guessNumber) => {
	if (isNaN(guessNumber) || guessNumber < min || guessNumber > max) {
		console.log(
			'Некорректный ввод. Пожалуйста, введите число  от ${min} до ${max}.'
		);
	} else if (secretNumber === +guessNumber) {
		console.log('Вы угадали!');
		readline.close();
	} else if (+guessNumber > secretNumber) {
		max=+guessNumber
		console.log(`Загаданное число меньше ${guessNumber}`);
	} else if (+guessNumber < secretNumber) {
		min=+guessNumber
		console.log(`Загаданное число больше ${guessNumber}`);
	}
});
