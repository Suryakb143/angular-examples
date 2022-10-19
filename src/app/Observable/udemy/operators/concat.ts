// RxJS v6+
import { of, concat } from 'rxjs';

concat(
  of(1, 2, 3),
  of(4, 5, 6), // subscribed after first completes
  of(7, 8, 9) // subscribed after second completes
)
  // log: 1, 2, 3, 4, 5, 6, 7, 8, 9
  .subscribe(console.log);