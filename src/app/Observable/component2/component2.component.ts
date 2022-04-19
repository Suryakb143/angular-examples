import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/dataService.service';

@Component({
  selector: 'app-component2',
  templateUrl: './component2.component.html',
  styleUrls: ['./component2.component.scss']
})
export class Component2Component implements OnInit {
  Component2Data: any = '';


  constructor(private DataSharing: DataSharingService) {
    this.DataSharing.sharingData.subscribe((res: any) => {
      this.Component2Data = res;
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(data:any) {
    this.DataSharing.sharingData.next(data.value);
  }

}
