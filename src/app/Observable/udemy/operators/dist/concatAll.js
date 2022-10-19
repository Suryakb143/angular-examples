"use strict";
exports.__esModule = true;
// RxJS v6+
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
//create and resolve basic promise
var samplePromise = function (val) { return new Promise(function (resolve) { return resolve(val); }); };
//emit a value every 2 seconds
var source = rxjs_1.interval(2000);
var example = source.pipe(operators_1.map(function (val) { return samplePromise(val); }), 
//merge values from resolved promise
operators_1.concatAll());
//output: 'Example with Promise 0', 'Example with Promise 1'...
var subscribe = example.subscribe(function (val) {
    return console.log('Example with Promise:', val);
});
