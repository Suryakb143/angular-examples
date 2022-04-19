import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-mat-column-filter',
  templateUrl: './mat-column-filter.component.html',
  styleUrls: ['./mat-column-filter.component.scss'],
})
export class MatColumnFilterComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions!: Observable<User[]>;
  options = [
    new User('Misha', 'Arnold'),
    new User('Felix', 'Godines'),
    new User('Odessa', 'Thorton'),
    new User('Julianne', 'Gills'),
    new User('Virgil', 'Hommel'),
  ];
  @Input() multiple = false;
  selectedUsers: String[] = new Array<String>();
  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  inputAutoComplete!: MatAutocompleteTrigger;

  constructor() {}
  input = '';
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  onslectAll() {
    this.filteredOptions.forEach((row) => {
      row.forEach((option) => {
        option.selected = true;
      });
    });
  }
  onApply(evt: { stopPropagation: () => void }) {
    console.log(this.myControl);
    evt.stopPropagation();
    this.inputAutoComplete.closePanel();
  }
  toggleSelection(user: User) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(user.firstname);
    } else {
      // const i = this.selectedUsers.findIndex(
      //   (value) =>
      //     value.firstname === user.firstname && value.lastname === user.lastname
      // );
      this.selectedUsers.splice(1);
    }

    this.myControl.setValue(this.selectedUsers);
  }
  private _filter(value: string): User[] {
    return this.options;
    // const filterValue = value.toLowerCase();

    // return this.options.filter((option) =>
    //   option.firstname.toLowerCase().includes(filterValue)
    // );
  }
}
export class User {
  constructor(
    public firstname: string,
    public lastname: string,
    public selected: boolean = false
  ) {
    if (selected === undefined) selected = false;
  }
}
