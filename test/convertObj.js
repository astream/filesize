'use strict';

var convertObj = require('..').convertObj;
var tb = (1 << 30) * 1024;
var gb = 1 << 30;
var mb = 1 << 20;
var kb = 1 << 10;

describe('convertObj(number)', function () {
  it('should convert numbers < 1024 to `bytes` string', function () {
    convertObj(200).should.deep.equal({amount:200, unit:'b'});
    convertObj(-200).should.deep.equal({amount:-200, unit:'b'});
  });

  it('should convert numbers >= 1024 to kb string', function () {
    convertObj(kb).should.deep.equal({amount:1, unit:'kb'});
    convertObj(-kb).should.deep.equal({amount:-1, unit:'kb'});
    convertObj(2 * kb).should.deep.equal({amount:2, unit:'kb'});
  });

  it('should convert numbers >= 1048576 to mb string', function () {
    convertObj(mb).should.deep.equal({amount:1, unit:'mb'});
    convertObj(-mb).should.deep.equal({amount:-1, unit:'mb'});
    convertObj(2 * mb).should.deep.equal({amount:2, unit:'mb'});
  });

  it('should convert numbers >= (1 << 30) to gb string', function () {
    convertObj(gb).should.deep.equal({amount:1, unit:'gb'});
    convertObj(-gb).should.deep.equal({amount:-1, unit:'gb'});
    convertObj(2 * gb).should.deep.equal({amount:2, unit:'gb'});
  });

  it('should convert numbers >= ((1 << 30) * 1024) to tb string', function () {
    convertObj(tb).should.deep.equal({amount:1, unit:'tb'});
    convertObj(-tb).should.deep.equal({amount:-1, unit:'tb'});
    convertObj(2 * tb).should.deep.equal({amount:2, unit:'tb'});
  });

  it('should support floats', function () {
    convertObj(1.2 * mb).should.deep.equal({amount:1.2, unit:'mb'});
    convertObj(-1.2 * mb).should.deep.equal({amount:-1.2, unit:'mb'});
    convertObj(1.2 * kb).should.deep.equal({amount:1.2, unit:'kb'});
  });
});
