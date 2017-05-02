/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const async = require('async');
const bedrock = require('bedrock');
const config = bedrock.config;
const database = require('bedrock-mongodb');
const jsonld = bedrock.jsonld;
const uuid = require('uuid/v4');
const RouteHandler = require('./route-handler');

class BaseHandler extends RouteHandler {
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
      console.log('OOOOOOOOO', self.op);
      const data = req.body;
      async.auto({
        compact: callback => jsonld.compact(
          data, config['hydra-express'].contexts.post, callback),
        expand: callback => jsonld.expand(data, callback),
        preInsert: ['compact', 'expand', (results, callback) => {
          // TODO: extensible through `pre-insert` event handler
          callback();
        }],
        insert: ['preInsert', (results, callback) => {
          const compacted = results.compact[0];
          const expanded = results.expand[0];
          compacted.id = config.server.baseUri + req.url + '/' + uuid();
          const record = {
            id: database.hash(compacted.id)
          };
          // FIXME: determine more efficient way to build indexes
          // add indexes
          [].concat(self.op.expects.supportedProperty)
            .filter(p => p['http://bedrock.dev/index'])
            .map(p => p.property.id)
            .forEach(i => {
              if(expanded[i]) {
                record[RouteHandler.formatUrl(i)] =
                  database.hash(expanded[i][0]['@value']);
              }
            });
          const itemName = RouteHandler.getItemName(self.op.expects.id);

          // FIXME: `@context`, is currently part of the `compacted` object
          record[itemName] = compacted;

          return self.collection.insert(
            record, database.writeOptions, (err, result) => {
              if(err) {
                // TODO: make BedrockError
                return next(err);
              }

              res.location(data.id);
              res.status(201).json(result.ops[0][itemName]);
              callback(null, result.ops[0][itemName]);
            }
          );
        }],
        postInsert: ['insert', (results, callback) => {
          // TODO extensible through `post-insert` event handler
          callback();
        }]
      }, err => {
        if(err) {
          return next(err);
        }
      });
    }
    // TODO: other HTTP methods
  }
}

module.exports = BaseHandler;
