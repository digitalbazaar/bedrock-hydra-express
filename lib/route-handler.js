/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const async = require('async');
const bedrock = require('bedrock');
const config = bedrock.config;
const jsonld = bedrock.jsonld;

class RouteHandler {

  constructor(op, options) {
    // FIXME: basic validation on `op` param
    this.op = op;
    this.authentication =
      this.op['http://bedrock.dev/authentication'] || 'none';
    this.collection = options.collection;
    this._middleware = [];
  }

  initRouteHandler(callback) {
    const self = this;
    async.auto({
      initAuth: callback =>
        bedrock.events.emit('bedrock-hydra-express.authentication.'
          + self.authentication, self._middleware, callback),
      initMiddleware: ['initAuth', (results, callback) => {
        if(!self.op['http://bedrock.dev/middleware']) {
          return callback();
        }
        async.eachSeries(
          [].concat(self.op['http://bedrock.dev/middleware']),
          (m, callback) => bedrock.events.emit(
            'bedrock-hydra-express.middleware.' + m, self._middleware,
            callback)
        , callback);
      }]
    }, callback);
  }

  static getItemName(item) {
    if(!item.includes('/')) {
      return item;
    }
    return item.substring(item.lastIndexOf('/') + 1).toLowerCase();
  }

  // format a URL so that it can be used as a property name in MongoDB
  static formatUrl(url) {
    return url.replace('.', '^');
  }

  get middleware() {
    return this._middleware;
  }
}

module.exports = RouteHandler;
