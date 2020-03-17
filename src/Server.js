const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const morganBody = require('morgan-body');

const { middlewares: {errorHandler, pageNotFoundHandler} } = require('ylz-xyz-common');

class Server {
  constructor(config) {
    this.config = config;
  }

  init() {
    this.app = express();

    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandler();
  }

  get application() {
    return this.app;
  }

  initMiddlewares() {
    this.app.use(compress());
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        //origin: JSON.parse(this.config.corsOrigin)
        // credentials: true,
      })
    );
    morganBody(this.app);
  }

  initRoutes() {
    const { apiPrefix } = this.config;

    const router = require('./Router')(this.config).router;

    this.app.use(apiPrefix, router);
    this.app.use(pageNotFoundHandler);
  }
  
  initErrorHandler() {
    this.app.use(errorHandler);
  }
}

let instance;
module.exports = (options) => {
  if (!instance) {
    instance = new Server(options);
  }

  return instance;
}