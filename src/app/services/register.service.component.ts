import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class RegisterService{ 
    public userData:any;
    public loginDetails:any;
    public headers:any;
    public options:any;
    public handleError:any;
    public loginToken:string;
    public username:any;
    constructor(private _http: Http) {}
    sendUserData(userData:any){
      this.userData = userData;
      this.headers = new Headers({ 'Content-Type': 'application/json' }); 
      this.options = new RequestOptions({headers:this.headers}); 
      return this._http.post('http://192.168.3.144:9000/register',this.userData, this.options)
                    .map((response: Response)=>response.json())
                    .catch(this.handleError);    
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

    sendToken(loginToken:any,userId:any){
        this.loginToken = loginToken;
        this.username=userId;
        console.log('In service', this.loginToken,this.username);
        
    }
    getToken(){
        return this.loginToken;
    }
    getUser(){
        return this.username;
    }
    logoutUser(loginToken:any){

    let headers = new Headers(); 
    headers.append('auth-token',loginToken);
    let options = new RequestOptions({headers:headers});
    return this._http.delete('http://192.168.3.144:9000/logout',options)
                    .map((response: Response)=>response.json());   
    }


    getUserInfo(username:any,loginToken:any){
        console.log('uname is ',username, ' token is ',loginToken);
        let headers = new Headers(); 
        headers.append('auth-token',loginToken);
        let options = new RequestOptions({headers:headers});
        return this._http.get('http://192.168.3.144:9000/user?userId='+username,options).map((response: Response)=>response.json()); 
        }

}
