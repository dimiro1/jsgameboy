'use strict';

var assert = require('assert'),
  requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname + '/../src',
  nodeRequire: require
});

describe('cartridge', function() {
  var cartridge = Object.create(requirejs('cartridge'));
  var buffer = new ArrayBuffer(0xFFF);

  cartridge.initialize(buffer);

  it('should read from cartridge', function() {
    buffer[0x10] = 10;
    assert.equal(10, cartridge.readByte(0x10));
  });
});
