import { AppDualListComponent } from './app-dual-list/app-dual-list.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, ComponentFactoryResolver, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DualListComponent } from 'angular-dual-listbox';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CdkDualListComponent } from './cdk-dual-list/cdk-dual-list.component';
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DynamicComponent } from './dynamic/dynamic.component';
import { Dynamic1Component } from './dynamic1/dynamic1.component';

export class MyCustomPaginatorIntl extends MatPaginatorIntl {
  showPlus: boolean = false;
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `Showing ${startIndex + 1} - ${endIndex} of ${length}`;
  };
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: new MyCustomPaginatorIntl() },
  ],
})
export class AppComponent {
  sliderValue: number = 0;

  @ViewChild('container', { static: true, read: ViewContainerRef }) entry: ViewContainerRef | undefined;
  cardNumber = "1234567890123456";
  options: Options = {
    floor: 0,
    ceil: 100,
    showTicksValues: true,
    tickStep: 10,
    tickValueStep: 10,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        default:
          return '$' + value;
      }
    },
  };
  test = '';
  defautColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  lineFiltered = false;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  source1: Array<any> = [
    { _id: 'revenue', name: 'Revenue' },
    { _id: 'cap', name: 'Cap' },
    { _id: 'branch', name: 'Branch' },
    { _id: 'state', name: 'State' },
    { _id: 'status', name: 'Status' },
  ];

  target: Array<any> = [];

  tab = 1;
  keepSorted = true;
  key!: string;
  display!: string;
  filter = true;
  source!: Array<any>;
  confirmed!: Array<any>;
  userAdd = '';
  disabled = false;
  sourceLeft = true;
  format: any = DualListComponent.DEFAULT_FORMAT;

  private sourceStations!: Array<any>;
  private confirmedStations!: Array<any>;
  private stations: Array<any> = [
    { id: 'revenue', name: 'Revenue' },
    { id: 'cap', name: 'Cap' },
    { id: 'branch', name: 'Branch' },
    { id: 'state', name: 'State' },
    { id: 'status', name: 'Status' },
  ];

  arrayType = [
    { name: 'Rio Grande', detail: '(object array)', value: 'station' },
  ];

  type = this.arrayType[0].value;

  private temp: Array<string> = this.stations[0].station;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;
  title = 'angular-idle-timeout';

  @ViewChild('childModal', { static: false }) childModal!: ModalDirective;

  date = '2021-02-09T06:06:17.000+00:00';
  date1 = '';
  headerColumnsData = new Map();

  urlModel: any;
  constructor(
    public dialog: MatDialog,
    private modalService: BsModalService,
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    private resolver: ComponentFactoryResolver
  ) {
    this.displayedColumns = this.defautColumns.slice();

    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(500000);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(150000);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.childModal.hide();
      console.log(this.idleState);
      this.router.navigate(['/']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = "You've gone idle!";
      console.log(this.idleState);
      this.childModal.show();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(10);

    keepalive.onPing.subscribe(() => {
      this.lastPing = new Date();
      //this.childModal.show();
      console.log('this', this.lastPing);
    });
    this.headerColumnsData.set('Location', 'US');
    this.headerColumnsData.set('preneve', '$180M');
    this.headerColumnsData.set('A', '$155M');
    this.headerColumnsData.set('B', '$145k');
    this.reset();
  }
  dynamicallyLodComponent() {
    if (this.entry) {

      this.entry.clear();
      const factory = this.resolver.resolveComponentFactory(DynamicComponent);
      const componentRef = this.entry.createComponent(factory);
      componentRef.instance.name = 'Hello dynamic component';
    }

  }
  dynamicallyLodComponent1() {
    if (this.entry) {
      this.entry.clear();
      const factory = this.resolver.resolveComponentFactory(Dynamic1Component);
      const componentRef = this.entry.createComponent(factory);
      componentRef.instance.name = 'Hello dynamic1 component';
    }

  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    //this.appService.setUserLoggedIn(false);
    this.router.navigate(['/']);
  }
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  ngOnInit() {
    this.doReset();
    this.dynamicallyLodComponent();
    let dateob = new Date(this.date);
    //let utcTime = '2021-02-09T06:06:17.000+00:00';
    let utcTime = '2020-07-01T22:55:26';
    var utcText = moment(utcTime).format('L LT');
    // First way
    var offset = moment().utcOffset();
    var localText = moment.utc(utcTime).utcOffset(offset).format('L LT');
    this.date1 = moment.parseZone(utcTime).local().format('L LT');
  }
  openDualList() {
    let dialogRef = this.dialog.open(AppDualListComponent, {
      width: '250px',
      data: {
        source: this.source1,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      //this.animal = result;
    });
  }
  doReset() {
    this.sourceStations = JSON.parse(JSON.stringify(this.stations));
    this.confirmedStations = new Array<any>();

    // Preconfirm some items.
    this.confirmedStations.push(this.stations[31]);

    switch (this.type) {
      case this.arrayType[0].value:
        this.useStations();
        break;
    }
  }

  private useStations() {
    this.key = 'id';
    this.display = 'name'; // [ 'station', 'state' ];
    this.keepSorted = true;
    this.source = this.stations;
    this.confirmed = this.confirmedStations;
  }

  // doCreate() {
  // 	if (typeof this.source[0] === 'object') {
  // 		const o = {id:0,name:''};
  // 		o.id = this.source.length + 1;
  // 		o.name = this.userAdd;
  // 		this.source.push( o );
  // 	} else {
  // 		this.source.push(this.userAdd);
  // 	}
  // 	this.userAdd = '';
  // }

  // doAdd() {
  // 	for (let i = 0, len = this.source.length; i < len; i += 1) {
  // 		const o = this.source[i];
  // 		const found = this.confirmed.find( (e:any) => e === o );
  // 		if (!found) {
  // 			this.confirmed.push(o);
  // 			break;
  // 		}
  // 	}
  // }

  // doRemove() {
  // 	if (this.confirmed.length > 0) {
  // 		this.confirmed.splice(0, 1);
  // 	}
  // }

  // doFilter() {
  // 	this.filter = !this.filter;
  // }

  // filterBtn() {
  // 	return (this.filter ? 'Hide Filter' : 'Show Filter');
  // }

  // doDisable() {
  // 	this.disabled = !this.disabled;
  // }

  // disableBtn() {
  // 	return (this.disabled ? 'Enable' : 'Disabled');
  // }

  // swapDirection() {
  // 	this.sourceLeft = !this.sourceLeft;
  // 	this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
  // }
  // doCreate() {
  // 	if (typeof this.source[0] === 'object') {
  // 		const o = {id:0,name:''};
  // 		o.id = this.source.length + 1;
  // 		o.name = this.userAdd;
  // 		this.source.push( o );
  // 	} else {
  // 		this.source.push(this.userAdd);
  // 	}
  // 	this.userAdd = '';
  // }
  // doAdd() {
  // 	for (let i = 0, len = this.source.length; i < len; i += 1) {
  // 		const o = this.source[i];
  // 		const found = this.confirmed.find( (e:any) => e === o );
  // 		if (!found) {
  // 			this.confirmed.push(o);
  // 			break;
  // 		}
  // 	}
  // }
  // doRemove() {
  // 	if (this.confirmed.length > 0) {
  // 		this.confirmed.splice(0, 1);
  // 	}
  // }
  // doFilter() {
  // 	this.filter = !this.filter;
  // }
  // filterBtn() {
  // 	return (this.filter ? 'Hide Filter' : 'Show Filter');
  // }
  // doDisable() {
  // 	this.disabled = !this.disabled;
  // }
  // disableBtn() {
  // 	return (this.disabled ? 'Enable' : 'Disabled');
  // }
  // swapDirection() {
  // 	this.sourceLeft = !this.sourceLeft;
  // 	this.format.direction = this.sourceLeft ? DualListComponent.LTR : DualListComponent.RTL;
  // }
  modalRef!: BsModalRef;
  cdkdialog(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      CdkDualListComponent,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    // let dialogRef = this.dialog.open(CdkDualListComponent, {
    //   data: {
    //     source: this.source1,
    //   },
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   //this.animal = result;
    // });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnChanges(changes: SimpleChange) { }
  onPageNavigate(e: any) {
    console.log(e);
    let previouseItemPerPage = 0;
    if (
      sessionStorage.getItem('previousIndex') &&
      Number(sessionStorage.getItem('previousIndex')) === e.pageSize
    ) {
      previouseItemPerPage = Number(sessionStorage.getItem('previousIndex'));
    } else {
      sessionStorage.setItem('previousIndex', e.pageSize);
    }

    console.log(this.paginator);
    if (previouseItemPerPage !== e.pageSize) {
      // this.paginator.pageIndex = 0;
      //this.paginator.pageSize = e.pageSize;
      this.paginator.firstPage();
      this.updateTable();
    }
    // this.updateTable();
  }
  updateTable() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator.pageIndex = 0;
    }, 100);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }
  updateTableColumns() {
    this.displayedColumns = this.defautColumns.slice();
    // if(this.target.length!==0){
    //   this.target.forEach((value,index) =>{
    //       this.displayedColumns.push(value._id);
    //   });
    // }
    if (this.confirmed.length !== 0) {
      this.confirmed.forEach((value, index) => {
        this.displayedColumns.push(value.id);
      });
    }
  }
  showFilers() { }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  state: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', state: 'AP' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', state: 'UP' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', state: 'MP' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', state: 'AP' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', state: 'AP' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', state: 'AP' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', state: 'AP' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', state: 'AP' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', state: 'AP' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', state: 'AP' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', state: 'AP' },
  {
    position: 12,
    name: 'Magnesium',
    weight: 24.305,
    symbol: 'Mg',
    state: 'AP',
  },
  {
    position: 13,
    name: 'Aluminum',
    weight: 26.9815,
    symbol: 'Al',
    state: 'AP',
  },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', state: 'AP' },
  {
    position: 15,
    name: 'Phosphorus',
    weight: 30.9738,
    symbol: 'P',
    state: 'AP',
  },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', state: 'AP' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', state: 'AP' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', state: 'AP' },
  {
    position: 19,
    name: 'Potassium',
    weight: 39.0983,
    symbol: 'K',
    state: 'AP',
  },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', state: 'AP' },
];
