import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataSharingService } from "src/app/shared/dataService.service";

@Component({
  selector: 'udemy-observable1',
  template: '<div>  {{observable$}}</div>',
})
export class UdemyObservable1 implements OnInit {

  observable$ = new Observable<string>(subscribe => {
    console.log('observable executed');
    subscribe.next('Test1');
    subscribe.next('Test2');
  });
  observable1$ = new Observable<string>(subscribe => {
   
    subscribe.next('Test3');
    setTimeout(() => {
      subscribe.next('Test4');
    }, 2000);
    setTimeout(() => {
      subscribe.next('Test45');
    }, 4000);
  });
  observe = {
    next: (val: string) => console.log(val)
  }

  constructor() {

  }
  ngOnInit(): void {
    this.observable$.subscribe(this.observe);
    this.observable$.subscribe(val => console.log('single::' + val));
   
    const obser1 = this.observable1$.subscribe(val => console.log('single::' + val));
    setTimeout(() => {
      console.log('subscribe 1 executed');
      obser1.unsubscribe();
    }, 3000);

    setTimeout(() => {
      console.log('subscribe 2 executed');
      this.observable$.subscribe({
        next: val => { console.log('single::' + val) },
        error: val => { console.log('single::' + val) },
      });
    }, 3000);
  }


}

