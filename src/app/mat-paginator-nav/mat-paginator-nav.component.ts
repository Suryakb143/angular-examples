import { SelectionModel } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

type Position = 'start' | 'mid' | 'end';
@Component({
  selector: 'app-mat-paginator-nav',
  templateUrl: './mat-paginator-nav.component.html',
  styleUrls: ['./mat-paginator-nav.component.scss'],
})
export class MatPaginatorNavComponent implements OnInit {
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
  defautColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  lineFiltered = false;
  @ViewChild(MatSort)
  sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  obs!: Observable<any>;
  disblaRightclick = false;
  disblaLeftclick = false;

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;
  obs1!: Observable<any>;
  disableRightBtn = false;
  disableLeftBtn = true;

  @ViewChild(CdkVirtualScrollViewport)
  viewPort!: CdkVirtualScrollViewport;
  currentIndexEle = 0;

  @ViewChildren('element', { read: ElementRef })
  elements!: QueryList<ElementRef>;

  @ViewChildren('element', { read: ElementRef })
  elementList!: QueryList<ElementRef>;

  selected!: number;

  public arr = [
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m',
  ];
  dataSource1 = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.displayedColumns = this.defautColumns.slice();
  }
  select(selected: number): void {
    this.selected = selected;
    this.elements.forEach((element, i) => {
      if (selected - 1 === i) {
        element.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    });
  }
  scrollLeft2() {
    this.currentIndexEle--;
    this.elements.forEach((element, i) => {
      if (this.currentIndexEle - 1 === i) {
        element.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    });
  }
  scrollRight2() {
    this.currentIndexEle++;
    this.elements.forEach((element, i) => {
      if (this.currentIndexEle - 1 === i) {
        element.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
        return;
      }
    });
    // let counter = 0;
    // for (let child of this.elements) {
    //   if (this.currentIndexEle + 1 === counter) {
    //     child.nativeElement.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'nearest',
    //       inline: 'start',
    //     });
    //     this.currentIndexEle++;
    //     return;
    //   }
    //   counter++;
    // }
  }
  scroll(position: Position) {
    let scrollIndex: number;
    switch (position) {
      case 'start':
        scrollIndex = 0;
        break;
      case 'mid':
        scrollIndex = this.items.length / 2;
        break;
      case 'end':
        scrollIndex = this.items.length;
        break;
    }
  }
  scrollRight(): void {
    console.log(this.widgetsContent);
    console.log(
      this.widgetsContent.nativeElement.scrollWidth -
        this.widgetsContent.nativeElement.scrollLeft
    );
    if (
      this.widgetsContent.nativeElement.scrollWidth -
        this.widgetsContent.nativeElement.scrollLeft >=
      this.widgetsContent.nativeElement.offsetWidth
    ) {
      this.currentIndexEle++;
      let counter = 0;
      let scrollLeft = 0;
      let totalScrollLeft = 0;
      for (let child of this.widgetsContent.nativeElement.children) {
        if (counter <= this.currentIndexEle) {
          //console.log(counter, child.offsetWidth);
          scrollLeft = scrollLeft + child.offsetWidth;
        }
        totalScrollLeft = totalScrollLeft + child.offsetWidth;
        counter++;
      }
      // console.log('totalScrollLeft', totalScrollLeft);
      this.disableLeftBtn = false;
      this.widgetsContent.nativeElement.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    } else {
      this.disableRightBtn = true;
    }

    // setTimeout(() => {
    //   //  this.viewPort.checkViewportSize();
    //   const currentRange = this.viewPort.getRenderedRange();

    //   this.viewPort.setRenderedRange({
    //     start: currentRange.start + 1,
    //     end: currentRange.end,
    //   });
    // });
    //this.viewPort.scrollToIndex(this.currentIndexEle, 'smooth');
    // console.log(this.widgetsContent.nativeElement.children);
  }
  checkInView(elem: any, partial: any) {
    var container = this.widgetsContent.nativeElement;
    var contHeight = container.offsetWidth;
    var contTop = container.scrollLeft;
    var contBottom = contTop + contHeight;

    var elemTop = elem.offsetLeft - container.offsetLeft;
    var elemBottom = elemTop + elem.offsetWidth;

    var isTotal = elemTop >= 0 && elemBottom <= contHeight;
    var isPart =
      ((elemTop < 0 && elemBottom > 0) ||
        (elemTop > 0 && elemTop <= container.offsetWidth)) &&
      partial;

    return isTotal || isPart;
  }

  scrollLeft(): void {
    console.log(this.widgetsContent);
    this.disableRightBtn = false;
    if (this.currentIndexEle === 0) {
      this.disableLeftBtn = true;
    }
    this.currentIndexEle--;
    let counter = 0;
    let scrollLeft = 0;
    for (let child of this.widgetsContent.nativeElement.children) {
      if (counter <= this.currentIndexEle) {
        scrollLeft = scrollLeft + child.offsetWidth;
      }
      counter++;
    }
    this.widgetsContent.nativeElement.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
    // return;
    // // console.log(this.widgetsContent.nativeElement);
    // if (this.widgetsContent.nativeElement.scrollLeft - 600 === 0) {
    //   this.disableLeftBtn = true;
    // }
    // this.disableRightBtn = false;
    // this.widgetsContent.nativeElement.scrollTo({
    //   left: this.widgetsContent.nativeElement.scrollLeft - scrollLeft,
    //   behavior: 'smooth',
    // });
  }
  onAddClick1(): void {
    const obj: PeriodicElement = {
      position: 1,
      name:
        Math.random() +
        ' but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
      weight: 1.0079,
      symbol: 'H',
      state: 'AP',
      visiable: true,
    };
    this.dataSource.data.push(obj);
    console.log(this.widgetsContent);
    console.log(this.widgetsContent.nativeElement);
    setTimeout(() => {
      this.disableRightBtn = true;
      this.disableLeftBtn = false;
      // this.currentIndexEle = this.widgetsContent.nativeElement.children.length;
      console.log(this.widgetsContent);
      console.log(this.widgetsContent.nativeElement.offsetWidth);
      console.log(this.widgetsContent.nativeElement.scrollWidth);
      let scrollLeft = 0;
      let counter = 0;
      for (let child of this.widgetsContent.nativeElement.children) {
        //console.log(counter, child.offsetWidth);
        if (
          this.widgetsContent.nativeElement.scrollWidth -
            this.widgetsContent.nativeElement.offsetWidth >=
          scrollLeft
        ) {
          this.currentIndexEle = counter;
        }
        scrollLeft = scrollLeft + child.offsetWidth;
        counter++;
      }
      console.log('scrollLeft', scrollLeft);
      this.widgetsContent.nativeElement.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
      if (scrollLeft <= this.widgetsContent.nativeElement.offsetWidth) {
        this.disableLeftBtn = true;
      } else {
        this.disableLeftBtn = false;
      }
    });
  }
  onGrantClick(log: number): void {
    console.log('click: ', log);
  }
  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.obs = this.dataSource.connect();
    this.obs1 = this.dataSource1.connect();
  }
  onRightClickDiv() {
    this.disblaLeftclick = true;
    let lastVisiableIndex =
      this.dataSource.data
        .map((fruit) => fruit.visiable === true)
        .lastIndexOf(true) + 1;
    console.log('ind', lastVisiableIndex);
    if (lastVisiableIndex !== this.dataSource.data.length) {
      let count = 0;
      for (let i = lastVisiableIndex; i <= lastVisiableIndex + 5; i++) {
        if (this.dataSource.data[i]) {
          let value = this.dataSource.data[i].name;
          if (value.toString().length > 100) {
            count++;
          }
        } else {
          this.disblaRightclick = false;
        }
      }
      if (count >= 2) {
        this.dataSource.data.forEach(function (value, index) {
          if (index < lastVisiableIndex || index >= lastVisiableIndex + 2) {
            value.visiable = false;
          } else {
            value.visiable = true;
          }
        });
      }
      if (count === 1) {
        this.dataSource.data.forEach(function (value, index) {
          if (index < lastVisiableIndex || index > lastVisiableIndex + 3) {
            value.visiable = false;
          } else {
            value.visiable = true;
          }
        });
      }
      if (count === 0) {
        this.dataSource.data.forEach((value, index) => {
          if (index < lastVisiableIndex || index > lastVisiableIndex + 4) {
            value.visiable = false;
          } else {
            value.visiable = true;
          }
        });
      }
    }

    console.log('lastVisiableIndex', lastVisiableIndex);
  }
  onAddClick() {
    const obj: PeriodicElement = {
      position: 1,
      name:
        Math.random() +
        ' but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
      weight: 1.0079,
      symbol: 'H',
      state: 'AP',
      visiable: true,
    };
    this.dataSource.data.push(obj);
    let lastVisiableIndex = this.dataSource.data.length;
    let count = 0;
    this.dataSource.data.forEach((value, index) => {
      if (lastVisiableIndex <= 5) {
        if (value.name.toString().length > 100) {
          count++;
        }
      } else {
        if (index > lastVisiableIndex - 5 && index < lastVisiableIndex) {
          if (value.name.toString().length > 100) {
            count++;
          }
        }
      }
    });

    console.log('count', count);

    if (count >= 2) {
      this.dataSource.data.forEach(function (value, index) {
        if (index < lastVisiableIndex && index >= lastVisiableIndex - 2) {
          value.visiable = true;
        } else {
          value.visiable = false;
        }
      });
    }
    if (count === 1) {
      this.dataSource.data.forEach(function (value, index) {
        if (index >= lastVisiableIndex - 4 && index < lastVisiableIndex) {
          value.visiable = true;
        } else {
          value.visiable = false;
        }
      });
    }
    if (count === 0) {
      this.dataSource.data.forEach((value, index) => {
        if (index < lastVisiableIndex && index >= lastVisiableIndex - 5) {
          value.visiable = true;
        } else {
          value.visiable = false;
        }
      });
    }
    if (this.dataSource.data[0].visiable) {
      this.disblaLeftclick = false;
    }
  }
  onleftClickDiv() {
    this.disblaRightclick = true;
    let lastVisiableIndex = this.dataSource.data.findIndex(
      (x) => x.visiable === true
    );
    console.log('lastVisiableIndex', lastVisiableIndex);
    let count = 0;
    this.dataSource.data.forEach((value, index) => {
      if (lastVisiableIndex <= 5) {
        if (value.name.toString().length > 100) {
          count++;
        }
      } else {
        if (index > lastVisiableIndex - 5 && index < lastVisiableIndex) {
          if (value.name.toString().length > 100) {
            count++;
          }
        }
      }
    });

    console.log('count', count);

    if (count >= 2) {
      this.dataSource.data.forEach(function (value, index) {
        if (index < lastVisiableIndex && index >= lastVisiableIndex - 2) {
          value.visiable = true;
        } else {
          value.visiable = false;
        }
      });
    }
    if (count === 1) {
      this.dataSource.data.forEach(function (value, index) {
        if (index >= lastVisiableIndex - 4 && index < lastVisiableIndex) {
          value.visiable = true;
        } else {
          value.visiable = false;
        }
      });
    }
    if (count === 0) {
      this.dataSource.data.forEach((value, index) => {
        if (index < lastVisiableIndex && index >= lastVisiableIndex - 5) {
          value.visiable = true;
        } else {
          value.visiable = false;
        }
      });
    }
    if (this.dataSource.data[0].visiable) {
      this.disblaLeftclick = false;
    }
  }
  disableArrows() {
    setTimeout(() => {
      let widgetWidth = 0;
      for (let child of this.widgetsContent.nativeElement.children) {
        widgetWidth = widgetWidth + child.offsetWidth;
      }
      if (widgetWidth <= this.widgetsContent.nativeElement.offsetWidth) {
        this.disableLeftBtn = true;
        this.disableRightBtn = true;
      } else {
        this.disableLeftBtn = false;
        this.disableRightBtn = false;
      }
    });
  }
  ngAfterViewInit() {
    this.disableArrows();
    // setTimeout(() => {
    //   if (this.dataSource.data.length > 5) {
    //     let count = 0;
    //     for (let i = 0; i <= 5; i++) {
    //       let value = this.dataSource.data[i].name;
    //       if (value.toString().length > 100) {
    //         count++;
    //       }
    //     }
    //     if (count >= 2) {
    //       this.paginator.pageSize = 2;
    //       this.updateTable();
    //     }
    //     if (count === 1) {
    //       this.paginator.pageSize = 4;
    //       this.updateTable();
    //     }
    //   }
    // });
  }
  // ngAfterViewChecked() {
  //   console.log('! changement de la date du composant !');

  //   this.changeDetectorRef.detectChanges();
  // }
  onPageNavigate(e: any) {
    console.log(e);
    console.log('next', e.pageSize * e.pageIndex + 1);
    console.log('prev', e.previousPageIndex);
    let prev = e.previousPageIndex;
    let nextelement = e.pageSize * e.pageIndex + 1;

    let count = 0;
    for (let i = nextelement - 1; i <= nextelement + 5; i++) {
      let value = this.dataSource.data[i].name;
      if (value.toString().length > 100) {
        count++;
      }
    }

    if (count >= 2) {
      this.paginator.pageSize = 2;
      if (e.previousPageIndex != 0) {
        console.log(Math.floor(nextelement / e.pageSize));
        this.paginator.pageIndex = Math.floor(nextelement / e.pageSize);
      } else {
        this.paginator.pageIndex = 1;
      }
    } else if (count === 1) {
      this.paginator.pageSize = 4;
      if (e.previousPageIndex != 0) {
        this.paginator.pageIndex = Math.floor(nextelement / e.pageSize) + 1;
      } else {
        this.paginator.pageIndex = 1;
      }
    } else {
      this.paginator.pageSize = 5;
      console.log('5', Math.floor(nextelement / e.pageSize) + 1);
      this.paginator.pageIndex = Math.floor(nextelement / e.pageSize) + 1;
    }
    this.updateTable();
    // this.paginator.pageSize = 2;
    // let previouseItemPerPage = 0;
    // if (
    //   sessionStorage.getItem('previousIndex') &&
    //   Number(sessionStorage.getItem('previousIndex')) === e.pageSize
    // ) {
    //   previouseItemPerPage = Number(sessionStorage.getItem('previousIndex'));
    // } else {
    //   sessionStorage.setItem('previousIndex', e.pageSize);
    // }

    // console.log(this.paginator);
    // if (previouseItemPerPage !== e.pageSize) {
    //   // this.paginator.pageIndex = 0;
    //   //this.paginator.pageSize = e.pageSize;
    //   this.paginator.firstPage();
    //   this.updateTable();
    // }
    // this.updateTable();
  }
  updateTable() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 100);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  state: string;
  visiable: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  // {
  //   position: 1,
  //   name: '1 but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
  //   weight: 1.0079,
  //   symbol: 'H',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 2,
  //   name: '2 but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
  //   weight: 4.0026,
  //   symbol: 'He',
  //   state: 'UP',
  //   visiable: true,
  // },
  // {
  //   position: 3,
  //   name: '3 but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
  //   weight: 6.941,
  //   symbol: 'Li',
  //   state: 'MP',
  //   visiable: true,
  // },
  // {
  //   position: 4,
  //   name: '4 but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
  //   weight: 9.0122,
  //   symbol: 'Be',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 5,
  //   name: '5 but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
  //   weight: 10.811,
  //   symbol: 'B',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 6,
  //   name: ' 6 but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',
  //   weight: 12.0107,
  //   symbol: 'C',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 7,
  //   name: ' 7 but I cant seem to trigger a function to change the data on the table above when the page is changed. Also, how do I use the nextPage, previousPage, hasNextPage, and hasPreviousPage methods?',

  //   weight: 14.0067,
  //   symbol: 'N',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 8,
  //   name: 'Oxygen',
  //   weight: 15.9994,
  //   symbol: 'O',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 9,
  //   name: 'Fluorine',
  //   weight: 18.9984,
  //   symbol: 'F',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 10,
  //   name: 'Neon',
  //   weight: 20.1797,
  //   symbol: 'Ne',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 11,
  //   name: 'Sodium',
  //   weight: 22.9897,
  //   symbol: 'Na',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 12,
  //   name: 'Magnesium',
  //   weight: 24.305,
  //   symbol: 'Mg',
  //   state: 'AP',
  //   visiable: true,
  // },
  {
    position: 13,
    name: 'Aluminum',
    weight: 26.9815,
    symbol: 'Al',
    state: 'AP',
    visiable: true,
  },
  {
    position: 14,
    name: 'Silicon',
    weight: 28.0855,
    symbol: 'Si',
    state: 'AP',
    visiable: true,
  },
  // {
  //   position: 15,
  //   name: 'Phosphorus',
  //   weight: 30.9738,
  //   symbol: 'P',
  //   state: 'AP',
  //   visiable: true,
  // },
  // {
  //   position: 16,
  //   name: 'Sulfur',
  //   weight: 32.065,
  //   symbol: 'S',
  //   state: 'AP',
  //   visiable: true,
  // },
];
