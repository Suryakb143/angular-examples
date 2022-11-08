"use strict";
exports.__esModule = true;
// RxJS v6+
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
//emit value every 1s
var source = rxjs_1.interval(1000);
var example = source.pipe(operators_1.mergeMap(function (val) {
    //throw error for demonstration
    if (val > 5) {
        return rxjs_1.throwError('Error!');
    }
    return rxjs_1.of(val);
}), 
//retry 2 times on error
operators_1.retry(2));
/*
  output:
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  0..1..2..3..4..5..
  "Error!: Retried 2 times then quit!"
*/
var subscribe = example.subscribe({
    next: function (val) { return console.log(val); },
    error: function (val) { return console.log(val + ": Retried 2 times then quit!"); }
});
