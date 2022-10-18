import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UdemyObservable1 } from './observable1';
import { UdemyComponent } from './udemy.component';

const routes: Routes = [
  {
    path: 'observable1', component: UdemyComponent,
    children: [
      { path: '1', component: UdemyObservable1 }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UdemyRoutingModule { }
