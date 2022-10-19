"use strict";
exports.__esModule = true;
// RxJS v6+
var rxjs_1 = require("rxjs");
// timerOne emits first value at 1s, then once every 4s
var timerOne$ = rxjs_1.timer(1000, 4000);
// timerTwo emits first value at 2s, then once every 4s
var timerTwo$ = rxjs_1.timer(2000, 4000);
// timerThree emits first value at 3s, then once every 4s
var timerThree$ = rxjs_1.timer(3000, 4000);
// when one timer emits, emit the latest values from each timer as an array
rxjs_1.combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(function (_a) {
    var timerValOne = _a[0], timerValTwo = _a[1], timerValThree = _a[2];
    /*
      Example:
    timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
    timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
    timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
  */
    console.log("Timer One Latest: " + timerValOne + ",\n     Timer Two Latest: " + timerValTwo + ",\n     Timer Three Latest: " + timerValThree);
});
