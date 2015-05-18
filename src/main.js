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

require(['gameboy', 'cartridge', 'utils'], function(gameBoy, cartridge, utils) {
  'use strict';

  var rom = 'roms/mario_land.gb';

  utils.green('YAGBE - Yet Another Javascript GameBoy Emulator - Copyright (C) 2014 Claudemiro Alves Feitosa Neto <dimiro1@gmail.com>');

  utils.yellow('\n' +
  ' _n_________________\n' +
  '|_|_______________|_|\n' +
  '|  ,-------------.  |\n' +
  '| |  .---------.  | |\n' +
  '| |  |         |  | |\n' +
  '| |  |         |  | |\n' +
  '| |  |         |  | |\n' +
  '| |  |         |  | |\n' +
  '| |  `---------\'  | |\n' +
  '| `---------------\' |\n' +
  '|   _ GAME BOY      |\n' +
  '| _| |_         ,-. |\n' +
  '||_ O _|   ,-. "._,"|\n' +
  '|  |_|    "._,"   A |\n' +
  '|    _  _    B      |\n' +
  '|   // //           |\n' +
  '|  // //    \\\\\\\\\\\\  |\n' +
  '|  `  `      \\\\\\\\\\\\ ,\n' +
  '|________...______,"\n' +
  'ASCII art by: hjw `97'
  );


  /**
   * Success load rom callback.
   * @param {ArrayBuffer} data
   */
  var success = function(data) {
    utils.green('loading: ' + rom);

    var game = Object.create(cartridge).initialize(data);
    var YAGBE = Object.create(gameBoy).initialize('canvasId', game);

    utils.gameLoop(function() {
      YAGBE.frame();
    }, YAGBE.FPS);

    // window.setInterval(function() {
    //   YAGBE.frame();
    // }, 1000 / YAGBE.FPS);
  };

  /**
   * Error load rom callback.
   */
  var error = function() {
    utils.red('Could not load rom: "' + rom + '"');
  };

  /**
   * Load the rom from server.
   */
  utils.load(rom, success, error);
});
