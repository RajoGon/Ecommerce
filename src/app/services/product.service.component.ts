import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class ProductService{ 
    public selectedCategory:any = null;
    public productToView:any;
    constructor(private _http: Http) {}
    fetchCategory(){
        return this._http.get('http://192.168.3.144:9000/categories').map((response: Response)=>response.json()); 
    }
    getAllProducts(){
        return this._http.get('http://192.168.3.144:9000/posts/search').map((response: Response)=>response.json());
    }
    sendCategory(category:any){
        this.selectedCategory = category;
        console.log("Category in service", this.selectedCategory);
        
    }
    getCategory(){
        console.log("returning category ",this.selectedCategory);
        
        return this.selectedCategory;
    }
    sendProduct(product:any){
        this.productToView=product;
    }
    getProduct(){
        return this.productToView;
    }
    postNewAd(token:any, title:string,category:any,description:any,uname:any){
        let ad = {
            "title" : title,
            "name" : uname,
            "category" :category,
            "description" : description,
         };
            console.log(ad);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token',token);
            let options = new RequestOptions({ headers: headers });
            return this._http.post('http://192.168.3.144:9000/postAd',JSON.stringify(ad), options).map((response: Response)=> response.json());
}


}
