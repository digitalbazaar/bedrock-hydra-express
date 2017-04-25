/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const RouteHandler = require('./route-handler');

class InstanceHandler extends RouteHandler {
  constructor(...args) {
    super(...args);
  }

  init(callback) {
    super.initMiddleware(() => {
      this._middleware.push(this.handler);
      callback();
    });
  }

  handler(req, res, next) {
    if(req.method === 'GET') {
      return this.collection.findOne({
        id: config.server.baseUri + req.path
      }, (err, result) => {
        if(err) {
          // TODO: BedrockError
          return next(err);
        }
        res.json(result);
      });
    }
    // TODO: other methods
    next();
  }
}

module.exports = InstanceHandler;
