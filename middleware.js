function sillyMiddleware(req, res, next) {
  // we can do anything here to req and res - mutate, add, remove stuff
  // send the response...
  // and when you're done with req and res, you invoke next() 
  // to call the next middleware
  req.team = 'WEBEU1';
  next();
}

function logger(req, res, next) {
  console.log('METHOD: ', req.method);
  console.log('PROTOCOL: ', req.protocol);
  console.log('HOSTNAME: ', req.hostname);
  console.log('ORIGINAL_URL: ', req.originalUrl);
  console.log('PARAMS: ', req.params);
  console.log('QUERY: ', req.query);
  console.log('BODY: ', req.body);
  console.log('HEADERS: ', req.headers);
  console.log('');
  next();
}

// middleware that looks into the Authorization header 
// and checks if value is 'eu1' proceed
// otherwise find a "not authorized" status code
// send back json with error message
/*
function auth(req, res, next) {
  const pw = req.headers.Authorization;
  if (pw === 'eu1') {
    next();
  } else {
    res.status(401).json({ error: 'The password you provided is incorrect' })
  }
}
*/

// now refactor the code so auth() takes an argument with password
function auth(password) {
  return function(req, res, next) {
    const pw = req.headers.authorization;
    if (pw === password) {
      next();
    } else {
      res.status(401).json({ error: 'The password you provided is incorrect' })
    }
  }

}

module.exports = {
  sillyMiddleware,
  logger,
  auth,
}
