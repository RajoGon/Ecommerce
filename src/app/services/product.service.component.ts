import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable() 
export class ProductService{ 
    public selectedCategory:any = null;
    public productToView:any;
    public searchedProductList:any[]=[];
    public searchCategory:any=null;
    public messageToSeller:any;
    constructor(private _http: Http) {}
    fetchCategory(){
        return this._http.get('http://192.168.3.144:9000/categories').map((response: Response)=>response.json()); 
    }
    
    getUserProducts(loginToken:any){
        let headers = new Headers();
        headers.append('auth-token',loginToken);
       // console.log('getting specific with token ',loginToken);
        let options = new RequestOptions({ headers: headers });
        return this._http.get('http://192.168.3.144:9000/posts',options).map((response: Response)=>response.json());
    }
    sendCategory(category:any){
        this.selectedCategory = category;
       // console.log("Category in service", this.selectedCategory);
        
    }
    getCategory(){
       // console.log("returning category ",this.selectedCategory);
        
        return this.selectedCategory;
    }
    sendProduct(product:any){
        this.productToView=product;
    }
    getProduct(){

        return this.productToView;
    }
    getPostId(){
        
        return this.productToView.postId;
    }
    getspecificproduct(loginToken:any,postId:any){
        let headers = new Headers();
        headers.append('auth-token',loginToken);
        let options = new RequestOptions({ headers: headers });
        //console.log('getting product with id',postId,loginToken);
        
        return this._http.get('http://192.168.3.144:9000/viewAd?postId='+postId,options).map((response: Response)=> response.json());
    }
    postNewAd(token:any, title:string,category:any,description:any,uname:any){
        let ad = {
            "title" : title,
            "name" : uname,
            "category" :category,
            "description" : description,
         };
            //console.log(ad);
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token',token);
            let options = new RequestOptions({ headers: headers });
            return this._http.post('http://192.168.3.144:9000/postAd',JSON.stringify(ad), options).map((response: Response)=> response.json());
}
updateAdOnServer(loginToken:any,productUpdate:any){
    let headers = new Headers();
    let newad={
                            "postId":productUpdate.postId,
                            "status":"Open",
                            "name":productUpdate.name,
                            "title":productUpdate.title,
                            "description":productUpdate.description,
                            "category":productUpdate.category
    }
            headers.append('Content-Type', 'application/json');
            headers.append('auth-token',loginToken);
            //console.log('updating ad ',newad,'with token ',loginToken );
            let options = new RequestOptions({ headers: headers });
            return this._http.put('http://192.168.3.144:9000/postAd',JSON.stringify(newad), options).map((response: Response)=> response.json());
            
}
getActions(loginToken:any){
    let headers = new Headers();
    headers.append('auth-token',loginToken);
    let options = new RequestOptions({ headers: headers });
    return this._http.get('http://192.168.3.144:9000/actions',options).map((response: Response)=> response.json());
}




deleteAdOnServer(loginToken:any,productUpdate:any){
    let headers = new Headers();
            headers.append('auth-token',loginToken);
            //console.log('Deleting ad with token ',loginToken,'and id = ',productUpdate.postId );
            let options = new RequestOptions({ headers: headers });
            return this._http.delete('http://192.168.3.144:9000/post?postId='+productUpdate.postId, options).map((response: Response)=> response.json());
            
}

searchbyText(text:any){
    this.searchCategory=text;
    // let headers = new Headers();    
    // let options = new RequestOptions({ headers: headers });
    // return this._http.get('http://192.168.3.144:9000/posts/search?category='+text,options).map((response: Response)=>response.json());
}

// sendSearchedProducts(searchedProducts:any){
//     console.log(searchedProducts);
//     this.searchedProductList=searchedProducts;
    
// }
getAllProducts(){

        return this._http.get('http://192.168.3.144:9000/posts/search').map((response: Response)=>response.json());
}
sendMessagetoSeller(Message:any,postid:any,loginToken:any){
console.log('Sending message ',Message,'with token ',loginToken, 'and post id', postid );
        this.messageToSeller = {
                        "message": Message,
                         "postId": postid
                            }
        let headers = new Headers();                   
        headers.append('Content-Type', 'application/json');
            headers.append('auth-token',loginToken);
            
            let options = new RequestOptions({ headers: headers });
            return this._http.post('http://192.168.3.144:9000/message',JSON.stringify(this.messageToSeller), options).map((response: Response)=> response.json());

}

}
