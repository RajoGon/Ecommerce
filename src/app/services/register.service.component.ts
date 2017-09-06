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
    
    constructor(private _http: Http) {

    }
    ngOnInit(){
        
        localStorage.setItem("auth-token","");
        localStorage.setItem("userId","");
        console.log("Register init service",localStorage.getItem("auth-token"));
    }
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
        localStorage.setItem("auth-token",this.loginToken);
        localStorage.setItem("userId", this.username);
        console.log('In service', this.loginToken,this.username);
        
    }
    getToken(){
        console.log("get token",localStorage.getItem("auth-token"));
        return localStorage.getItem("auth-token");
        //return this.loginToken;
    }
    getUser(){
        return localStorage.getItem("userId");
        //return this.username;
    }
    logoutUser(loginToken:any){
    localStorage.setItem("auth-token","");
    localStorage.setItem("userId","");
    let headers = new Headers(); 
    headers.append('auth-token',localStorage.getItem("auth-token"));
    let options = new RequestOptions({headers:headers});
    return this._http.delete('http://localhost:2002/logout',options)
                    .map((response: Response)=>response.json());   
    }


    getUserInfo(username:any,loginToken:any){
        console.log('Getting details', localStorage.getItem("auth-token"),' name is ',localStorage.getItem("userId"))
        //console.log('uname is ',username, ' token is ',this.loginToken);
        let headers = new Headers(); 
        headers.append('auth-token',localStorage.getItem("auth-token"));
        let options = new RequestOptions({headers:headers});
        return this._http.get('http://localhost:2002/user?userId='+localStorage.getItem("userId"),options).map((response: Response)=>response.json()); 
        }

}
