const http = require('http');
const { WEATHER_URL: url, API_KEY: apiKey} = require('./config');

const consoleQuery = process.argv.slice(2).join(' ');

const fullUrl = `${url}?access_key=${apiKey}&query=${consoleQuery}`;

http.get(fullUrl, (res) => {
	const { statusCode } = res;
	if (statusCode !== 200) {
		console.log(`Error: ${statusCode}`);
		return;
	}
	res.setEncoding('utf8');
	let rowData = '';
	res.on('data', (chunk) => {
		rowData += chunk;
	});
	res.on('end', () => {
		let parseData = JSON.parse(rowData);
		console.log(parseData);
	});
}).on('error',(err)=>{
	console.error(err);
});

