import { Component, OnInit,OnChanges } from '@angular/core';
import{RegisterService} from '../../services/register.service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl:'./navigation.component.html'
  
  
})
export class NavigationComponent { 
  public loginToken:any="";
  public childData: string=null;
  public logoutToken:any=null;
  public showLogout:boolean = false;

constructor(private registerService: RegisterService, private router: Router) { 
        console.log("Inside contruct");
        this.loginToken=localStorage.getItem("auth-token");
        console.log("login token",this.loginToken);
        if(this.loginToken===""){
          this.showLogout = true;
          console.log("showlogout", this.showLogout,this.loginToken);
        }else{
          this.showLogout = false;
          console.log("showlogout", this.showLogout,this.loginToken);
        }
    }
    ngDoCheck(){
       this.loginToken=localStorage.getItem("auth-token");
        console.log("login token",this.loginToken);
        if(this.loginToken===""){
          this.showLogout = true;
          console.log("showlogout", this.showLogout,this.loginToken);
        }else{
          this.showLogout = false;
          console.log("showlogout", this.showLogout,this.loginToken);
        }

       console.log('In Nav ',this.loginToken);      
    }
    ngOnInit(){
      this.loginToken=localStorage.getItem("auth-token");
        console.log("login token",this.loginToken);
        if(this.loginToken===""){
          this.showLogout = true;
          console.log("showlogout", this.showLogout,this.loginToken);
        }else{
          this.showLogout = false;
          console.log("showlogout", this.showLogout,this.loginToken);
        }
    }
    logoutUser(){
      console.log("Logging out");
      this.logoutToken=this.loginToken;
      
      this.loginToken=null;
      this.registerService.logoutUser(this.logoutToken).subscribe(         
          (response) => {
             this.loginToken=localStorage.getItem("auth-token");
              console.log("login token",this.loginToken);
              if(this.loginToken===""){
                this.showLogout = true;
                console.log("showlogout", this.showLogout,this.loginToken);
              }else{
                this.showLogout = false;
                console.log("showlogout", this.showLogout,this.loginToken);
              }
            this.registerService.sendToken("","");
            this.router.navigate(['']);
          },
          (error) => {
          });
           this.loginToken="";
           this.registerService.sendToken("","");
          this.router.navigate(['']);
    }
 }