import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable() 
export class RegisterService{ 
    public userData:any;
    public loginDetails:any;
    public headers:any;
    public options:any;
    constructor(private _http: Http) {}
    sendUserData(userData:any){
      this.userData = userData;
      this.headers = new Headers({ 'Content-Type': 'application/json' }); 
      this.options = new RequestOptions({headers:this.headers}); 
      return this._http.post('http://192.168.3.144:9000/register',this.userData, this.options).map((response: Response)=>response.json()); 
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
