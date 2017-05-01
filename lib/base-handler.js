/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const database = require('bedrock-mongodb');
const uuid = require('uuid/v4');
const RouteHandler = require('./route-handler');

class BaseHandler extends RouteHandler {
  constructor(...args) {
    super(...args);
  }

  init(callback) {
    const self = this;
    super.initMiddleware(() => {
      self._middleware.push(self.handler);
      callback();
    });
  }

  handler(req, res, next) {
    const self = this;
    if(req.method === 'GET') {
      // TODO: extensible through `pre-get` event handler
      return self.collection.find({}).toArray((err, result) => {
        res.json(result.map(
          r => r[RouteHandler.getItemName(self.op.returns['hydra:member'].id)]
        ));
      });
      // TODO extensible through `post-get` event handler
    }
    if(req.method === 'POST') {
      const data = req.body;

      // TODO: extensible through `pre-insert` event handler

      data.id = config.server.baseUri + req.url + '/' + uuid();

      // TODO: validation/shape/frame data

      const record = {
        id: database.hash(data.id)
      };
      const itemName = RouteHandler.getItemName(self.op.expects.id);
      record[itemName] = data;

      return self.collection.insert(
        record, database.writeOptions, (err, result) => {
          if(err) {
            // TODO: make BedrockError
            return next(err);
          }

          // TODO extensible through `post-insert` event handler

          res.location(data.id);
          res.status(201).json(result.ops[0][itemName]);
        }
      );
    }
    // TODO: other HTTP methods
  }
}

module.exports = BaseHandler;
