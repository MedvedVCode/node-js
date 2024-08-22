const fs = require('fs');
const path = require('path');

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

const generateDigit = () => {
	return Math.round(Math.random()) + 1;
};

const writeLog = (str) => {
	fs.appendFileSync(
		filePath,
		new Date().toLocaleString() + ' >> ' + str + '\n'
	);
};

let fileName = process.argv[2];

const filePath = path.join(__dirname, fileName);

try {
	fs.accessSync(filePath, fs.constants.F_OK);
	console.log('Файл существует');
} catch (err) {
	console.log('Файл не существует');
	fs.openSync(filePath, 'w');
}

console.log('Игра Орел или Решка, угадайте 1 или 2. Ctrl+C для выхода.');
let digitComp = generateDigit();

readline.on('line', (guessDigit) => {
	if (isNaN(guessDigit) || +guessDigit < 1 || +guessDigit > 2) {
		console.log(
			'Некорректный ввод. Пожалуйста, введите 1 или 2. Ctrl+C для выхода.'
		);
	} else if (+guessDigit === digitComp) {
		writeLog('win');
		console.log('Вы угадали!');
	} else {
		console.log('Вы проиграли.');
		writeLog('lose');
	}

	digitComp = generateDigit();
	console.log('\nИгра Орел или Решка, угадайте 1 или 2. Ctrl+C для выхода.');
});

readline.on('SIGINT', () => {
	readline.close();
});
