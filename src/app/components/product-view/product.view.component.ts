import { Component } from '@angular/core';
import{ProductService} from '../../services/product.service.component';
import{RegisterService} from '../../services/register.service.component';
import { ActivatedRoute } from '@angular/router'; 
@Component({
  selector: 'product-view',
  templateUrl:'./product.view.component.html',
  
})
export class ProductViewComponent {
  public productToView:any;
  public postDate:any;
  public postId:any;
  public loginToken:any;
  public messageToken:any;
  public toSendMessage:any;
  public messagesent:any=true;
  constructor(private productService:ProductService, private registerService: RegisterService){
  }
  ngDoCheck(){
     this.loginToken=this.registerService.getToken();
     this.postId=this.productService.getPostId();
    this.productService.getspecificproduct(this.loginToken,this.postId);
    this.productToView=this.productService.getProduct();
    //console.log("in product view",this.productToView ); 
    this.postDate=new Date(this.productToView.createdDate).toLocaleDateString('en-GB');
    //console.log('date',this.postDate);
    this.productToView.createdDate=this.postDate;
    console.log('product id is ',this.productToView.id);
    
  }

  sendMessage(message:string){
    this.messageToken=this.registerService.getToken();
    this.toSendMessage=message;
    this.productService.sendMessagetoSeller(this.toSendMessage,this.productToView.id, this.messageToken).subscribe(
      (response)=> {
 
        this.messagesent=false;
      },
      (error)=>{
        console.log('error');
        
      }
    );
  }
 }