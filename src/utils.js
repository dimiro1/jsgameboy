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

define('utils', [], function() {
  'use strict';

  var exports = {};

  /**
   * Load a Rom from server.
   *
   * @public
   * @param {string} fileUrl - Complete fileUrl
   * @Param {function} success - The function callback that handle the response.
   * @param {function|null} error - Error Callback
   */
  exports.load = function(fileUrl, success, error) {
    var request = new XMLHttpRequest();
    request.open('GET', fileUrl, true);
    request.responseType = 'arraybuffer';
    request.send();

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          if (typeof success == 'function') {
            success(request.response);
          }
        } else if (typeof error == 'function') {
          error(request.response);
        }
      }
    };
  };

  /**
   * https://gist.github.com/addyosmani/5434533
   */
  exports.gameLoop = function(fn, fps) {
    var then = Date.now();

    fps = fps || 60;
    var interval = 1000 / fps;

    return (function loop(time) {
      requestAnimationFrame(loop);

      var now = Date.now();
      var delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        fn(time);
      }
    }(0));
  };

  /**
   * Print a message in green.
   * @param {string} message
   */
  exports.green = function(message) {
    console.log('%c' + message, 'background: #9bbc0f; color: #14171A;');
  };

  /**
   * Print a message in yellow.
   * @param {string} message
   */
  exports.yellow = function(message) {
    console.log('%c' + message, 'background: #D99B28; color: #14171A;');
  };

  /**
   * Print a message in red.
   * @param {string} message
   */
  exports.red = function(message) {
    console.log('%c' + message, 'background: #BC2024; color: #FFFFFF;');
  };

  return exports;
});
