import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic1',
  templateUrl: './dynamic1.component.html',
  styleUrls: ['./dynamic1.component.scss']
})
export class Dynamic1Component implements OnInit {
  @Input() name = '';
  constructor() { }

  ngOnInit(): void {
  }

}
