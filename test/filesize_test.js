/*
 * filesize
 * https://github.com/astream/filesize
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var FileSize = require('../lib/filesize.js');

describe('FileSize', function(){
    it('is defined', function(){
      FileSize.should.be.a('function');
    });

});
