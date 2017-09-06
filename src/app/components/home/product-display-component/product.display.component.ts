import { Component,OnInit,OnChanges } from '@angular/core';
import{ProductService} from '../../../services/product.service.component';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {Pipe} from '@angular/core'

@Component({
  selector: 'product-display',
  templateUrl:'./product.display.component.html',
  
})
export class ProductDisplayComponent {
    public products:any;
    public productList:Array<any>=[];
    public selectedCategory:any=null;
    public searchText:String=null;
    constructor(private productService:ProductService,private router: Router, private activatedRoute: ActivatedRoute){
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
        
    }
    ngOnInit(){
          this.activatedRoute.queryParams.subscribe(
             (queryParam: any) => {
               this.searchText = queryParam['search'];
               if(this.searchText!=null){
                  this.productService.searchByText(this.searchText).subscribe(
                      (response) => {               
                      this.products=response.data.advertiseList;           
                        this.generateCategories(null);
                        },
                      (error) => {
                        console.log('Error');
                    });
            console.log("Search text",this.searchText);}
               }
                  
         );
        
    }


    // subscribe to router event
   




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
    this.selectedCategory=null;
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