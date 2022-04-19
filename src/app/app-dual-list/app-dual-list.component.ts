import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Inject, IterableDiffers } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasicList, DualListComponent } from 'angular-dual-listbox';

@Component({
  selector: 'app-dual-list',
  templateUrl: './app-dual-list.component.html',
  styleUrls: ['./app-dual-list.component.scss'],
})
export class AppDualListComponent extends DualListComponent {
  itemsMoved: any;
  availableItems: any;
  selectedItems: any;
  dropDownSource = [];
  dropDowntarget = [];

  constructor(differs: IterableDiffers) {
    super(differs);
  }

  moveAll() {
    this.selectAll(this.available);
    this.moveItem(this.available, this.confirmed);
  }

  removeAll() {
    this.selectAll(this.confirmed);
    this.moveItem(this.confirmed, this.available);
  }

  allowDrop(event: DragEvent, list: BasicList): boolean {
    if (
      event.dataTransfer &&
      event.dataTransfer.types.length &&
      event.dataTransfer.types[0] === this.id
    ) {
      event.preventDefault();
      if (!list.dragStart) {
        list.dragOver = true;
      }
    }
    return false;
  }
  dragEnd(list?: BasicList): boolean {
    if (list) {
      list.dragStart = false;
    } else {
      this.available.dragStart = false;
      this.confirmed.dragStart = false;
    }
    return false;
  }

  dragLeave() {
    this.available.dragOver = false;
    this.confirmed.dragOver = false;
  }

  dropCDK(event: DragEvent, list: BasicList, listName: string) {
    console.log(event.target);
    console.log(list);

    if (
      event.dataTransfer &&
      event.dataTransfer.types.length &&
      event.dataTransfer.types[0] === this.id
    ) {
      event.preventDefault();
      this.dragLeave();
      this.dragEnd();

      if (list === this.available) {
        this.moveItem(this.available, this.confirmed);
      } else {
        this.moveItem(this.confirmed, this.available);
      }
    }

    // if (event.=== event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    // }
    // // clear marked available items and emit event
    // this.itemsMoved.emit({
    //   available: this.availableItems,
    //   selected: this.selectedItems,
    //   movedItems: event.container.data.filter((v, i) => i === event.currentIndex),
    //   from: 'available',
    //   to: 'selected',
    // });
  }
}
