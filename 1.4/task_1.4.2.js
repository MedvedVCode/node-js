const fs = require('fs');
const path = require('path');

let fileName = process.argv[2];

const filePath = path.join(__dirname, fileName);

let gameData = {
	total: 0,
	wins: 0,
	loses: 0,
	percent: 0,
};

let data = '';

try {
	fs.accessSync(filePath, fs.constants.F_OK);
	const readerStream = fs.createReadStream(filePath);
	readerStream
		.setEncoding('UTF8')
		.on('data', (chunk) => {
			data = data + chunk;
			data
				.trim()
				.split('\n')
				.forEach((line) => {
					gameData.total++;
					line.split(' ')[3] === 'win' ? gameData.wins++ : gameData.loses++;
					gameData.percent = Math.round((gameData.wins / gameData.total) * 100);
				});
		})
		.on('end', () => {
			console.log(gameData);
		});
} catch (err) {
	console.log('Файл не существует');
}
