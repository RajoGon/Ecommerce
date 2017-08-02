import { Component } from '@angular/core';
import{ProductService} from '../../services/product.service.component';
import{RegisterService} from '../../services/register.service.component';

@Component({
  selector: 'myaccount',
  templateUrl:'./myaccount.component.html',
})
export class MyAccountComponent {

    public username:any;
    public categories:any;
    public userInfo:Array<any>;
    public categoryList:Array<any>=[]; 
    public loginToken:any=null;  
    constructor(private productService:ProductService,private registerService: RegisterService){
      this.productService.fetchCategory().subscribe(
          (response) => {               
              this.categories=response.data.itemList;            
              this.generateCategories();
          },
          (error) => {
            console.log('Error');
          });
          this.username=this.registerService.getUser();
          console.log('logged in user is ',this.username);
          this.registerService.getUserInfo(this.username,this.loginToken).subscribe(
          (response) => {               
              this.userInfo=response.data.user;            
              console.log('User details are', this.userInfo);
              
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
    ngDoCheck(){
       this.loginToken=this.registerService.getToken();
       //console.log('In Account',this.loginToken);   
      
    }


    postAd(productTitle:any,productName:any,productDescription:any,productCategory:any){
      this.productService.postNewAd( this.loginToken,productTitle,productCategory,productDescription,productName).subscribe();
    }

    



 }