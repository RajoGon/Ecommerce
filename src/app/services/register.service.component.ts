import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable() 
export class RegisterService{ 
    userData:any;
    loginDetails:any;
    constructor(private _http: Http) {}
    sendUserData(userData:any){
      this.userData = userData;
      let headers = new Headers({ 'Content-Type': 'application/json' }); 
      let options = new RequestOptions({headers:headers}); 
      return this._http.post('http://192.168.3.144:9000/register',this.userData, options).map((response: Response)=>response.json()); 
    }

    login(loginData:any){
        this.loginDetails={
                             userName:loginData.userName,
                             password:loginData.password
                                };
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        let options = new RequestOptions({headers:headers});

        return this._http.post('http://192.168.3.144:9000/login',this.loginDetails, options).map((response: Response)=>response.json()); 
    }

}

