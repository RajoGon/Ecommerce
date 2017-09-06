import { Component } from '@angular/core';
import{ProductService} from '../../../services/product.service.component';
import {NgModel} from '@angular/forms';
import{RegisterService} from '../../../services/register.service.component';
@Component({
  selector: 'advanced-search',
  templateUrl:'./advanced.search.component.html',
})
export class AdvancedSearchComponent {
  public dateList:any[]=[];
  public category:any;
  public postedBy:any;
  
   constructor(private productService:ProductService,private registerService: RegisterService){
          //get dates
    this.productService.getDateConditions().subscribe(
          (response) => {    
              
            this.dateList=response.data.dateList;
            console.log('date conditions are ', this.dateList);           
          },        
              
          
          (error) => {
            console.log('Error');
          });
   }
  //  ngOnTnit(){
  //        //get dates
  //   this.productService.getDateConditions().subscribe(
  //         (response) => {    
              
  //           this.dateList=response.data.dateList;
  //           console.log('date conditions are ', this.dateList);           
  //         },        
              
          
  //         (error) => {
  //           console.log('Error');
  //         });
  //  }
 }