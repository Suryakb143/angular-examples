import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { MomentModule } from 'angular2-moment';
import { MaterialDualListboxModule } from 'mea-material-dual-listbox';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { NgMaterialModule } from 'src/app/ng-material.module';
import { UdemyObservable1 } from './observable1';
import { UdemyRoutingModule } from './udemy-routing.module';
import { UdemyComponent } from './udemy.component';


@NgModule({
  declarations: [
        UdemyComponent
  ],
  imports: [
    CommonModule ,
    UdemyRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UdemyModule {}
