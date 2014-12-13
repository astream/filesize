'use strict';

var FileSize = require('..');
var tb = (1 << 30) * 1024;
var gb = 1 << 30;
var mb = 1 << 20;
var kb = 1 << 10;

describe('toString', function () {
  it('should convert numbers < 1024 to `bytes` string', function () {
    new FileSize(200).toString().should.deep.equal('200 b');
    new FileSize(-200).toString().should.deep.equal('-200 b');
  });

  it('should convert numbers >= 1024 to kb string', function () {
    new FileSize(kb).toString().should.deep.equal('1 kb');
    new FileSize(-kb).toString().should.deep.equal('-1 kb');
    new FileSize(2 * kb).toString().should.deep.equal('2 kb');
  });

  it('should convert numbers >= 1048576 to mb string', function () {
    new FileSize(mb).toString().should.deep.equal('1 mb');
    new FileSize(-mb).toString().should.deep.equal('-1 mb');
    new FileSize(2 * mb).toString().should.deep.equal('2 mb');
  });

  it('should convert numbers >= (1 << 30) to gb string', function () {
    new FileSize(gb).toString().should.deep.equal('1 gb');
    new FileSize(-gb).toString().should.deep.equal('-1 gb');
    new FileSize(2 * gb).toString().should.deep.equal('2 gb');
  });

  it('should convert numbers >= ((1 << 30) * 1024) to tb string', function () {
    new FileSize(tb).toString().should.deep.equal('1 tb');
    new FileSize(-tb).toString().should.deep.equal('-1 tb');
    new FileSize(2 * tb).toString().should.deep.equal('2 tb');
  });

  it('should support floats', function () {
    new FileSize(1.2 * mb).toString().should.deep.equal('1.2 mb');
    new FileSize(-1.2 * mb).toString().should.deep.equal('-1.2 mb');
    new FileSize(1.2 * kb).toString().should.deep.equal('1.2 kb');
  });
});
