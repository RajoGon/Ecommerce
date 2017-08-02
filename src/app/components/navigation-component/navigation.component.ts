import { Component, OnInit,OnChanges } from '@angular/core';
import{RegisterService} from '../../services/register.service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation',
  templateUrl:'./navigation.component.html'
  
  
})
export class NavigationComponent { 
  public loginToken:any=null;
  public childData: string=null;
  public logoutToken:any=null;

constructor(private registerService: RegisterService, private router: Router) { 
        
    }
    ngDoCheck(){
       this.loginToken=this.registerService.getToken();
       console.log('In Nav ',this.childData,this.loginToken);      
    }
    logoutUser(){
      this.logoutToken=this.loginToken;
      this.loginToken=null;
      this.registerService.logoutUser(this.logoutToken).subscribe(         
          (response) => {
          },
          (error) => {
          });
           this.registerService.sendToken(null,null);
          this.router.navigate(['']);
    }
 }