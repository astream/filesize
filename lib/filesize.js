/*
 * filesize
 * https://github.com/astream/filesize
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = FileSize;
var Intl = require('intl');
var Decimal = require('decimal.js');

function FileSize(value) {
    if (value instanceof FileSize) {
        return value;
    }

    if (! (this instanceof FileSize)) {
        return new FileSize(value);
    }

    if (! (value instanceof Decimal)) {
        value = new Decimal(value || 0);
    }



    this.value = value;
    var repr = convertObj(value);
    this.amount = repr.amount;
    this.unit = repr.unit;
    Object.freeze(this);
}

var proto = FileSize.prototype = {};

proto.plus = function(size){
    size = new FileSize(size);
    return new FileSize(this.value.plus(size.value));
};

proto.minus = function(size){
    size = new FileSize(size);
    return new FileSize(this.value.minus(size.value));
};

['plus','minus'].forEach(function(name){
    proto[name] = function(size){
        size = new FileSize(size);
        return new FileSize(this.value[name](size.value));
    };
});

['times','div'].forEach(function(name){
    proto[name] = function(factor){
        return new FileSize(this.value[name](Number(factor)));
    };
});
/*,'times','div','mod'].forEach(function(name){
    proto[name] = function() {

    };
});
*/
proto.valueOf = proto.toJSON = function() {
    return this.value.toNumber();
};


proto.toString = function() {
    var str = this.amount.toString() + ' ' +this.unit;
    return str;
};


proto.toLocaleString = function(locales, options) {

    var str = this.amount.toLocaleString(locales, options) + ' ' +this.unit;
    return str;
};

/**
 * Parse byte `size` string.
 *
 * @param {String} size
 * @return {Number}
 * @api public
 */

FileSize.parse = function parse(size) {
    var parts = size.match(/^(\d+(?:\.\d+)?) *(kb|mb|gb|tb|b)$/),
        n = parseFloat(parts[1]),
        type = parts[2];

    var map = {
        b: 1,
        kb: 1 << 10,
        mb: 1 << 20,
        gb: 1 << 30,
        tb: ((1 << 30) * 1024)
    };

    return new FileSize(map[type] * n);
};

module.exports.convertObj = convertObj;

/**
 * convert bytes into a FileSize object.
 *
 * @param {Number} b - bytes to convert
 * @return {amount:Number,unit:String} amount and unit object
 * @api public
 */
function convertObj(b) {

    var tb = ((1 << 30) * 1024),
        gb = 1 << 30,
        mb = 1 << 20,
        kb = 1 << 10,
        abs = Math.abs(b);

    if (abs >= tb) return {
        amount: (Math.round(b / tb * 100) / 100),
        unit: 'tb'
    };

    if (abs >= gb) return {
        amount: (Math.round(b / gb * 100) / 100),
        unit: 'gb'
    };

    if (abs >= mb) return {
        amount: (Math.round(b / mb * 100) / 100),
        unit: 'mb'
    };

    if (abs >= kb) return {
        amount: (Math.round(b / kb * 100) / 100),
        unit: 'kb'
    };

    return {
        amount: b,
        unit: 'b'
    };
}

