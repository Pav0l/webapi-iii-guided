// error middlweare takes 4 arguments, where the first one is the error object
function myErrorMiddleware(err, req, res, next) {
  // in here you can add stuff to req,res and next = errorHasHappend
  res.json({
    error: 'Something bad happened',
    message: err.message,
  })
  next();
}

module.exports = {
  myErrorMiddleware,
}