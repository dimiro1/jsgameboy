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

define('cpu', [], function() {
  'use strict';

  /**
   * A Module that represents a CPU - Z80 like
   *
   * @author Claudemiro Alves Feitosa Neto <dimiro1@gmail.com>
   * @exports cpu/cpu
   * @exports cpu/instructions
   */

  /**
   * utilities functions
   */
  var util = {

    /**
     * Test if the bit is set in the given number
     *
     * @param {number} x - The number
     * @param {number} bit - The bit
     */
    testBit: function(x, bit) {
      return (x & (1 << bit)) > 0;
    }
  };

  /**
   * CPU (Z80 - 8080) Like GameBoy
   */
  var cpu = {
    /**
     * Processor clock speed in HZ
     * 4.194304 MHZ
     *
     * @constant
     * @default
     * @type {number}
     */
    CLOCK_SPEED: 4194304,

    /**
     * Get the maximum cycles per frame.
     * 
     * @returns {number}
     */
    get maxCycles() {
      return this.CLOCK_SPEED / 60;
    },

    /**
     * The opcode of the last operation
     *
     * @type {number}
     */
    lastOperation: 0,

    /**
     * How much time was used
     */
    cpuTime: 0,

    /**
     * Initialize the CPU.
     */
    initialize: function() {
      this.regs.af = 0x01B0;
      this.regs.bc = 0x0013;
      this.regs.de = 0x00D8;
      this.regs.hl = 0x014D;
      this.regs.sp = 0xFFFE;
      this.regs.pc = 0x0100;

      return this;
    },

    /**
     * The CPU registers.
     *
     * a, f, h, l, d, e are 8 bit registers, but they can be combined
     * to 16 bit registers when aligned. af, hl, de.
     * pc and sp are 16 bit registers.
     */
    regs: {
      _h: 0,
      _l: 0,
      _a: 0,
      _d: 0,
      _e: 0,
      _pc: 0,
      _sp: 0,

      /**
       * Processor flags.
       * 
       * The flags are:
       * bit 7 - z = Zero Flag
       * bit 6 - n = Add/Sub-Flag (BCD)
       * bit 5 - h = Half Carry Flag (BCD)
       * bit 4 - c = Carry Flag
       */
      flags: {
        z: false,
        n: false,
        h: false,
        c: false
      },

      /**
       * Get the value of the pc register
       *
       * @returns {number} pc - program counter
       */
      get pc() {
        return this._pc;
      },
      /**
       * SAssign the pc register.
       *
       * The value is masked with 0xFFFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set pc(n){
        this._pc = n & 0xFFFF;
      },

      /**
       * Get the value of the sp register
       *
       * @returns {number} sp - stack counter
       */
      get sp() {
        return this._sp;
      },
      /**
       * Assign the sp register.
       *
       * The value is masked with 0xFFFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set sp(n){
        this._sp = n & 0xFFFF;
      },

      /**
       * Get the value of the a register
       *
       * @returns {number} a
       */
      get a() {
        return this._a;
      },
      /**
       * Assign the a register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set a(n){
        this._a = n & 0xFF;
      },

      /**
       * Get the value of the f register
       * Only the higher bits are used.
       * The lower bits are allways 0.
       * Ex: 1111 0000
       *
       * @returns {number} f
       */
      get f() {
        return (this.flags.z << 7) | (this.flags.n << 6) | (this.flags.h << 5) | (this.flags.c << 4);
      },
      /**
       * Assign the f register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * Only the higher bits are set.
       * The lower bits are allways 0.
       * Ex: 1111 0000
       *
       * @param {number} n - The value to assign
       */
      set f(n){
        n &= 0xFF;
        this.flags.z = (n & 0x80) > 0;
        this.flags.n = (n & 0x40) > 0;
        this.flags.h = (n & 0x20) > 0;
        this.flags.c = (n & 0x10) > 0;
      },

      /**
       * Get the value of the af register
       *
       * @returns {number} af - The combined registers
       */
      get af() {
        return (this.a << 8) | (this.f << 0);
      },
      /**
       * Assign the af register.
       *
       * The value is masked with 0xFFFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set af(n){
        n &= 0xFFFF;

        this.a = n >> 8;
        this.f = n & 0xFF;
      },

      /**
       * Get the value of the h register
       *
       * @returns {number} h
       */
      get h() {
        return this._h;
      },
      /**
       * Assign the h register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set h(n){
        this._h = n & 0xFF;
      },

      /**
       * Get the value of the l register
       *
       * @returns {number} l
       */
      get l() {
        return this._l;
      },
      /**
       * Assign the l register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set l(n){
        this._l = n & 0xFF;
      },

      /**
       * Get the value of the hl register
       *
       * @returns {number} hl - The combined registers
       */
      get hl() {
        return (this.h << 8) | (this.l << 0);
      },
      /**
       * Assign the hl register.
       *
       * The value is masked with 0xFFFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set hl(n){
        n &= 0xFFFF;

        this.h = (n >> 8) & 0xFF;
        this.l = n & 0xFF;
      },

      /**
       * Get the value of the b register
       *
       * @returns {number} b
       */
      get b() {
        return this._b;
      },
      /**
       * Assign the b register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set b(n){
        this._b = n & 0xFF;
      },

      /**
       * Get the value of the c register
       *
       * @returns {number} c
       */
      get c() {
        return this._c;
      },
      /**
       * Assign the c register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set c(n){
        this._c = n & 0xFF;
      },

      /**
       * Get the value of the bc register
       *
       * @returns {number} bc - The combined registers
       */
      get bc() {
        return (this.b << 8) | (this.c << 0);
      },
      /**
       * Assign the bc register.
       *
       * The value is masked with 0xFFFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set bc(n){
        n &= 0xFFFF;

        this.b = (n >> 8) & 0xFF;
        this.c = n & 0xFF;
      },

      /**
       * Get the value of the d register
       *
       * @returns {number} d
       */
      get d() {
        return this._d;
      },
      /**
       * Assign the d register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set d(n){
        this._d = n & 0xFF;
      },

      /**
       * Get the value of the e register
       *
       * @returns {number} e
       */
      get e() {
        return this._e;
      },
      /**
       * Assign the e register.
       *
       * The value is masked with 0xFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set e(n){
        this._e = n & 0xFF;
      },

      /**
       * Get the value of the de register
       *
       * @returns {number} de - The combined registers
       */
      get de() {
        return (this.d << 8) | (this.e << 0);
      },
      /**
       * Assign the de register.
       *
       * The value is masked with 0xFFFF, so I can make sure thet it does not overflow.
       * @param {number} n - The value to assign
       */
      set de(n){
        n &= 0xFFFF;

        this.d = (n >> 8) & 0xFF;
        this.e = n & 0xFF;
      }
    },

    /**
     * Verify if the CPU can execute.
     * @public
     */
    canExecute: function() {
      if (this.cpuTime < this.maxCycles()) {
        return true;
      } else if (this.cpuTime > this.maxCycles()) {
        this.cpuTime -= this.maxCycles();
      } else {
        this.cpuTime = 0;
      }

      return false;
    },

    /**
     * Main cpu loop.
     *
     * Process one instruction at a time.
     * @public
     * @returns {number} total_cycles - The total of cycles executed.
     */
    step: function(gb) {
      var totalCycles = 0,
        operation = gb.memory.readByte(gb.cpu.regs.pc);

      if (this.lastOperation === 0xCB) {
        totalCycles += this.instructions[operation].run(gb);
      } else {
        totalCycles += this.extended_instructions[operation].run(gb);
      }

      this.lastOperation = operation;

      // Handling interrupts

      return totalCycles;
    },

    /**
     * Abort the execution.
     *
     * Called when an invalid opcode is found.
     * @param {string} message - A message to display.
     * @private
     */
    abort: function(message) {
      throw new Error(message);
    },

    /**
     * Pop an operand from stack.
     * @private
     */
    pop: function(gb) {
      var temp = gb.memory.readWord(this.regs.sp);
      this.regs.sp += 2;

      return temp;
    },

    instructions: {
      // nop
      0x00: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD BC, d16
      0x01: {
        cycles: 12,
        length: 3,
        run: function(gb) {
          gb.cpu.regs.bc = gb.memory.readWord(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (BC), A
      0x02: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.bc, gb.cpu.regs.a);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC BC
      0x03: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.bc++;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC B
      0x04: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b += 1;

          gb.cpu.regs.flags.h = (gb.cpu.regs.b & 0x0F) === 0;
          gb.cpu.regs.flags.z = (gb.cpu.regs.b === 0);
          gb.cpu.regs.flags.n = false;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC B
      0x05: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b -= 1;

          gb.cpu.regs.flags.h = (gb.cpu.regs.b & 0x0F) === 0x0F;
          gb.cpu.regs.flags.z = (gb.cpu.regs.b === 0);
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B, d8
      0x06: {
        cycles: 8,
        length: 2,
        run: function(gb) {
          gb.cpu.regs.b = gb.memory.readByte(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // RLCA
      0x07: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.c = util.testBit(gb.cpu.regs.a, 7);

          gb.cpu.regs.a = ((gb.cpu.regs.a << 1) & 0xFF) | gb.cpu.regs.flags.c;

          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.z = false;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (a16),SP
      0x08: {
        cycles: 20,
        length: 3,
        run: function(gb) {
          gb.memory.writeWord(gb.memory.readWord(gb.cpu.regs.pc + 1), gb.cpu.regs.sp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD HL,BC
      0x09: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.hl & 0xFFF) + (gb.cpu.regs.bc & 0xFFF)) > 0xFFF;
          gb.cpu.regs.flags.c = (gb.cpu.regs.hl + gb.cpu.regs.bc) > 0xFFFF;

          gb.cpu.regs.hl += gb.cpu.regs.bc;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,(BC)
      0x0A: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.memory.readByte(gb.cpu.regs.bc);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC BC
      0x0B: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.bc -= 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC C
      0x0C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c += 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.c === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.c & 0x0F) === 0;
          gb.cpu.regs.flags.n = false;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC C
      0x0D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c -= 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.c === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.c & 0x0F) === 0x0F;
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,d8
      0x0E: {
        cycles: 8,
        length: 2,
        run: function(gb) {
          gb.cpu.regs.c = gb.memory.readByte(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // RRCA
      0x0F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.c = util.testBit(gb.cpu.regs.a, 0);
          gb.cpu.regs.a = (gb.cpu.regs.a >> 1) | (gb.cpu.regs.flags.c << 7);

          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.z = false;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // STOP
      0x10: {
        cycles: 4,
        length: 2,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD DE,d16
      0x11: {
        cycles: 12,
        length: 3,
        run: function(gb) {
          gb.cpu.regs.de = gb.memory.readWord(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (DE+),A
      0x12: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.de, gb.cpu.regs.a);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC DE
      0x13: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.de += 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC D
      0x14: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d += 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.d === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.d & 0x0F) === 0;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC D
      0x15: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d -= 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.d === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.d & 0x0F) === 0x0F;
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,d8
      0x16: {
        cycles: 8,
        length: 2,
        run: function(gb) {
          gb.cpu.regs.d = gb.memory.readByte(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // RLA
      0x17: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;

          gb.cpu.regs.flags.c = util.testBit(gb.cpu.regs.a, 7);
          gb.cpu.regs.a = (gb.cpu.regs.a << 1) & 0xFF | temp;

          gb.cpu.regs.flags.z = false;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // JR r8
      0x18: {
        cycles: 12,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += gb.memory.readByte(gb.cpu.regs.pc) + this.length;

          return this.cycles;
        }
      },
      // ADD HL,DE
      0x19: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.hl & 0xFFF) + (gb.cpu.regs.de & 0xFFF)) > 0xFFF;
          gb.cpu.regs.flags.c = (gb.cpu.regs.hl + gb.cpu.regs.de) > 0xFFFF;

          gb.cpu.regs.hl += gb.cpu.regs.de;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,(DE)
      0x1A: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.memory.readByte(gb.cpu.regs.de);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC DE
      0x1B: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.de -= 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC E
      0x1C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e += 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.e === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.e & 0x0F) === 0;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC E
      0x1D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e -= 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.e === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.e & 0x0F) === 0x0F;
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,d8
      0x1E: {
        cycles: 8,
        length: 2,
        run: function(gb) {
          gb.cpu.regs.e = gb.memory.readByte(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // RRA
      0x1F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.c = util.testBit(gb.cpu.regs.a, 0);
          gb.cpu.regs.a = (gb.cpu.regs.a >> 1) | (temp << 7);

          gb.cpu.regs.flags.z = false;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // JR NZ, r8
      0x20: {
        cycles: [12, 8],
        length: 2,
        run: function(gb) {
          if (gb.cpu.regs.flags.z === false) {
            gb.cpu.regs.pc += gb.memory.readByte(gb.cpu.regs.pc + 1) + this.length;

            return this.cycles[0];
          } else {
            gb.cpu.regs.pc += this.length;

            return this.cycles[1];
          }
        }
      },
      // LD HL,d16
      0x21: {
        cycles: 12,
        length: 3,
        run: function(gb) {
          gb.cpu.regs.hl = gb.memory.readWord(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LDI (HL+),A
      0x22: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.a);
          gb.cpu.regs.hl += 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC HL
      0x23: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.hl += 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC H
      0x24: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h += 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.h === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.h & 0x0F) === 0;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC H
      0x25: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h -= 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.h === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.h & 0x0F) === 0x0F;
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,d8
      0x26: {
        cycles: 8,
        length: 2,
        run: function(gb) {
          gb.cpu.regs.h = gb.memory.readByte(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DAA - Decimal Adjust Accumulator
      // TODO: DAA
      0x27: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          return this.cycles;
        }
      },
      // JR Z, r8
      0x28: {
        cycles: [12, 8],
        length: 2,
        run: function(gb) {
          if (gb.cpu.regs.flags.z === true) {
            gb.cpu.regs.pc += gb.memory.readByte(gb.cpu.regs.pc + 1) + this.length;

            return this.cycles[0];
          } else {
            gb.cpu.regs.pc += this.length;

            return this.cycles[1];
          }

          return this.cycles;
        }
      },
      // ADD HL,HL
      0x29: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.hl & 0xFFF) + (gb.cpu.regs.hl & 0xFFF)) > 0xFFF;
          gb.cpu.regs.flags.c = (gb.cpu.regs.hl + gb.cpu.regs.hl) > 0xFFFF;

          gb.cpu.regs.hl += gb.cpu.regs.hl;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LDI A,(HL+)
      0x2A: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.hl += 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC HL
      0x2B: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.hl -= 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC L
      0x2C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l += 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.l === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.l & 0x0F) === 0;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC L
      0x2D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l -= 1;

          gb.cpu.regs.flags.z = (gb.cpu.regs.l === 0);
          gb.cpu.regs.flags.h = (gb.cpu.regs.l & 0x0F) === 0x0F;
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,d8
      0x2E: {
        cycles: 8,
        length: 2,
        run: function(gb) {
          gb.cpu.regs.l = gb.memory.readByte(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CPL
      0x2F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = ~gb.cpu.regs.a;
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // JR NC, r8
      0x30: {
        cycles: [12, 8],
        length: 2,
        run: function(gb) {
          if (gb.cpu.regs.flags.c === false) {
            gb.cpu.regs.pc += gb.memory.readByte(gb.cpu.regs.pc + 1) + this.length;

            return this.cycles[0];
          } else {
            gb.cpu.regs.pc += this.length;

            return this.cycles[1];
          }
        }
      },
      // LD SP, d16
      0x31: {
        cycles: 12,
        length: 3,
        run: function(gb) {
          gb.cpu.regs.sp = gb.memory.readWord(gb.cpu.regs.pc);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LDD (HL),A
      0x32: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.a);
          gb.cpu.regs.hl -= 1;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC SP
      0x33: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.sp++;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC (HL)
      0x34: {
        cycles: 12,
        length: 1,
        run: function(gb) {
          var temp = gb.memory.readByte(gb.cpu.regs.hl);
          temp++;
          gb.memory.writeByte(gb.cpu.regs.hl, temp);

          gb.cpu.regs.flags.z = (temp === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = (temp & 0x0F) === 0;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC (HL)
      0x35: {
        cycles: 12,
        length: 1,
        run: function(gb) {
          var temp = gb.memory.readByte(gb.cpu.regs.hl);
          temp--;
          gb.memory.writeByte(gb.cpu.regs.hl, temp);

          gb.cpu.regs.flags.z = (temp === 0);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = (temp & 0x0F) === 0x0F;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL), d8
      0x36: {
        cycles: 12,
        length: 2,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.memory.readByte(gb.cpu.regs.pc + 1));
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SCF
      0x37: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = true;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // JR C, r8
      0x38: {
        cycles: [12, 8],
        length: 2,
        run: function(gb) {
          if (gb.cpu.regs.flags.c === true) {
            gb.cpu.regs.pc += gb.memory.readByte(gb.cpu.regs.pc + 1) + this.length;

            return this.cycles[0];
          } else {
            gb.cpu.regs.pc += this.length;

            return this.cycles[1];
          }

          return this.cycles;
        }
      },
      // ADD HL,SP
      0x39: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.flags.n = false;
          gb.cpu.flags.h = ((gb.cpu.regs.hl & 0xFFF) + (gb.cpu.regs.sp & 0xFFF)) > 0xFFF;
          gb.cpu.flags.c = (gb.cpu.regs.hl + gb.cpu.regs.pc) > 0xFFFF;

          gb.cpu.regs.hl += gb.cpu.regs.sp;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LDD A,(HL)
      0x3A: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.hl--;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC SP
      0x3B: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.sp--;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // INC A
      0x3C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a++;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = (gb.cpu.regs.a & 0x0F) === 0;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // DEC A
      0x3D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a--;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = (gb.cpu.regs.a & 0x0F) === 0x0F;

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A, d8
      0x3E: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.memory.readByte(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CCF
      0x3F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.regs.flags.c = !gb.regs.flags.c;
          gb.regs.flags.n = false;
          gb.regs.flags.h = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B,B
      0x40: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;
          return this.cycles;
        }
      },
      // LD B,C
      0x41: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b = gb.cpu.regs.c;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B,D
      0x42: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b = gb.cpu.regs.d;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B,E
      0x43: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b = gb.cpu.regs.e;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B,H
      0x44: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b = gb.cpu.regs.h;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B,L
      0x45: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b = gb.cpu.regs.l;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B,(HL)
      0x46: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD B,A
      0x47: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.b = gb.cpu.regs.a;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,B
      0x48: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c = gb.cpu.regs.b;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,C
      0x49: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;
          return this.cycles;
        }
      },
      // LD C,D
      0x4A: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c = gb.cpu.regs.d;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,E
      0x4B: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c = gb.cpu.regs.e;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,H
      0x4C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c = gb.cpu.regs.h;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,L
      0x4D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c = gb.cpu.regs.l;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,(HL)
      0x4E: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD C,A
      0x4F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.c = gb.cpu.regs.a;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,B
      0x50: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d = gb.cpu.regs.b;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,C
      0x51: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d = gb.cpu.regs.c;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,D
      0x52: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,E
      0x53: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d = gb.cpu.regs.e;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,H
      0x54: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d = gb.cpu.regs.h;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,L
      0x55: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d = gb.cpu.regs.l;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,(HL)
      0x56: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD D,A
      0x57: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.d = gb.cpu.regs.a;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,B
      0x58: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e = gb.cpu.regs.b;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,C
      0x59: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e = gb.cpu.regs.c;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,D
      0x5A: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e = gb.cpu.regs.d;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,E
      0x5B: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,H
      0x5C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e = gb.cpu.regs.h;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,L
      0x5D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e = gb.cpu.regs.l;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,(HL)
      0x5E: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD E,A
      0x5F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.e = gb.cpu.regs.a;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,B
      0x60: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h = gb.cpu.regs.b;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,C
      0x61: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h = gb.cpu.regs.c;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,D
      0x62: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h = gb.cpu.regs.d;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,E
      0x63: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h = gb.cpu.regs.e;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,H
      0x64: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,L
      0x65: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h = gb.cpu.regs.l;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,(HL)
      0x66: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD H,A
      0x67: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.h = gb.cpu.regs.a;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,B
      0x68: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l = gb.cpu.regs.b;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,C
      0x69: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l = gb.cpu.regs.c;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,D
      0x6A: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l = gb.cpu.regs.d;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,E
      0x6B: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l = gb.cpu.regs.e;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,H
      0x6C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l = gb.cpu.regs.h;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,L
      0x6D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,(HL)
      0x6E: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD L,A
      0x6F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.l = gb.cpu.regs.a;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL),B
      0x70: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.b);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL),C
      0x71: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.c);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL),D
      0x72: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.d);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL),E
      0x73: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.e);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL),H
      0x74: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.h);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL),L
      0x75: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.l);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // HALT
      // TODO: HALT
      0x76: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          // if (gb.cpu.ime === true) {
          //   gb.cpu.halt = true;
          // }
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD (HL),A
      0x77: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.memory.writeByte(gb.cpu.regs.hl, gb.cpu.regs.a);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,B
      0x78: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.cpu.regs.b;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,C
      0x79: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.cpu.regs.c;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,D
      0x7A: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.cpu.regs.d;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,E
      0x7B: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.cpu.regs.e;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,H
      0x7C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.cpu.regs.h;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,L
      0x7D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.cpu.regs.l;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,(HL)
      0x7E: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a = gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // LD A,A
      0x7F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,B
      0x80: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.b & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + gb.cpu.regs.b) > 0xFF;

          gb.cpu.regs.a += gb.cpu.regs.b;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,C
      0x81: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.c & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + gb.cpu.regs.c) > 0xFF;

          gb.cpu.regs.a += gb.cpu.regs.c;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,D
      0x82: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.d & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + gb.cpu.regs.d) > 0xFF;

          gb.cpu.regs.a += gb.cpu.regs.d;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,E
      0x83: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.e & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + gb.cpu.regs.e) > 0xFF;

          gb.cpu.regs.a += gb.cpu.regs.e;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,H
      0x84: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.h & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + gb.cpu.regs.h) > 0xFF;

          gb.cpu.regs.a += gb.cpu.regs.h;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,L
      0x85: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.l & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + gb.cpu.regs.l) > 0xFF;

          gb.cpu.regs.a += gb.cpu.regs.l;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,(HL)
      0x86: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          var temp = gb.memory.readByte(gb.cpu.regs.hl);

          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (temp & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + temp) > 0xFF;

          gb.cpu.regs.a += temp;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADD A,A
      0x87: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.a & 0x0F)) > 0x0F;
          gb.cpu.regs.flags.c = (gb.cpu.regs.a + gb.cpu.regs.a) > 0xFF;

          gb.cpu.regs.a += gb.cpu.regs.a;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);

          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,B
      0x88: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.b & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (gb.cpu.regs.b & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (gb.cpu.regs.b + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,C
      0x89: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.c & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (gb.cpu.regs.c & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (gb.cpu.regs.c + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,D
      0x8A: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.d & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (gb.cpu.regs.d & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (gb.cpu.regs.d + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,E
      0x8B: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.e & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (gb.cpu.regs.e & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (gb.cpu.regs.e + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,H
      0x8C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.h & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (gb.cpu.regs.h & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (gb.cpu.regs.h + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,L
      0x8D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.l & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (gb.cpu.regs.l & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (gb.cpu.regs.l + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,(HL)
      0x8E: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          var value = gb.memory.readByte(gb.cpu.regs.hl);

          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (value & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (value & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (value + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // ADC A,A
      0x8F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) + (gb.cpu.regs.a & 0x0F) + temp) > 0x0F;
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) + (gb.cpu.regs.a & 0xFF) + temp) > 0xFF;
          gb.cpu.regs.a += (gb.cpu.regs.a + temp);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB B
      0x90: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (gb.cpu.regs.b & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (gb.cpu.regs.b & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= gb.cpu.regs.b;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB C
      0x91: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (gb.cpu.regs.c & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (gb.cpu.regs.c & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= gb.cpu.regs.c;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB D
      0x92: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (gb.cpu.regs.d & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (gb.cpu.regs.d & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= gb.cpu.regs.d;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB E
      0x93: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (gb.cpu.regs.e & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (gb.cpu.regs.e & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= gb.cpu.regs.e;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB H
      0x94: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (gb.cpu.regs.h & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (gb.cpu.regs.h & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= gb.cpu.regs.h;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB L
      0x95: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (gb.cpu.regs.l & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (gb.cpu.regs.l & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= gb.cpu.regs.l;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB (HL)
      0x96: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          var temp = gb.memory.readByte(gb.cpu.regs.hl);

          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (temp & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= temp;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SUB A
      0x97: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (gb.cpu.regs.a & 0x0F));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < (gb.cpu.regs.a & 0xFF));
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.a -= gb.cpu.regs.a;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,B
      0x98: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((gb.cpu.regs.b & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((gb.cpu.regs.b & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (gb.cpu.regs.b - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,C
      0x99: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((gb.cpu.regs.c & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((gb.cpu.regs.c & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (gb.cpu.regs.c - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,D
      0x9A: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((gb.cpu.regs.d & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((gb.cpu.regs.d & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (gb.cpu.regs.d - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,E
      0x9B: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((gb.cpu.regs.e & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((gb.cpu.regs.e & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (gb.cpu.regs.e - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,H
      0x9C: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((gb.cpu.regs.h & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((gb.cpu.regs.h & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (gb.cpu.regs.h - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,L
      0x9D: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((gb.cpu.regs.l & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((gb.cpu.regs.l & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (gb.cpu.regs.l - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,(HL)
      0x9E: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          var value = gb.memory.readByte(gb.cpu.regs.hl);

          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((value & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((value & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (value - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // SBC A,A
      0x9F: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.flags.c;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < ((gb.cpu.regs.a & 0x0F) + temp));
          gb.cpu.regs.flags.c = ((gb.cpu.regs.a & 0xFF) < ((gb.cpu.regs.a & 0xFF) + temp));
          gb.cpu.regs.flags.n = true;

          gb.cpu.regs.a -= (gb.cpu.regs.a - temp);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND B
      0xA0: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.cpu.regs.b;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND C
      0xA1: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.cpu.regs.c;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND D
      0xA2: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.cpu.regs.d;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND E
      0xA3: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.cpu.regs.e;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND H
      0xA4: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.cpu.regs.h;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND L
      0xA5: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.cpu.regs.l;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND (HL)
      0xA6: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.emmory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // AND A
      0xA7: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a &= gb.cpu.regs.a;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = true;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR B
      0xA8: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.cpu.regs.b;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR C
      0xA9: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.cpu.regs.c;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR D
      0xAA: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.cpu.regs.d;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR E
      0xAB: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.cpu.regs.e;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR H
      0xAC: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.cpu.regs.h;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR L
      0xAD: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.cpu.regs.l;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR (HL)
      0xAE: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // XOR A
      0xAF: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a ^= gb.cpu.regs.a;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR B
      0xB0: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.cpu.regs.b;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR C
      0xB1: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.cpu.regs.c;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR D
      0xB2: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.cpu.regs.d;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR E
      0xB3: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.cpu.regs.e;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR H
      0xB4: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.cpu.regs.h;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR L
      0xB5: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.cpu.regs.l;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR (HL)
      0xB6: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.memory.readByte(gb.cpu.regs.hl);
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // OR A
      0xB7: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.a |= gb.cpu.regs.a;
          gb.cpu.regs.flags.z = (gb.cpu.regs.a === 0);
          gb.cpu.regs.flags.n = false;
          gb.cpu.regs.flags.h = false;
          gb.cpu.regs.flags.c = false;
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP B
      0xB8: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.b;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP C
      0xB9: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.c;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP D
      0xBA: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.d;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP E
      0xBB: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.e;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP H
      0xBC: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.h;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP L
      0xBD: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.l;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP (HL)
      0xBE: {
        cycles: 8,
        length: 1,
        run: function(gb) {
          var temp = gb.memory.readByte(gb.cpu.regs.hl);

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CP A
      0xBF: {
        cycles: 4,
        length: 1,
        run: function(gb) {
          var temp = gb.cpu.regs.a;

          gb.cpu.regs.flags.z = (gb.cpu.regs.a === temp);
          gb.cpu.regs.flags.n = true;
          gb.cpu.regs.flags.h = ((gb.cpu.regs.a & 0x0F) < (temp & 0x0F));
          gb.cpu.regs.flags.c = (gb.cpu.regs.a < temp);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // RET NZ
      0xC0: {
        cycles: [20, 8],
        length: 1,
        run: function(gb) {
          if (!gb.cpu.regs.flags.z) {
            gb.cpu.regs.pc = gb.cpu.pop(gb);
            return this.cycles[0];
          } else {
            gb.cpu.regs.pc += this.length;
            return this.cycles[1];
          }
        }
      },
      // POP BC
      0xC1: {
        cycles: 12,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.bc = gb.cpu.pop(gb);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // JP NZ, a16
      0xC2: {
        cycles: [16, 12],
        length: 3,
        run: function(gb) {
          if (gb.cpu.regs.flags.z === false) {
            gb.cpu.regs.pc = gb.memory.readWord(gb.cpu.regs.pc + 1);
            return this.cycles[0];
          } else {
            gb.cpu.regs.pc += this.length;
            return this.cycles[1];
          }
        }
      },
      // JP a16
      0xC3: {
        cycles: 16,
        length: 3,
        run: function(gb) {
          gb.cpu.regs.pc = gb.memory.readWord(gb.cpu.regs.pc + 1);
          gb.cpu.regs.pc += this.length;

          return this.cycles;
        }
      },
      // CALL NZ, a16
      0xC4: {
        cycles: [24, 12],
        length: 3,
        run: function(gb) {
          if (gb.cpu.regs.flags.z === false) {
            gb.cpu.regs.sp -= 2;
            gb.memory.writeWord(gb.cpu.regs.sp, gb.memory.readWord(gb.cpu.regs.pc + 1));
            gb.cpu.regs.pc = gb.memory.readWord(gb.cpu.regs.pc + 1);

            return this.cycles[0];
          } else {
            gb.cpu.regs.pc += this.length;

            return this.cycles[1];
          }
        }
      },
      // PUSH BC
      0xC5: {
        cycles: 16,
        length: 1,
        run: function(gb) {
          gb.cpu.regs.sp -= 2;
          gb.memory.writeWord(gb.cpu.regs.sp, gb.memory.readWord(gb.cpu.regs.bc));
          gb.cpu.regs.pc += this.length;
          
          return this.cycles;
        }
      },
      // ADD A, d8
      0xC6: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 0
      0xC7: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RET Z
      0xC8: {
        cycles: [20, 8],
        run: function(gb) {
          return this.cycles;
        }
      },
      // RET
      0xC9: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // JP Z, a16
      0xCA: {
        cycles: [16, 12],
        run: function(gb) {
          return this.cycles;
        }
      },
      // CALL Z, a16
      0xCC: {
        cycles: [24, 12],
        run: function(gb) {
          return this.cycles;
        }
      },
      // CALL a16
      0xCD: {
        cycles: 24,
        run: function(gb) {
          return this.cycles;
        }
      },
      // ADC A, d8
      0xCE: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 8
      0xCF: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RET NC
      0xD0: {
        cycles: [20, 8],
        run: function(gb) {
          return this.cycles;
        }
      },
      // POP DE
      0xD1: {
        cycles: 12,
        run: function(gb) {
          return this.cycles;
        }
      },
      // JP NC
      0xD2: {
        cycles: [16, 12],
        run: function(gb) {
          return this.cycles;
        }
      },
      // unknown
      0xD3: {
        cycles: 4,
        run: function(gb) {
          cpu.abort("Unknown Opcode: 0xD3");
        }
      },
      // CALL NC
      0xD4: {
        cycles: [24, 12],
        run: function(gb) {
          return this.cycles;
        }
      },
      // PUSH DE
      0xD5: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SUB u8
      0xD6: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 10
      0xD7: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RET C
      0xD8: {
        cycles: [20, 8],
        run: function(gb) {
          return this.cycles;
        }
      },
      // RETI
      0xD9: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // JP C
      0xDA: {
        cycles: [16, 12],
        run: function(gb) {
          return this.cycles;
        }
      },
      // unknown
      0xDB: {
        cycles: 0,
        run: function(gb) {
          cpu.abort("Unknown Opcode: 0xDB");
        }
      },
      // CALL C
      0xDC: {
        cycles: [24, 12],
        run: function(gb) {
          return this.cycles;
        }
      },
      // unknown
      0xDD: {
        cycles: 0,
        run: function(gb) {
          cpu.abort("Unknown Opcode: 0xDD");
        }
      },
      // SBC A,d8
      0xDE: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 18
      0xDF: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LDH (a8),A
      0xE0: {
        cycles: 12,
        run: function(gb) {
          return this.cycles;
        }
      },
      // POP HL
      0xE1: {
        cycles: 12,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LDH (C),A
      0xE2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // unknown
      0xE3: {
        cycles: 0,
        run: function(gb) {
          cpu.abort("Unknown Opcode: 0xE3");
        }
      },
      // unknown
      0xE4: {
        cycles: 0,
        run: function(gb) {
          cpu.abort("Unknown Opcode: 0xE4");
        }
      },
      // PUSH HL
      0xE5: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // AND n
      0xE6: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 20
      0xE7: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // ADD SP, r8
      0xE8: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // JP HL
      0xE9: {
        cycles: 4,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LD (a16),A
      0xEA: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // unknown
      0xEB: {
        cycles: 0,
        run: function(gb) {
          cpu.abort('Unknown Opcode: 0xEB');
        }
      },
      // unknown
      0xEC: {
        cycles: 0,
        run: function(gb) {
          cpu.abort('Unknown Opcode: 0xEC');
        }
      },
      // unknown
      0xED: {
        cycles: 0,
        run: function(gb) {
          cpu.abort("Unknown Opcode: 0xED");
        }
      },
      // XOR n
      0xEE: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 28
      0xEF: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LDH A,(a8)
      0xF0: {
        cycles: 12,
        run: function(gb) {
          return this.cycles;
        }
      },
      // POP AF
      0xF1: {
        cycles: 12,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LDH A,(C)
      0xF2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // DI
      0xF3: {
        cycles: 4,
        run: function(gb) {
          return this.cycles;
        }
      },
      // unknown
      0xF4: {
        cycles: 0,
        run: function(gb) {
          cpu.abort('Unknown Opcode: 0xF4');
        }
      },
      // PUSH AF
      0xF5: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // OR n
      0xF6: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 30
      0xF7: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LD HL, SP + r8
      0xF8: {
        cycles: 12,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LD SP,HL
      0xF9: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // LD A,(a16)
      0xFA: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // EI
      0xFB: {
        cycles: 4,
        run: function(gb) {
          return this.cycles;
        }
      },
      // unknown
      0xFC: {
        cycles: 0,
        run: function(gb) {
          cpu.abort('Unknown Opcode: 0xFC');
        }
      },
      // unknown
      0xFD: {
        cycles: 0,
        run: function(gb) {
          cpu.abort('Unknown Opcode: 0xFD');
        }
      },
      // CP n
      0xFE: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RST 38
      0xFF: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // Extended
      0xCB: {
        cycles: 4,
        run: function(gb) {
          return this.cycles;
        }
      }
    },
    // CB Extended Opcodes
    extended_instructions: {
      // RLC B
      0x00: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RLC C
      0x01: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RLC D
      0x02: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RLC E
      0x03: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RLC H
      0x04: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RLC L
      0x05: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RLC (HL)
      0x06: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RLC A
      0x07: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC B
      0x08: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC C
      0x09: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC D
      0x0A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC E
      0x0B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC H
      0x0C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC L
      0x0D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC (HL)
      0x0E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RRC A
      0x0F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL B
      0x10: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL C
      0x11: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL D
      0x12: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL E
      0x13: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL H
      0x14: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL L
      0x15: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL (HL)
      0x16: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RL A
      0x17: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR B
      0x18: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR C
      0x19: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR D
      0x1A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR E
      0x1B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR H
      0x1C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR L
      0x1D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR (HL)
      0x1E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RR A
      0x1F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA B
      0x20: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA C
      0x21: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA D
      0x22: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA E
      0x23: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA H
      0x24: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA L
      0x25: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA (HL)
      0x26: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SLA A
      0x27: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA B
      0x28: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA C
      0x29: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA D
      0x2A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA E
      0x2B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA H
      0x2C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA L
      0x2D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA (HL)
      0x2E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRA A
      0x2F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP B
      0x30: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP C
      0x31: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP D
      0x32: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP E
      0x33: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP H
      0x34: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP L
      0x35: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP (HL)
      0x36: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SWAP A
      0x37: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL B
      0x38: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL C
      0x39: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL D
      0x3A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL E
      0x3B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL H
      0x3C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL L
      0x3D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL (HL)
      0x3E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SRL A
      0x3F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 B
      0x40: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 C
      0x41: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 D
      0x42: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 E
      0x43: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 H
      0x44: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 L
      0x45: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 (HL)
      0x46: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 0 A
      0x47: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 B
      0x48: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 C
      0x49: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 D
      0x4A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 E
      0x4B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 H
      0x4C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 L
      0x4D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 (HL)
      0x4E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 1 A
      0x4F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 B
      0x50: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 C
      0x51: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 D
      0x52: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 E
      0x53: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 H
      0x54: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 L
      0x55: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 (HL)
      0x56: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 2 A
      0x57: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 B
      0x58: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 C
      0x59: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 D
      0x5A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 E
      0x5B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 H
      0x5C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 L
      0x5D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 (HL)
      0x5E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 3 A
      0x5F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 B
      0x60: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 C
      0x61: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 D
      0x62: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 E
      0x63: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 H
      0x64: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 L
      0x65: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 (HL)
      0x66: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 4 A
      0x67: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 B
      0x68: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 C
      0x69: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 D
      0x6A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 E
      0x6B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 H
      0x6C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 L
      0x6D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 (HL)
      0x6E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 5 A
      0x6F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 B
      0x70: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 C
      0x71: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 D
      0x72: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 E
      0x73: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 H
      0x74: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 L
      0x75: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 (HL)
      0x76: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 6 A
      0x77: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 B
      0x78: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 C
      0x79: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 D
      0x7A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 E
      0x7B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 H
      0x7C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 L
      0x7D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 (HL)
      0x7E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // BIT 7 A
      0x7F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 B
      0x80: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 C
      0x81: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 D
      0x82: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 E
      0x83: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 H
      0x84: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 L
      0x85: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 (HL)
      0x86: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 0 A
      0x87: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 B
      0x88: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 C
      0x89: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 D
      0x8A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 E
      0x8B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 H
      0x8C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 L
      0x8D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 (HL)
      0x8E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 1 A
      0x8F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 B
      0x90: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 C
      0x91: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 D
      0x92: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 E
      0x93: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 H
      0x94: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 L
      0x95: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 (HL)
      0x96: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 2 A
      0x97: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 B
      0x98: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 C
      0x99: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 D
      0x9A: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 E
      0x9B: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 H
      0x9C: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 L
      0x9D: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 (HL)
      0x9E: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 3 A
      0x9F: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 B
      0xA0: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 C
      0xA1: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 D
      0xA2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 E
      0xA3: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 H
      0xA4: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 L
      0xA5: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 (HL)
      0xA6: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 4 A
      0xA7: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 B
      0xA8: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 C
      0xA9: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 D
      0xAA: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 E
      0xAB: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 H
      0xAC: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 L
      0xAD: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 (HL)
      0xAE: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 5 A
      0xAF: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 B
      0xB0: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 C
      0xB1: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 D
      0xB2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 E
      0xB3: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 H
      0xB4: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 L
      0xB5: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 (HL)
      0xB6: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 6 A
      0xB7: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 B
      0xB8: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 C
      0xB9: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 D
      0xBA: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 E
      0xBB: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 H
      0xBC: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 L
      0xBD: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 (HL)
      0xBE: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // RES 7 A
      0xBF: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 B
      0xC0: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 C
      0xC1: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 D
      0xC2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 E
      0xC3: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 H
      0xC4: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 L
      0xC5: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 (HL)
      0xC6: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 0 A
      0xC7: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 B
      0xC8: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 C
      0xC9: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 D
      0xCA: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 E
      0xCB: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 H
      0xCC: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 L
      0xCD: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 (HL)
      0xCE: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 1 A
      0xCF: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 B
      0xD0: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 C
      0xD1: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 D
      0xD2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 E
      0xD3: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 H
      0xD4: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 L
      0xD5: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 (HL)
      0xD6: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 2 A
      0xD7: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 B
      0xD8: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 C
      0xD9: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 D
      0xDA: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 E
      0xDB: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 H
      0xDC: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 L
      0xDD: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 (HL)
      0xDE: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 3 A
      0xDF: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 B
      0xE0: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 C
      0xE1: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 D
      0xE2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 E
      0xE3: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 H
      0xE4: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 L
      0xE5: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 (HL)
      0xE6: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 4 A
      0xE7: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 B
      0xE8: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 C
      0xE9: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 D
      0xEA: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 E
      0xEB: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 H
      0xEC: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 L
      0xED: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 (HL)
      0xEE: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 5 A
      0xEF: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 B
      0xF0: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 C
      0xF1: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 D
      0xF2: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 E
      0xF3: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 H
      0xF4: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 L
      0xF5: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 (HL)
      0xF6: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 6 A
      0xF7: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 B
      0xF8: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 C
      0xF9: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 D
      0xFA: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 E
      0xFB: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 H
      0xFC: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 L
      0xFD: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 (HL)
      0xFE: {
        cycles: 16,
        run: function(gb) {
          return this.cycles;
        }
      },
      // SET 7 A
      0xFF: {
        cycles: 8,
        run: function(gb) {
          return this.cycles;
        }
      }
    }
  };

  // for (var i in instructions.extended) {
  //   var opcode = instructions.extended[i];
  //   console.log("it('should return "+ opcode.cycles +" cycles on opcode CB 0x"+ parseInt(i, 10).toString(16).toUpperCase() +"', function() {");
  //   console.log("assert.equal("+opcode.cycles+", instructions.extended[0x"+parseInt(i, 10).toString(16).toUpperCase()+"].run());");
  //   console.log("});");
  // }

  return cpu;
});
