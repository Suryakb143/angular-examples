"use strict";
exports.__esModule = true;
// RxJS v6+
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
//emit value every 1s
var source = rxjs_1.interval(1000);
var example = source.pipe(operators_1.map(function (val) {
    if (val > 5) {
        //error will be picked up by retryWhen
        throw val;
    }
    return val;
}), operators_1.retryWhen(function (errors) {
    return errors.pipe(
    //log error message
    operators_1.tap(function (val) { return console.log("Value " + val + " was too high!"); }), 
    //restart in 6 seconds
    operators_1.delayWhen(function (val) { return rxjs_1.timer(val * 1000); }));
}));
/*
  output:
  0
  1
  2
  3
  4
  5
  "Value 6 was too high!"
  --Wait 6 seconds then repeat
*/
var subscribe = example.subscribe(function (val) { return console.log(val); });
