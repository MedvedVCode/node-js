const express = require('express');
require('dotenv').config();
const logger = require('./middleware/logger');
const error404 = require('./middleware/error404');
const apiRouter = require('./routers/api');
const userRouter = require('./routers/user');
const ejs = require('ejs');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use( express.static( "public" ) );
app.use(express.json());

app.use(logger);
app.use('/api', apiRouter);
app.use('/user', userRouter);

app.use(error404);

app.listen(port, () => {
	console.log('Сервер запущен на порту', port);
});
