"use strict";
exports.__esModule = true;
// RxJS v6+
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var myPromise = function (val) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve("Result: " + val); }, 2000); });
};
//emit 1,2,3
var source = rxjs_1.of(1, 2, 3);
var example = source.pipe(
//map each value to promise
operators_1.map(function (val) { return myPromise(val); }), 
//emit result from source
operators_1.mergeAll());
/*
  output:
  "Result: 1"
  "Result: 2"
  "Result: 3"
*/
var subscribe = example.subscribe(function (val) { return console.log(val); });
// const source1 = interval(500).pipe(take(5));
// /*
//   interval is emitting a value every 0.5s.  This value is then being mapped to interval that
//   is delayed for 1.0s.  The mergeAll operator takes an optional argument that determines how
//   many inner observables to subscribe to at a time.  The rest of the observables are stored
//   in a backlog waiting to be subscribe.
// */
// const example1 = source1
//   .pipe(
//     map(val => source1.pipe(delay(1000), take(3))),
//     mergeAll(2)
//   )
//   .subscribe(val => console.log(val));
// /*
//   The subscription is completed once the operator emits all values.
// */
