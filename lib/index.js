/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const async = require('async');
const bedrock = require('bedrock');
const config = bedrock.config;
const database = require('bedrock-mongodb');
const jsonld = bedrock.jsonld;
const BaseHandler = require('./base-handler');
const InstanceHandler = require('./instance-handler');

// load config defaults
require('./config');

const api = {};
module.exports = api;

api.generateApi = function(app, docs, callback) {
  async.auto({
    // TODO: perhaps use `emdbed: '@link'` option
    frame: callback => jsonld.frame(
      docs, config['hydra-express'].frame, {embed: '@always'}, callback),
    createApi: ['frame', (results, callback) =>
      buildApi(app, '', results.frame['@graph'][0].supportedProperty, callback)]
  }, err => callback(err));
};

function buildApi(app, baseRoute, supportedProperty, callback) {
  async.eachSeries([].concat(supportedProperty), (resource, callback) => {
    const route = baseRoute + resource.property.id;
    // NOTE: the bind silliness here could be remedied by employing proxy
    // https://gist.github.com/anba/9f0acbb29bf755d26f37
    async.auto({
      openCollection: callback => database.openCollections(
        [resource.property.range.id], err =>
        callback(err, database.collections[resource.property.range.id])),
      baseHandler: ['openCollection', (results, callback) =>
        async.eachSeries(
          [].concat(resource.property.supportedOperation),
          (op, callback) => {
            const bHandler = new BaseHandler(op, {
              collection: results.openCollection
            });
            bHandler.init(() => {
              app[op.method.toLowerCase()](
                route, bHandler.middleware.map(f => f.bind(bHandler)));
              callback();
            });
          }, callback)],
      instanceHandler: ['baseHandler', (results, callback) =>
        async.eachSeries(
          [].concat(resource.property.range['hydra:member'].supportedOperation),
          (op, callback) => {
            const iHandler = new InstanceHandler(op, {
              collection: results.openCollection
            });
            iHandler.init(() => {
              app[op.method.toLowerCase()](
                generateRouteName(route),
                iHandler.middleware.map(f => f.bind(iHandler)));
              callback();
            });
          }, callback)],
      checkProperties: ['instanceHandler', (results, callback) =>
        async.eachSeries(
          [].concat(resource.property.range['hydra:member'].supportedProperty),
          (p, callback) => {
            if([].concat(p.property.type).includes('hydra:Link')) {
              return buildApi(app, generateRouteName(route), p, callback);
            }
            callback();
          }, callback)]
    }, callback);
  }, callback);
}

function generateRouteName(route) {
  return route + '/:' + route.substring(route.lastIndexOf('/') + 1) + 'Id';
}
