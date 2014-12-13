'use strict';

var FileSize = require('..');
var tb = (1 << 30) * 1024;
var gb = 1 << 30;
var mb = 1 << 20;
var kb = 1 << 10;

describe('toLocaleString', function () {
  
  it('use all unit string', function () {
    new FileSize(kb).toLocaleString('it').should.deep.equal('1 kb');
    new FileSize(-kb).toLocaleString('it').should.deep.equal('-1 kb');
    new FileSize(2 * kb).toLocaleString('it').should.deep.equal('2 kb');
  });

  

  it('should support floats', function () {
    new FileSize(1.2 * mb).toLocaleString('it').should.deep.equal('1,2 mb');
    new FileSize(-1.2 * mb).toLocaleString('it').should.deep.equal('-1,2 mb');
    new FileSize(1.2 * kb).toLocaleString('it').should.deep.equal('1,2 kb');
  });

  it('use thousand group', function () {
    new FileSize(1000.2 * mb).toLocaleString('it').should.deep.equal('1.000,2 mb');
    new FileSize(-1000.2 * mb).toLocaleString('it').should.deep.equal('-1.000,2 mb');
    new FileSize(1000.2 * kb).toLocaleString('it').should.deep.equal('1.000,2 kb');
  });
});
