import { Component } from '@angular/core';
import {NgModel} from '@angular/forms'
import{ProductService} from '../../services/product.service.component';
import{RegisterService} from '../../services/register.service.component';

@Component({
  selector: 'myaccount',
  templateUrl:'./myaccount.component.html',
})
export class MyAccountComponent {

    public username:any;
    public updateSuccess:any=true;
    public categories:any;
    public userInfo:any[]=[];
    public categoryList:Array<any>=[]; 
    public loginToken:any=null;  
    public loginToken2:any=null;  
    public products:any;
    public productList:Array<any>=[];
    public productName:any;;
    public productTitle:any;
    public productcategory:any;
    public productDescription:any;
    public postDate:any=null;
    public postId:any;
    public toPost:any=false;
    public toUpdate:any=true;
    public actionList:Array<any>=[];
    public postSuccess:any=true;
    public currentAction:any="Post a new ad";
    productUpdate:Object= {
                            postId:null,
                            status:"Open",
                            name:this.productName,
                            title:this.productTitle,
                            description:this.productDescription,
                            category:this.productcategory
                          };
    constructor(private productService:ProductService,private registerService: RegisterService){
      this.productService.fetchCategory().subscribe(
          (response) => {               
              this.categories=response.data.itemList;            
              this.generateCategories();
          },
          (error) => {
            console.log('Error');
          });
          //get user info
          this.username=this.registerService.getUser();
          this.registerService.getUserInfo(this.username,this.loginToken).subscribe(
          (response) => {               
              this.userInfo=response.data.user;            
              console.log('User details are', this.userInfo);
              
          },
          (error) => {
            console.log('Error');
          });

          //getproducts
          // this.productService.getAllProducts().subscribe(
          // (response) => {               
          //     this.products=response.data.advertiseList;            
          //     this.generateProducts(this.products);
          // },
          // (error) => {
          //   console.log('Error');
          // });
          this.productService.getUserProducts(this.loginToken=this.registerService.getToken()).subscribe(
          (response) => {  
            console.log('Success', response.data.mypostList);
                         
              this.products=response.data.mypostList;            
              this.generateProducts(this.products);
          },
          (error) => {
            console.log('Error');
          });
          //get actions
          this.productService.getActions(this.loginToken).subscribe(
          (response) => {    
            this.actionList=response.data.actionList;
            console.log('actions are ', this.actionList);           
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

    generateProducts(products:any){  
       this.productList=[];
        let username=this.registerService.getUser();
    
      for(let x of this.products){
        // if(x.userId == username ){
        //   x.createdDate=new Date(x.createdDate).toLocaleDateString('en-GB');
        //   this.productList.push(x);
        // }
        this.productList.push(x);
      }
      console.log('products are ',this.productList,' of user ',username);
      }

    ngDoCheck(){
       this.loginToken=this.registerService.getToken();
       
       //console.log('In Account',this.loginToken);   
      // this.registerService.getUserInfo(this.username,this.loginToken).subscribe(
      //     (response) => {               
      //         this.userInfo=response.data.user;            
      //         console.log('User details are', this.userInfo);
              
      //     },
      //     (error) => {
      //       console.log('Error');
      //     });
    }


    postAd(productTitle:any,productName:any,productDescription:any,productCategory:any){
      this.productService.postNewAd( this.loginToken,productTitle,productCategory,productDescription,productName).subscribe(
        (response)=>this.postSuccess=false
      );
      
    }

    //updatead
    updateAd(id:any,title:any,category:any,description:any,name:any){
      console.log('product id is', id);
      this.toPost=true;
      this.toUpdate=false;
      this.productUpdate= {
                            postId:id,
                            status:"Open",
                            name:name,
                            title:title,
                            description:description,
                            category:category
                          };
                          
               // this.productService.updateAd(this.loginToken,this.productUpdate);         
    }
    update(id:any,productTitle:any,productName:any,productDescription:any,productCategory:any,action:any){
      this.productUpdate= {
                            postId:id,
                            status:"Open",
                            name:productName,
                            title:productTitle,
                            description:productDescription,
                            category:productCategory
                          };
      this.currentAction="Edit your ad";
      if(action=="Update"){
      this.productService.updateAdOnServer(this.loginToken,this.productUpdate).subscribe(
        (response)=>{
          this.updateSuccess=false;
          this.toPost=false;
          this.toUpdate=true;
        },
        (error)=>console.log('could not update')         
      );  
    }
    else{
      this.productService.deleteAdOnServer(this.loginToken,this.productUpdate).subscribe(
        (response)=>{
          this.updateSuccess=false;
          this.toPost=false;
          this.toUpdate=true;
        },
        (error)=>console.log('could not delete')         
      );  
    }
    }
    



 }