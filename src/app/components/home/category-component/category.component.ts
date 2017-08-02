import { Component } from '@angular/core';
import{ProductService} from '../../../services/product.service.component';

@Component({
  selector: 'category',
  templateUrl:'./category.component.html',
  
})
export class CategoryComponent {
    public categories:any;
    public categoryList:Array<any>=[];   
    public selectedCategory:any='Featured Products';
    constructor(private productService:ProductService){
      this.productService.fetchCategory().subscribe(
          (response) => {               
              this.categories=response.data.itemList;            
              this.generateCategories();
          },
          (error) => {
            console.log('Error');
          });
    }
    generateCategories(){
      for(let x of this.categories){
        this.categoryList.push(x.name);
      }
    }
    setCategory(category:any){
      this.selectedCategory = category;
      this.productService.sendCategory(this.selectedCategory);
      
    }
   
    
 }