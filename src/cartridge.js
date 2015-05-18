/*!
 * Javascript Game Boy Emulator
 * Copyright (C) 2014  Claudemiro Alves Feitosa Neto <dimiro1@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

define('cartridge', [], function() {
  'use strict';

  var cartridge = {

    /**
     * The rom loaded from cartridge binary file.
     * @type {Uint8Array}
     */
    rom: null,

    /**
     * GameBoy cartridge header.
     * It is not complete.
     */
    header: {
      sgb: 0,
      type: 0,
      romSize: 0,
      ramSize: 0,
      headerChecksum: 0
    },

    /**
     * Initialize the rom in cartridge.
     *
     * @param {ArrayBuffer} data - The rom.
     */
    initialize: function(data) {
      var view = new DataView(data);

      this.header.sgb = view.getUint8(0x146);
      this.header.type = view.getUint8(0x147);
      this.header.romSize = view.getUint8(0x148);
      this.header.ramSize = view.getUint8(0x149);
      this.header.headerChecksum = view.getUint8(0x14D);

      this.rom = new Uint8Array(view.buffer);

      return this;
    },

    /**
     * Read a byte from the rom address addr
     *
     * @public
     * @param {number} addr - The given address
     * @returns {number} A byte
     */
    readByte: function(addr) {
      addr &= 0xFFFF;

      return this.rom[addr];
    }
  };

  return cartridge;
});
