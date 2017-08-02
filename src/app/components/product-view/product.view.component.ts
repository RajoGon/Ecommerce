import { Component } from '@angular/core';
import{ProductService} from '../../services/product.service.component';
import { ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'product-view',
  templateUrl:'./product.view.component.html',
  
})
export class ProductViewComponent {
  public productToView:any;
  public postDate:any;
  constructor(private productService:ProductService){
  }
  ngDoCheck(){
    this.productToView=this.productService.getProduct();
    console.log("in product view",this.productToView ); 
    this.postDate=new Date(this.productToView.createdDate).toLocaleDateString('en-GB');
    console.log('date',this.postDate);
    this.productToView.createdDate=this.postDate;
  }
 }