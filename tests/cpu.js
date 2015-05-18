'use strict';

var assert = require('assert'),
  requirejs = require('requirejs');

requirejs.config({
  baseUrl: __dirname + '/../src',
  nodeRequire: require
});

describe('cpu', function() {
  var cartridge = Object.create(requirejs('cartridge'));
  var gameBoy = Object.create(requirejs('gameboy'));

  var buffer = new ArrayBuffer(0xFFFF);
  
  cartridge.initialize(buffer);
  gameBoy.initialize('canvasId', cartridge);

  describe('instructions', function() {
    it('should return 4 cycles on opcode 0x0', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x0].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0x1', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x1].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x2', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x2].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x3', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x3].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x4', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x4].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x5', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x5].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x6', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x6].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x7', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x7].run(gameBoy));
    });
    it('should return 20 cycles on opcode 0x8', function() {
      assert.equal(20, gameBoy.cpu.instructions[0x8].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x9', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x9].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xA', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xA].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xB', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xB].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xC', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xC].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xD', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xD].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xE', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xE].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xF', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xF].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x10', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x10].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0x11', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x11].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x12', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x12].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x13', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x13].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x14', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x14].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x15', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x15].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x16', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x16].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x17', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x17].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0x18', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x18].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x19', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x19].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x1A', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x1A].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x1B', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x1B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x1C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x1C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x1D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x1D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x1E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x1E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x1F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x1F].run(gameBoy));
    });
    it('should return 12,8 cycles on opcode 0x20');
    it('should return 12 cycles on opcode 0x21', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x21].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x22', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x22].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x23', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x23].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x24', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x24].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x25', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x25].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x26', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x26].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x27', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x27].run(gameBoy));
    });
    it('should return 12,8 cycles on opcode 0x28');
    it('should return 8 cycles on opcode 0x29', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x29].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x2A', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x2A].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x2B', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x2B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x2C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x2C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x2D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x2D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x2E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x2E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x2F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x2F].run(gameBoy));
    });
    it('should return 12,8 cycles on opcode 0x30');
    it('should return 12 cycles on opcode 0x31', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x31].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x32', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x32].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x33', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x33].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0x34', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x34].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0x35', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x35].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0x36', function() {
      assert.equal(12, gameBoy.cpu.instructions[0x36].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x37', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x37].run(gameBoy));
    });
    it('should return 12,8 cycles on opcode 0x38');
    it('should return 8 cycles on opcode 0x39', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x39].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x3A', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x3A].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x3B', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x3B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x3C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x3C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x3D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x3D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x3E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x3E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x3F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x3F].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x40', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x40].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x41', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x41].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x42', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x42].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x43', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x43].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x44', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x44].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x45', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x45].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x46', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x46].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x47', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x47].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x48', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x48].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x49', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x49].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x4A', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x4A].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x4B', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x4B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x4C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x4C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x4D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x4D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x4E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x4E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x4F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x4F].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x50', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x50].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x51', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x51].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x52', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x52].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x53', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x53].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x54', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x54].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x55', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x55].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x56', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x56].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x57', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x57].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x58', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x58].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x59', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x59].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x5A', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x5A].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x5B', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x5B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x5C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x5C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x5D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x5D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x5E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x5E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x5F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x5F].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x60', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x60].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x61', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x61].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x62', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x62].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x63', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x63].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x64', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x64].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x65', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x65].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x66', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x66].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x67', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x67].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x68', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x68].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x69', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x69].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x6A', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x6A].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x6B', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x6B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x6C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x6C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x6D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x6D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x6E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x6E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x6F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x6F].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x70', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x70].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x71', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x71].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x72', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x72].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x73', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x73].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x74', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x74].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x75', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x75].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x76', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x76].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x77', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x77].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x78', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x78].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x79', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x79].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x7A', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x7A].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x7B', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x7B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x7C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x7C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x7D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x7D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x7E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x7E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x7F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x7F].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x80', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x80].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x81', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x81].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x82', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x82].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x83', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x83].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x84', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x84].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x85', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x85].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x86', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x86].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x87', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x87].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x88', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x88].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x89', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x89].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x8A', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x8A].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x8B', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x8B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x8C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x8C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x8D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x8D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x8E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x8E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x8F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x8F].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x90', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x90].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x91', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x91].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x92', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x92].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x93', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x93].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x94', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x94].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x95', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x95].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x96', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x96].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x97', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x97].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x98', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x98].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x99', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x99].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x9A', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x9A].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x9B', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x9B].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x9C', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x9C].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x9D', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x9D].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0x9E', function() {
      assert.equal(8, gameBoy.cpu.instructions[0x9E].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0x9F', function() {
      assert.equal(4, gameBoy.cpu.instructions[0x9F].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA0', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA0].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA1', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA1].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA2', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA2].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA3', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA3].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA4', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA4].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA5', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA5].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xA6', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xA6].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA7', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA7].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA8', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA8].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xA9', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xA9].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xAA', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xAA].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xAB', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xAB].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xAC', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xAC].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xAD', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xAD].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xAE', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xAE].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xAF', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xAF].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB0', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB0].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB1', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB1].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB2', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB2].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB3', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB3].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB4', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB4].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB5', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB5].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xB6', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xB6].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB7', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB7].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB8', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB8].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xB9', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xB9].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xBA', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xBA].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xBB', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xBB].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xBC', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xBC].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xBD', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xBD].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xBE', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xBE].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xBF', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xBF].run(gameBoy));
    });
    it('should return 20,8 cycles on opcode 0xC0');
    it('should return 12 cycles on opcode 0xC1', function() {
      assert.equal(12, gameBoy.cpu.instructions[0xC1].run(gameBoy));
    });
    it('should return 16,12 cycles on opcode 0xC2');
    it('should return 16 cycles on opcode 0xC3', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xC3].run(gameBoy));
    });
    it('should return 24,12 cycles on opcode 0xC4');
    it('should return 16 cycles on opcode 0xC5', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xC5].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xC6', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xC6].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xC7', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xC7].run(gameBoy));
    });
    it('should return 20,8 cycles on opcode 0xC8');
    it('should return 16 cycles on opcode 0xC9', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xC9].run(gameBoy));
    });
    it('should return 16,12 cycles on opcode 0xCA');
    it('should return 4 cycles on opcode 0xCB', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xCB].run(gameBoy));
    });
    it('should return 24,12 cycles on opcode 0xCC');
    it('should return 24 cycles on opcode 0xCD', function() {
      assert.equal(24, gameBoy.cpu.instructions[0xCD].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xCE', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xCE].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xCF', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xCF].run(gameBoy));
    });
    it('should return 20,8 cycles on opcode 0xD0');
    it('should return 12 cycles on opcode 0xD1', function() {
      assert.equal(12, gameBoy.cpu.instructions[0xD1].run(gameBoy));
    });
    it('should return 16,12 cycles on opcode 0xD2');
    it('should return 4 cycles on opcode 0xD3');
    it('should return 24,12 cycles on opcode 0xD4');
    it('should return 16 cycles on opcode 0xD5', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xD5].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xD6', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xD6].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xD7', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xD7].run(gameBoy));
    });
    it('should return 20,8 cycles on opcode 0xD8');
    it('should return 16 cycles on opcode 0xD9', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xD9].run(gameBoy));
    });

    it('should return 16,12 cycles on opcode 0xDA');

    it('should return 0 cycles on opcode 0xDB');

    it('should return 24,12 cycles on opcode 0xDC');

    it('should return 0 cycles on opcode 0xDD');
    it('should return 8 cycles on opcode 0xDE', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xDE].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xDF', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xDF].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0xE0', function() {
      assert.equal(12, gameBoy.cpu.instructions[0xE0].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0xE1', function() {
      assert.equal(12, gameBoy.cpu.instructions[0xE1].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xE2', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xE2].run(gameBoy));
    });
    it('should return 0 cycles on opcode 0xE3');
    it('should return 0 cycles on opcode 0xE4');
    it('should return 16 cycles on opcode 0xE5', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xE5].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xE6', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xE6].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xE7', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xE7].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xE8', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xE8].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xE9', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xE9].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xEA', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xEA].run(gameBoy));
    });
    it('should return 0 cycles on opcode 0xEB');
    it('should return 0 cycles on opcode 0xEC');
    it('should return 0 cycles on opcode 0xED');
    it('should return 8 cycles on opcode 0xEE', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xEE].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xEF', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xEF].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0xF0', function() {
      assert.equal(12, gameBoy.cpu.instructions[0xF0].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0xF1', function() {
      assert.equal(12, gameBoy.cpu.instructions[0xF1].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xF2', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xF2].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xF3', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xF3].run(gameBoy));
    });
    it('should return 0 cycles on opcode 0xF4');
    it('should return 16 cycles on opcode 0xF5', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xF5].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xF6', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xF6].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xF7', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xF7].run(gameBoy));
    });
    it('should return 12 cycles on opcode 0xF8', function() {
      assert.equal(12, gameBoy.cpu.instructions[0xF8].run(gameBoy));
    });
    it('should return 8 cycles on opcode 0xF9', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xF9].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xFA', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xFA].run(gameBoy));
    });
    it('should return 4 cycles on opcode 0xFB', function() {
      assert.equal(4, gameBoy.cpu.instructions[0xFB].run(gameBoy));
    });
    it('should return 0 cycles on opcode 0xFC');
    it('should return 0 cycles on opcode 0xFD');
    it('should return 8 cycles on opcode 0xFE', function() {
      assert.equal(8, gameBoy.cpu.instructions[0xFE].run(gameBoy));
    });
    it('should return 16 cycles on opcode 0xFF', function() {
      assert.equal(16, gameBoy.cpu.instructions[0xFF].run(gameBoy));
    });

    // CB

    it('should return 8 cycles on opcode CB 0x0', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x0].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x1', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x1].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x2', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x2].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x3', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x3].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x4', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x4].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x5', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x5].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x6', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x6].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x7', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x7].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x8', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x8].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x9', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x9].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xE', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xE].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x10', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x10].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x11', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x11].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x12', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x12].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x13', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x13].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x14', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x14].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x15', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x15].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x16', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x16].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x17', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x17].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x18', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x18].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x19', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x19].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x1A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x1A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x1B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x1B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x1C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x1C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x1D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x1D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x1E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x1E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x1F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x1F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x20', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x20].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x21', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x21].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x22', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x22].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x23', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x23].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x24', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x24].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x25', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x25].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x26', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x26].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x27', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x27].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x28', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x28].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x29', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x29].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x2A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x2A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x2B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x2B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x2C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x2C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x2D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x2D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x2E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x2E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x2F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x2F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x30', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x30].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x31', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x31].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x32', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x32].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x33', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x33].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x34', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x34].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x35', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x35].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x36', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x36].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x37', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x37].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x38', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x38].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x39', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x39].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x3A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x3A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x3B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x3B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x3C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x3C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x3D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x3D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x3E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x3E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x3F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x3F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x40', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x40].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x41', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x41].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x42', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x42].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x43', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x43].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x44', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x44].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x45', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x45].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x46', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x46].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x47', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x47].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x48', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x48].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x49', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x49].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x4A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x4A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x4B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x4B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x4C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x4C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x4D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x4D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x4E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x4E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x4F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x4F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x50', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x50].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x51', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x51].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x52', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x52].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x53', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x53].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x54', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x54].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x55', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x55].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x56', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x56].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x57', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x57].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x58', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x58].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x59', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x59].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x5A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x5A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x5B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x5B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x5C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x5C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x5D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x5D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x5E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x5E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x5F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x5F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x60', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x60].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x61', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x61].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x62', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x62].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x63', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x63].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x64', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x64].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x65', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x65].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x66', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x66].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x67', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x67].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x68', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x68].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x69', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x69].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x6A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x6A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x6B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x6B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x6C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x6C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x6D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x6D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x6E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x6E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x6F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x6F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x70', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x70].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x71', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x71].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x72', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x72].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x73', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x73].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x74', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x74].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x75', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x75].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x76', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x76].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x77', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x77].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x78', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x78].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x79', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x79].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x7A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x7A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x7B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x7B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x7C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x7C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x7D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x7D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x7E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x7E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x7F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x7F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x80', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x80].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x81', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x81].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x82', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x82].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x83', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x83].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x84', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x84].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x85', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x85].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x86', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x86].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x87', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x87].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x88', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x88].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x89', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x89].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x8A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x8A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x8B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x8B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x8C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x8C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x8D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x8D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x8E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x8E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x8F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x8F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x90', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x90].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x91', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x91].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x92', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x92].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x93', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x93].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x94', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x94].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x95', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x95].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x96', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x96].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x97', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x97].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x98', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x98].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x99', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x99].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x9A', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x9A].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x9B', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x9B].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x9C', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x9C].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x9D', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x9D].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0x9E', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0x9E].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0x9F', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0x9F].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA0', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA0].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA1', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA1].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA2', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA2].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA3', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA3].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA4', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA4].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA5', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA5].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xA6', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xA6].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA7', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA7].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA8', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA8].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xA9', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xA9].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xAA', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xAA].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xAB', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xAB].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xAC', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xAC].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xAD', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xAD].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xAE', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xAE].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xAF', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xAF].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB0', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB0].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB1', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB1].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB2', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB2].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB3', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB3].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB4', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB4].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB5', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB5].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xB6', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xB6].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB7', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB7].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB8', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB8].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xB9', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xB9].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xBA', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xBA].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xBB', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xBB].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xBC', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xBC].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xBD', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xBD].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xBE', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xBE].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xBF', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xBF].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC0', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC0].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC1', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC1].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC2', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC2].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC3', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC3].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC4', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC4].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC5', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC5].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xC6', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xC6].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC7', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC7].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC8', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC8].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xC9', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xC9].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xCA', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xCA].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xCB', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xCB].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xCC', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xCC].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xCD', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xCD].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xCE', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xCE].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xCF', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xCF].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD0', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD0].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD1', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD1].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD2', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD2].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD3', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD3].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD4', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD4].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD5', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD5].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xD6', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xD6].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD7', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD7].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD8', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD8].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xD9', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xD9].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xDA', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xDA].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xDB', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xDB].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xDC', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xDC].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xDD', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xDD].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xDE', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xDE].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xDF', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xDF].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE0', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE0].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE1', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE1].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE2', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE2].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE3', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE3].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE4', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE4].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE5', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE5].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xE6', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xE6].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE7', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE7].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE8', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE8].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xE9', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xE9].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xEA', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xEA].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xEB', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xEB].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xEC', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xEC].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xED', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xED].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xEE', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xEE].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xEF', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xEF].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF0', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF0].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF1', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF1].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF2', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF2].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF3', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF3].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF4', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF4].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF5', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF5].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xF6', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xF6].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF7', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF7].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF8', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF8].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xF9', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xF9].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xFA', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xFA].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xFB', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xFB].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xFC', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xFC].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xFD', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xFD].run(gameBoy));
    });
    it('should return 16 cycles on opcode CB 0xFE', function() {
      assert.equal(16, gameBoy.cpu.extended_instructions[0xFE].run(gameBoy));
    });
    it('should return 8 cycles on opcode CB 0xFF', function() {
      assert.equal(8, gameBoy.cpu.extended_instructions[0xFF].run(gameBoy));
    });
  });

  describe('registers', function() {

    it('should set correct flags in register f', function() {
      gameBoy.cpu.regs.f = 0xb0;
      assert.equal(true, gameBoy.cpu.regs.flags.z);
      assert.equal(false, gameBoy.cpu.regs.flags.n);
      assert.equal(true, gameBoy.cpu.regs.flags.h);
      assert.equal(true, gameBoy.cpu.regs.flags.c);

      assert.equal(0xb0, gameBoy.cpu.regs.f);
    });

    it('should assign registers a and f when assign af', function() {
      gameBoy.cpu.regs.af = 0x1b0;

      assert.equal(1, gameBoy.cpu.regs.a);
      assert.equal(0xb0, gameBoy.cpu.regs.f);
    });

    it('should not assign a value greater than 0xFFFF in register PC', function() {
      gameBoy.cpu.regs.pc = 0xFFFFF;
      assert.equal(0xFFFF, gameBoy.cpu.regs.pc);
    });

    it('should not assign a value greater than 0xFFFF in register SP', function() {
      gameBoy.cpu.regs.sp = 0xFFFFF;
      assert.equal(0xFFFF, gameBoy.cpu.regs.sp);
    });

    it('should not assign a value greater than 0xFF in 8 bit registers', function() {
      gameBoy.cpu.regs.a = 0xFFF;
      gameBoy.cpu.regs.f = 0xFFF;
      gameBoy.cpu.regs.d = 0xFFF;
      gameBoy.cpu.regs.e = 0xFFF;
      gameBoy.cpu.regs.h = 0xFFF;
      gameBoy.cpu.regs.l = 0xFFF;

      assert.equal(0xFF, gameBoy.cpu.regs.a);
      assert.equal(0xF0, gameBoy.cpu.regs.f); // this is an exception
      assert.equal(0xFF, gameBoy.cpu.regs.d);
      assert.equal(0xFF, gameBoy.cpu.regs.e);
      assert.equal(0xFF, gameBoy.cpu.regs.h);
      assert.equal(0xFF, gameBoy.cpu.regs.l);
    });
  });
});
