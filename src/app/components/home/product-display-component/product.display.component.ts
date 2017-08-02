import { Component,OnInit,OnChanges } from '@angular/core';
import{ProductService} from '../../../services/product.service.component';
import { Router } from '@angular/router';
import {Pipe} from '@angular/core'

@Component({
  selector: 'product-display',
  templateUrl:'./product.display.component.html',
  
})
export class ProductDisplayComponent {
    public products:any;
    public productList:Array<any>=[];
    public selectedCategory:any=null;
    constructor(private productService:ProductService,private router: Router){
      this.productService.getAllProducts().subscribe(
          (response) => {               
              this.products=response.data.advertiseList;            
              this.generateCategories(null);
          },
          (error) => {
            console.log('Error');
          });
    }
    ngDoCheck(){
       this.selectedCategory=this.productService.getCategory();
       if(this.selectedCategory!=null){
        this.generateCategories(this.selectedCategory); 
       }
      //  else{
      //    this.selectedCategory="";
      //    this.generateCategories(this.selectedCategory); 
      //  }         
    }
    generateCategories(categories:any){  
      console.log("getting", categories);
       this.productList=[];
       this.selectedCategory= categories;
      for(let x of this.products){
        if(this.selectedCategory==null ||this.selectedCategory=="All Products" ){
          this.productList.push(x);
        }
        else
        {   console.log("specific.");
        
                if(x.category==this.selectedCategory){
              this.productList.push(x);
            }
      }
      }

    }
    goToProduct(productToView:any){
      let productToSend:any;
      for(let x of this.products){
        if(x.id==productToView.id){
            this.productService.sendProduct(x);
        }
      }
      this.router.navigate(['/productview']); 
    }
    
 }