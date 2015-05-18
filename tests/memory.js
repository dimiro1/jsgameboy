'use strict';

var assert = require('assert'),
  requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname + '/../src',
  nodeRequire: require
});

describe('memory', function() {
  var cartridge = Object.create(requirejs('cartridge'));
  var memory = Object.create(requirejs('memory'));

  var buffer = new ArrayBuffer(0xFFFF);
  buffer[0x0] = 10;
  cartridge.initialize(buffer);

  memory.initialize(cartridge);

  it('should read from cartridge when reading from memory address from 0x0 to 0x3FFF', function() {
    assert.equal(10, memory.readByte(0x0));
  });
});
