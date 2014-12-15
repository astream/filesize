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

var FileSize = require('..');
var Decimal = require('decimal.js');

describe('FileSize', function(){
    it('is defined', function(){
      FileSize.should.be.a('function');
    });

    it('is is idempotent', function(){
      var f = new FileSize(100);
      var f2 = new FileSize(f);
      f.should.be.equal(f2);
    });

    it('return 0 b without arguments', function(){
      var f = new FileSize();
      f.toString().should.be.equal('0 b');
    });

    it('reuse Decimal values', function(){
      var v = new Decimal(100);
      var f = new FileSize(v);
      f.value.should.be.equal(v);
    });

    it('could be added to numbers', function(){
      var v = FileSize.parse('1001 b');
      (v+1).should.be.equal(1002);
    });

    it('could be campared to numbers', function(){
      var v = FileSize.parse('1001 kb');
      (v>1).should.be.equal(true);
    });

    it('divide by a factor', function(){
      var v = FileSize.parse('1002 kb').div(2);
      (v.toString()).should.be.equal('501 kb');
    });

    it('multiply by a factor', function(){
      var v = FileSize.parse('501 kb').times(2);
      (v.toString()).should.be.equal('1002 kb');
    });


});
