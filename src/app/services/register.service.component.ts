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
      return this._http.post('http://localhost:2002/register',this.userData, this.options)
                    .map((response: Response)=>response.json())
                    .catch(this.handleError);    
    }

    login(loginData:any){
        this.loginDetails={
                             userName:loginData.userName,
                             password:loginData.password
                                };
        let headers = new Headers({ 'Content-Type': 'application/json' }); 
        // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        // headers.append('Access-Control-Allow-Credentials', 'true');


        let options = new RequestOptions({headers:headers});

        return this._http.post('http://localhost:2002/login',this.loginDetails, options).map((response: Response)=>response.json()); 
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
    return this._http.delete('http://localhost:2002/logout',options)
                    .map((response: Response)=>response.json());   
    }


    getUserInfo(username:any,loginToken:any){
        console.log('Getting details', this.loginToken,' name is ',username)
        //console.log('uname is ',username, ' token is ',this.loginToken);
        let headers = new Headers(); 
        headers.append('auth-token',this.loginToken);
        let options = new RequestOptions({headers:headers});
        return this._http.get('http://localhost:2002/user?userId='+username,options).map((response: Response)=>response.json()); 
        }

}
