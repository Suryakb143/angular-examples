import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cdk-dual-list',
  templateUrl: './cdk-dual-list.component.html',
  styleUrls: ['./cdk-dual-list.component.scss'],
})
export class CdkDualListComponent implements OnInit {
  ngOnInit(): void {}

  stored: any = [];
  ctrlPress = false;
  isMultidragging = false;
  todo = [
    {
      name: 'Get to work',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Pick up groceries',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Go home',
      selected: false,
      isMultidragging: false,
    },

    { name: 'Fall asleep', selected: false, isMultidragging: false },
  ];

  done = [
    {
      name: 'Wash hair',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Brush teeth',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Brush teeth',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Brush teeth',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Go home',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Check e-mail',
      selected: false,
      isMultidragging: false,
    },
    {
      name: 'Walk dog',
      selected: false,
      isMultidragging: false,
    },
  ];
  moveItem(from: any, to: any) {
    from
      .slice(0)
      .reverse()
      .forEach(function (item: { selected: any }, idx: any) {
        if (item.selected) {
          from.splice(from.indexOf(item), 1);
          to.splice(idx, 0, item);
          to.forEach(function (d: {
            isMultidragging: boolean;
            selected: boolean;
          }) {
            d.isMultidragging = false;
            d.selected = false;
          });
        }
      });
    this.stored = [];
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      if (this.stored.length > 0) {
        event.previousContainer.data
          .slice(0)
          .reverse()
          .forEach(function (item, idx) {
            if (item.selected) {
              event.previousContainer.data.splice(
                event.previousContainer.data.indexOf(item),
                1
              );

              event.container.data.splice(event.currentIndex, 0, item);
              event.container.data.forEach(function (d) {
                d.isMultidragging = false;
                d.selected = false;
              });
            }
          });
        this.stored = [];
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }
  test(event: any) {
    if (this.ctrlPress !== false && this.stored.length > 0) {
      for (let item of event.source.dropContainer.data) {
        if (item.selected) {
          item.isMultidragging = true;
        } else {
          item.isMultidragging = false;
        }
      }
    }
  }
  onSelect(e: any, item: any, data: any) {
    if (this.stored.indexOf(item) == -1) {
      let idx = data.indexOf(item);
      item.selected = true;
      item.index = idx;

      this.stored.push(item);
      console.log(item);
    } else {
      item.selected = false;
      delete this.stored[item];
    }

    //   this.ctrlPress=e.ctrlKey;

    //  if (e.ctrlKey && this.stored.indexOf(item)==-1){
    //     item.selected=true;
    //     let idx=data.indexOf(item);
    //     item.selected=true;
    //     item.index=idx;

    //     this.stored.push(item)
    //     console.log(item)
    //  }
  }
}
