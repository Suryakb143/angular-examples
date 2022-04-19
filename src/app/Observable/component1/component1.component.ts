import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/shared/dataService.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {
  Component1Data: any = '';

  constructor(private DataSharing: DataSharingService) {
    this.DataSharing.sharingData.subscribe((res: any) => {
      this.Component1Data = res;
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(data:any) {
    this.DataSharing.sharingData.next(data.value);
  }
}
