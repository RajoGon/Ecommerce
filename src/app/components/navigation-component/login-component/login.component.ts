import { Component } from '@angular/core';
import{RegisterService} from '../../../services/register.service.component';

@Component({
  selector: 'login',
  templateUrl:'./login.component.html',
  providers:[RegisterService]
})
export class LoginComponent { 
  loginDetails:any;
  constructor(private registerService: RegisterService) { 
    }
   
  loginUser(username:any,password:any){
    this.loginDetails={
                        userName:username,
                        password:password
                      };
    this.registerService.login(this.loginDetails).subscribe(
           
          (response) => console.log(response),
          (error) => console.log(error.text())
       );
  }
 }