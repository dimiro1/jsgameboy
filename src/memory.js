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

define('memory', [], function() {
  'use strict';
  /**
   * A Module that represent the memory.
   *
   * @author Claudemiro Alves Feitosa Neto <dimiro1@gmail.com>
   * @exports memory/memory
   */

  /**
   * The size of a rom bank
   *
   * @constant
   * @type {number}
   * @default
   */
  var ROM_BANK_SIZE = 0x2000;

  /**
   * The maximum size of gameboy memory.
   *
   * @constant
   * @type {number}
   * @default
   */
  var RAM_SIZE = 0x10000;

  /**
   * The memory object
   *
   * @public
   */
  var memory = {
    /**
     * Main memory
     *
     * @member {Uint8Array}
     * @private
     */
    ram: new Uint8Array(RAM_SIZE),
    /**
     * Eram
     *
     * @member {Uint8Array}
     * @private
     */
    eram: new Uint8Array(ROM_BANK_SIZE * 4),

    /**
     * The current ram bank in use.
     *
     * @member {number}
     * @private
     */
    currentRamBank: 0,
    /**
     * The current ram bank in use.
     *
     * @member {number}
     * @private
     */
    currentRomBank: 1,
    /**
     * The current game MBC type.
     *
     * @member {number}
     * @private
     */
    mbcType: 0,

    /**
     * The Game
     *
     * @member {cartridge}
     * @private
     */
    cartridge: null,

    /**
     * Special Registers
     * It is just a map, easy to remember.
     * @enum {number}
     */
    special: {
      P1: 0xFF00,
      SC: 0xFF02,
      DIV: 0xFF04,
      TIMA: 0xFF05,
      TMA: 0xFF06,
      TAC: 0xFF07,
      IF: 0xFF0F,
      NR10: 0xFF10,
      NR11: 0xFF11,
      NR12: 0xFF12,
      NR14: 0xFF14,
      NR21: 0xFF16,
      NR22: 0xFF17,
      NR24: 0xFF19,
      NR30: 0xFF1A,
      NR31: 0xFF1B,
      NR32: 0xFF1C,
      NR33: 0xFF1E,
      NR41: 0xFF20,
      NR42: 0xFF21,
      NR43: 0xFF22,
      NR44: 0xFF23,
      NR50: 0xFF24,
      NR51: 0xFF25,
      NR52: 0xFF26,
      LCDC: 0xFF40,
      STAT: 0xFF41,
      SCY: 0xFF42,
      SCX: 0xFF43,
      LY: 0xFF44,
      LYC: 0xFF45,
      DMA: 0xFF46,
      BGP: 0xFF47,
      OBP0: 0xFF48,
      OBP1: 0xFF49,
      WY: 0xFF4A,
      WX: 0xFF4B,
      IE: 0xFFFF
    },

    /**
     * Initialize the memory.
     * @param {cartridge} cartridge - The Game
     */
    initialize: function(cartridge) {
      this.cartridge = cartridge;

      this.initializeMemoryWithRandomData();

      this.ram[this.special.P1] = 0xFF;
      this.ram[this.special.DIV] = 0xAF;
      this.ram[this.special.TIMA] = 0x00;
      this.ram[this.special.TMA] = 0x00;
      this.ram[this.special.TAC] = 0x00;
      this.ram[this.special.NR10] = 0x80;
      this.ram[this.special.NR11] = 0xBF;
      this.ram[this.special.NR12] = 0xF3;
      this.ram[this.special.NR14] = 0xBF;
      this.ram[this.special.NR21] = 0x3F;
      this.ram[this.special.NR22] = 0x00;
      this.ram[this.special.NR24] = 0xBF;
      this.ram[this.special.NR30] = 0x7F;
      this.ram[this.special.NR31] = 0xFF;
      this.ram[this.special.NR32] = 0x9F;
      this.ram[this.special.NR33] = 0xBF;
      this.ram[this.special.NR41] = 0xFF;
      this.ram[this.special.NR42] = 0x00;
      this.ram[this.special.NR43] = 0x00;
      this.ram[this.special.NR44] = 0xBF;
      this.ram[this.special.NR50] = 0x77;
      this.ram[this.special.NR51] = 0xF3;
      this.ram[this.special.NR52] = 0xF1; // $F1-GB, $F0-SGB ; NR52
      this.ram[this.special.LCDC] = 0x91;
      this.ram[this.special.SCY] = 0x00;
      this.ram[this.special.SCX] = 0x00;
      this.ram[this.special.LYC] = 0x00;
      this.ram[this.special.BGP] = 0xFC;
      this.ram[this.special.OBP0] = 0xFF;
      this.ram[this.special.OBP1] = 0xFF;
      this.ram[this.special.WY] = 0x00;
      this.ram[this.special.WX] = 0x00;
      this.ram[this.special.IE] = 0x00;

      return this;
    },

    /**
     * Initialize the memory with Random data.
     */
    initializeMemoryWithRandomData: function() {
      var i = 0,
        length = 0;

      for (i = 0, length = this.ram.length; i < length; i++) {
        this.ram[i] = Math.floor(Math.random() * 0xFF);
      }

      for (i = 0, length = this.eram.length; i < length; i++) {
        this.eram[i] = Math.floor(Math.random() * 0xFF);
      }
    },

    /**
     * Read a word from the memory address addr
     *
     * @public
     * @param {number} addr - The given address
     * @returns {number} A word (double byte)
     */
    readWord: function(addr) {
      addr &= 0xFFFF;

      return 0;
    },

    /**
     * Read a byte from the memory address addr
     *
     * @public
     * @param {number} addr - The given address
     * @returns {number} A byte
     */
    readByte: function(addr) {
      addr &= 0xFFFF;

      switch (addr & 0xF000) {
        case 0x0000:
        case 0x1000:
        case 0x2000:
        case 0x3000:
          return this.cartridge.readByte(addr);
        case 0x4000:
        case 0x5000:
        case 0x6000:
        case 0x7000:
          return 0;
        // return cartridge.read_byte((addr - 0x4000) + (current_rom_bank * 0x4000));
        case 0x8000:
        case 0x9000:
          return 0;
        case 0xA000:
        case 0xB000:
          return this.eram[(addr - 0xA000) + (this.current_ram_bank * 0x2000)];
        case 0xF000:
          switch (addr & 0x0FFF) {
            case 0xF00:
              return 0;
            //return joypad_mem_state();
        }
      }
      return this.ram[addr];
    },

    /**
     * Store the given data on the memory address given by addr.
     * The data is converted to a 8 bit number.
     *
     * @public
     * @param {number} addr - The address to store the data
     * @param {number} data - The data to store.
     */
    writeByte: function(addr, data) {
      addr &= 0xFFFF;
      data &= 0xFF;

      // implementation
    },

    /**
     * Store the given data on the memory address given by addr.
     * The data is converted to a 16 bit number.
     *
     * @public
     * @param {number} addr - The address to store the data
     * @param {number} data - The data to store.
     */
    writeWord: function(addr, data) {
      addr &= 0xFFFF;
      data &= 0xFFFF;

      this.writeByte(addr, (data & 0xFF));
      this.writeByte((addr + 1), ((data >> 8) & 0xFF));
    }
  };

  return memory;
});
