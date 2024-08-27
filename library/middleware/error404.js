module.exports = (req, res) => {
	res.render('errors/404',{
		title: '404 ошибка',
		message: '404 | страница не найдена'
	})
	// res.status(404)
	// res.json('404 | страница не найдена')
}