import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { StylePaginatorDirective } from './style-paginator.directive';
import { GridViewComponent } from './grid_dynamic/grid-view/grid-view.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TooltipComponent } from './toolltip/tooltip/tooltip.component';
import { TooltipDirective } from './toolltip/tooltip.directive';
import { Component1Component } from './Observable/component1/component1.component';
import { Component2Component } from './Observable/component2/component2.component';
import { Component3Component } from './Observable/component3/component3.component';
import { AppDualListComponent } from './app-dual-list/app-dual-list.component';
import {
  AngularDualListBoxModule,
  DualListComponent,
} from 'angular-dual-listbox';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Import the module
import { MaterialDualListboxModule } from 'mea-material-dual-listbox';
import { CdkDualListComponent } from './cdk-dual-list/cdk-dual-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatPaginatorNavComponent } from './mat-paginator-nav/mat-paginator-nav.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatColumnFilterComponent } from './mat-column-filter/mat-column-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StylePaginatorDirective,
    GridViewComponent,
    TooltipDirective,
    TooltipComponent,
    Component1Component,
    Component2Component,
    Component3Component,
    AppDualListComponent,
    CdkDualListComponent,
    MatPaginatorNavComponent,
    MatColumnFilterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    BrowserModule,
    FormsModule,
    AngularDualListBoxModule,
    NgxSliderModule,
    DragDropModule,
    MaterialDualListboxModule,
    ScrollingModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
