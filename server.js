const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const md = require('./middleware');
const err = require('./errors');

const sillyMiddleware = md.sillyMiddleware;
const logger = md.logger;
const auth = md.auth;
const myError = err.myErrorMiddleware;

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
// helmet is a commercial middleware that allows you to customize your response header
// helmet is a function that you need to invoke to return a legit middleware
// it creates a bunch of headers for our response
server.use(helmet());
// You don't need to invoke middleware itself
server.use(sillyMiddleware);
server.use(logger);
server.use(auth('secret'));

// If you want to add middleware to a specific route, you can add it here:
server.use('/api/hubs',/*sillyMiddleware,*/ hubsRouter);

server.get('/',/*sillyMiddleware,*/ (req, res, next) => {
  // if headers contain foo header, send stuff
  if (req.headers.foo) {
    res.send(`
      <h2>Lambda Hubs API</h2>
      <p>Welcome ${req.team} to the Lambda Hubs API</p>
      `);
      // if there is no 'foo' header in headers
  } else {
    // invoking next and passing an argument is like calling an error
    next({ message: 'You got no foo header!'})
  }
});

// The ERROR middleware will catch any error even WITHOUT calling next()!
// so if you write
// throw new Error('OH NO ERROR MESSAGE')
// inside else { }, the error middleware will catch it and send the error msg

// You need to connect it at the end of the 'tunnel' to catch all errors that happend before this middleware
server.use(myError);
/*
HERE YOU CAN HAVE MORE STUFF HAPPEND (but myError would need to have next() inviked inside it)
server.use(myOtherErrorFunction);  // this myOtherErrorFunction will need to have next() inside it, so you can get to ANOTHER STUFF
AND ANOTHER STUFF
server.use(myLastErrorFunction);
*/
module.exports = server;
