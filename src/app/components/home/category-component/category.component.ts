import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{ProductService} from '../../../services/product.service.component';

@Component({
  selector: 'category',
  templateUrl:'./category.component.html',
  
})
export class CategoryComponent {
    public categories:any;
    public categoryList:Array<any>=[];   
    public selectedCategory:any='Featured Products';
    public searchedList:any[]=[];
    constructor(private productService:ProductService, private router: Router){
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
    searchAds(searchText:any){
      //this.productService.searchbyText(searchText);
      this.router.navigate(['/'],{ queryParams: { search:searchText}});
    //   .subscribe(
    //   (response)=>{
    //     this.searchedList=response.data.advertiseList;
    //      this.productService.sendSearchedProducts(this.searchedList);      
    //   },
    //   (error)=>console.log('error')
    // )
    
    }
   
    
 }