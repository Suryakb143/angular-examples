import { Component, OnInit } from '@angular/core';  
import { ToastrService } from 'ngx-toastr';  
import { DynamicGrid, DynamicGridList } from '../grid.model';  
  
@Component({  
  selector: 'app-grid-view',  
  templateUrl: './grid-view.component.html',  
  styleUrls: ['./grid-view.component.scss']  
})  
export class GridViewComponent implements OnInit {  
  
  constructor(private toastr: ToastrService) { }  
  
  dynamicArray: Array<DynamicGrid> = [];  
  dynamicAndArray:Array<DynamicGridList> =[];

  newDynamic: any = {};  
  newAndDynamic: any = {};  
  ngOnInit(): void {  
      this.newDynamic = {title1: "", title2: "",title3:""}; 
       this.dynamicArray.push(this.newDynamic); 
      this.newAndDynamic = {combinator: "AND" ,dynamicArray:[this.newDynamic]};
       
      this.dynamicAndArray.push(this.newAndDynamic);  
  }  
  
  addRow() {    
      this.newDynamic = {title1: "", title2: "",title3:""};  
      this.dynamicArray.push(this.newDynamic);  
      this.toastr.success('New row added successfully', 'New Row');  
      console.log(this.dynamicArray);  
      return true;  
  }  

  addAnd(){
    this.newDynamic = {title1: "", title2: "",title3:""};  
    this.newAndDynamic = {combinator: "AND" ,dynamicArray:[this.newDynamic]};  
    this.dynamicAndArray.push(this.newAndDynamic);  
    return true;
  }
  addRowAnd(dynamic:DynamicGridList){
    this.newDynamic = {title1: "", title2: "",title3:""}; 
    dynamic.dynamicArray.push(this.newDynamic);  
  }
    
  deleteRow(index: number) {  
      if(this.dynamicArray.length ==1) {  
        this.toastr.error("Can't delete the row when there is only one row", 'Warning');  
          return false;  
      } else {  
          this.dynamicArray.splice(index, 1);  
          this.toastr.warning('Row deleted successfully', 'Delete row');  
          return true;  
      }  
  }  
  onClick(){
    console.log(this.dynamicArray);
    console.log(this.dynamicAndArray);
  }
  
} 