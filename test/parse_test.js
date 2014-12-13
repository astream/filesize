'use strict';

var FileSize = require('..');

describe('parse', function(){
  it('should parse kb', function(){
    FileSize.parse('1kb').valueOf().should.equal(1024);
  });

  it('should parse mb', function(){
    FileSize.parse('1mb').valueOf().should.equal(1024 * 1024);
  });

  it('should parse gb', function(){
    FileSize.parse('5gb').valueOf().should.equal(5 * 1024 * 1024 * 1024);
  });

  it('should parse tb', function(){
    FileSize.parse('6tb').valueOf().should.equal(6 * 1024 * 1024 * 1024 * 1024);
  });

  it('should support floats', function(){
    FileSize.parse('1.5mb').valueOf().should.equal(1.5 * 1024 * 1024);
  });

  it('should allow whitespace', function(){
    FileSize.parse('1 mb').valueOf().should.equal(1024 * 1024);
  });
});