"use strict";
exports.__esModule = true;
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
// emit every 1s, take 2
var source$ = rxjs_1.interval(1000).pipe(operators_1.take(2));
// map each emitted value from source to interval observable that takes 5 values
var example$ = source$.pipe(operators_1.map(function (val) { return rxjs_1.interval(1000).pipe(operators_1.map(function (i) { return "Result (" + val + "): " + i; }), operators_1.take(5)); }));
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/
example$.pipe(operators_1.combineAll())
    /*
      output:
      ["Result (0): 0", "Result (1): 0"]
      ["Result (0): 1", "Result (1): 0"]
      ["Result (0): 1", "Result (1): 1"]
      ["Result (0): 2", "Result (1): 1"]
      ["Result (0): 2", "Result (1): 2"]
      ["Result (0): 3", "Result (1): 2"]
      ["Result (0): 3", "Result (1): 3"]
      ["Result (0): 4", "Result (1): 3"]
      ["Result (0): 4", "Result (1): 4"]
    */
    .subscribe(console.log);
