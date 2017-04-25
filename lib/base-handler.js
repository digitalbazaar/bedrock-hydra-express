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
    super.initMiddleware(() => {
      this._middleware.push(this.handler);
      callback();
    });
  }

  handler(req, res, next) {
    if(req.method === 'GET') {
      // TODO: extensible through `pre-get` event handler
      return this.collection.find({}).toArray((err, result) => {
        res.json(result);
      });
      // TODO extensible through `post-get` event handler
    }
    if(req.method === 'POST') {
      const data = req.body;

      // TODO: extensible through `pre-insert` event handler

      // TODO: still use these IDs with this new API?
      data.id = config.server.baseUri + req.url + '/' + uuid();

      // TODO: validation/shape/frame data

      // NOTE: the hydra definition tells us that we're dealing with
      // a particular thing  (http://schema.org/foo), so we can stuff
      // data into a `http://schema.org/foo` property and create the usual
      // index properties

      return this.collection.insert(
        req.body, database.writeOptions, (err, result) => {
          if(err) {
            // TODO: make BedrockError
            return next(err);
          }

          // TODO extensible through `post-insert` event handler

          res.location(data.id);
          res.status(201).json(result.ops[0]);
        }
      );
    }
    // TODO: other HTTP methods
  }
}

module.exports = BaseHandler;
