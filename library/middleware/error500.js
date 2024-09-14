function errorHandler (err, req, res, next) {
	res.render('errors/500', { title: '500 ошибка', message: err })
	
  // res.status(500)
  // res.json({ err })
}