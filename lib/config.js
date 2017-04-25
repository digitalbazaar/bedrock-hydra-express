/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;

config['hydra-express'] = {};

config['hydra-express'].frame = {
  "@context": {
    "@vocab": "http://localhost/docs.jsonld#",
    "hydra": "http://www.w3.org/ns/hydra/core#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "xmls": "http://www.w3.org/2001/XMLSchema#",
    "owl": "http://www.w3.org/2002/07/owl#",
    "domain": {
      "@id": "rdfs:domain",
      "@type": "@id"
    },
    "range": {
      "@id": "rdfs:range",
      "@type": "@id"
    },
    "subClassOf": {
      "@id": "rdfs:subClassOf",
      "@type": "@id"
    },
    "expects": {
      "@id": "hydra:expects",
      "@type": "@id"
    },
    "returns": {
      "@id": "hydra:returns",
      "@type": "@id"
    },
    "hydra:member": {
      "@id": "hydra:member",
      "@type": "@id"
    },
    "method": "hydra:method",
    "supportedOperation": "hydra:supportedOperation",
    "supportedProperty": "hydra:supportedProperty",
    "property": "hydra:property",
    "id": "@id",
    "type": "@type"
  },
  "@id": "#Entrypoint"
};
