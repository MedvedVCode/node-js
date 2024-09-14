const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';
const client = redis.createClient({ url: REDIS_URL });

(async () => {
	await client.connect();
})();

client.on('ready', () => {
	console.log('Redis Connected!');
});

app.get('/counter/:bookId', async (req, res) => {
	const { bookId } = req.params;
	try {
		const counter = (await client.get(bookId)) | 0;
		res.json({ count: counter });
	} catch (e) {
		res.json({ errcode: 500, errmessage: `Что-то пошло не так в Redis ${e}!` });
	}
});

app.post('/counter/:bookId/incr', async (req, res) => {
	const { bookId } = req.params;
	try {
		const result = await client.incr(bookId);
		res.json({ status: 200, message: result });
	} catch (e) {
		res.json({ errcode: 500, errmessage: `Что-то пошло не так в Redis ${e}!` });
	}
});

app.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`);
});
