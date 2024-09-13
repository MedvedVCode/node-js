const express = require('express');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error404');
const apiRouter = require('./routers/api');
const userRouter = require('./routers/user');
const indexRouter = require('./routers/index');

const port = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/img/'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/user', userRouter);

app.use(error404);

app.listen(port, () => {
	console.log('Сервер запущен на порту', port);
});
