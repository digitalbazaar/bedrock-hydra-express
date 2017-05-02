/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const database = require('bedrock-mongodb');
const RouteHandler = require('./route-handler');

class InstanceHandler extends RouteHandler {
  constructor(...args) {
    super(...args);
  }

  init(callback) {
    const self = this;
    super.initRouteHandler(() => {
      self._middleware.push(self.handler);
      callback();
    });
  }

  handler(req, res, next) {
    if(req.method === 'GET') {
      const self = this;
      return self.collection.findOne({
        id: database.hash(config.server.baseUri + req.path)
      }, (err, result) => {
        if(err) {
          // TODO: BedrockError
          return next(err);
        }
        res.json(result[RouteHandler.getItemName(self.op.returns)]);
      });
    }
    // TODO: other methods
    next();
  }
}

module.exports = InstanceHandler;
