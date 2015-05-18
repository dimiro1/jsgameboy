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

define(['cpu', 'memory'], function(cpu, memory) {
  'use strict';

  /**
   * The gameBoy Hardware.
   * 
   * Implements the external Interface.
   */
  var gameBoy = {
    /**
     * GameBoy runs 60 frames per second.
     */
    FPS: 60,
    /**
     * The main memory.
     *
     * @type {memory}
     * @public
     */
    memory: null,

    /**
     * The CPU 8080 - Z80 Like.
     *
     * @type {cpu}
     * @public
     */
    cpu: null,
    /**
     * Power On the Emulator
     *
     * @param {string} canvasId - The canvas element Id
     * @param {cartridge} cartridge - The cartridge to play
     * @public
     */
    initialize: function(canvasId, cartridge) {
      this.memory = Object.create(memory)
        .initialize(cartridge);

      this.cpu = Object.create(cpu).initialize();

      return this;
    },

    /**
     * Emulate a frame.
     * @public
     */
    frame: function() {
      var cycles = 0;

      // while (this.cpu.canExecute()) {
      //   cycles = this.cpu.step(this);
      //   // update Graphics
      // }
    }
  };

  return gameBoy;
});
