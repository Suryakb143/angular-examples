import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/dataService.service';

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.scss']
})
export class Component3Component implements OnInit {
  Component3Data: any = '';

  constructor(private DataSharing: DataSharingService) {
    this.DataSharing.sharingData.subscribe((res: any) => {
      this.Component3Data = res;
    })
  }

  onSubmit(data:any) {
    this.DataSharing.sharingData.next(data.value);
  }
  ngOnInit(): void {
  }

}
