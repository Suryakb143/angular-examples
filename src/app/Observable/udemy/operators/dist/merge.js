"use strict";
exports.__esModule = true;
// RxJS v6+
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
//emit every 2.5 seconds
var first = rxjs_1.interval(2500);
//emit every 2 seconds
var second = rxjs_1.interval(2000);
//emit every 1.5 seconds
var third = rxjs_1.interval(1500);
//emit every 1 second
var fourth = rxjs_1.interval(1000);
//emit outputs from one observable
var example = rxjs_1.merge(first.pipe(operators_1.mapTo('FIRST!')), second.pipe(operators_1.mapTo('SECOND!')), third.pipe(operators_1.mapTo('THIRD')), fourth.pipe(operators_1.mapTo('FOURTH')));
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
var subscribe = example.subscribe(function (val) { return console.log(val); });
// //emit every 2.5 seconds
// const first1 = interval(2500);
// //emit every 1 second
// const second1 = interval(1000);
// //used as instance method
// const example1 = first1.pipe(merge(second1)); //deprecreated
// //output: 0,1,0,2....
// const subscribe1 = example1.subscribe(val => console.log(val));
