"use strict";
exports.__esModule = true;
// RxJS v6+
var rxjs_1 = require("rxjs");
rxjs_1.concat(rxjs_1.of(1, 2, 3), rxjs_1.of(4, 5, 6), // subscribed after first completes
rxjs_1.of(7, 8, 9) // subscribed after second completes
)
    // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
    .subscribe(console.log);
