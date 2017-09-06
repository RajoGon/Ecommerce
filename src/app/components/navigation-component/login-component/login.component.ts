import { Component,EventEmitter } from '@angular/core';
import{RegisterService} from '../../../services/register.service.component';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl:'./login.component.html',
  outputs: ['childEvent']

})
export class LoginComponent { 
  public loginDetails:any;
  public loginToken:any;
  public username:any;
  public showError:any = true;
  public showSuccess:any = true;
  public childEvent = new EventEmitter<string>();

  constructor(private registerService: RegisterService, private router: Router) { 
    }
   
  loginUser(username:any,password:any){
    this.loginDetails={
                        userName:username,
                        password:password
                      };
    this.registerService.login(this.loginDetails).subscribe(
           
          (response) => {
                
              this.loginToken=response.data['auth-token'];
              
              localStorage.setItem("auth-token",this.loginToken);

              this.username=response.data.userId;
              localStorage.setItem("userId", this.username);

              if(this.loginToken==null){
                this.showError=false;
                 this.showSuccess = true;
              }
              else{
                  this.showSuccess = false;
                  this.showError=true;
                  this.registerService.sendToken(this.loginToken,this.username);
                  document.getElementById('closeModal').click();
                  this.showSuccess = true;
                  this.router.navigate(['/']); 
                  this.childEvent.emit('Hello nav'); 
                  // this.router.navigate(['/myaccount']).then(
                  //    () => {
                  //         this.router.navigate(['']);
                  //         });
              }
          },
          (error) => {
            console.log('Error');
              this.showError=false;
          });
       
  }
 }