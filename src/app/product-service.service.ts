import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  readonly baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

getAllProducts() {
  return  this.http.get(this.baseUrl + "products");
}

filterResults(keyword:string){
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Product[]>(this.baseUrl + "products/search", { params });
}

deleteProduct(id : number){
  debugger;
  return this.http.delete(this.baseUrl+"product/"+id);
}



}