import { Component } from '@angular/core';
import{RegisterService} from '../../../services/register.service.component';

@Component({
  selector: 'register',
  templateUrl:'./register.component.html', 
  providers:[RegisterService]
})
export class RegisterComponent { 
    userdata:any;
    public showError:any=true;
    public showSuccess:any=true;
    constructor(private registerService: RegisterService) { 
    }
    registerUser(username:any,firstname:any,lastname:any,password:any,email:any,phone:any){
        this.userdata={
                        userName:username,
                        firstName:firstname,
                        lastName:lastname,
                        password:password,
                        email:email,
                        phone:phone
                    };  
       this.registerService.sendUserData(this.userdata).subscribe(
           
            (response)=> {
                this.showSuccess=false;
                this.showError=true
            },
            (error) => {
                this.showError=false;
                 this.showSuccess=true
            }

       );
    }
 }