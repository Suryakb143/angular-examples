"use strict";
exports.__esModule = true;
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var source$ = rxjs_1.of('Hello', 'Friend', 'Goodbye');
source$
    // emit on completion
    .pipe(operators_1.endWith('Friend'))
    // 'Hello', 'Friend', 'Goodbye', 'Friend'
    .subscribe(function (val) { return console.log(val); });
