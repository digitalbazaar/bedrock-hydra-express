/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const brHydraExpress = require('bedrock-hydra-express');
const ensureAuthenticated = require('bedrock-passport').ensureAuthenticated;
const mockApi = require('./mock-api');
require('bedrock-express');
require('bedrock-mongodb');

bedrock.events.on('bedrock-express.configure.routes', (app, callback) => {
  brHydraExpress.generateApi(app, mockApi.docs, callback);
});

bedrock.events.on(
  'bedrock-hydra-express.ensureAuthenticated', m => m.push(ensureAuthenticated)
);

require('bedrock-test');
bedrock.start();
