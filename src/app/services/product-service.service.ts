import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product';
import { text } from 'stream/consumers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  readonly baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getProductById(productId:number){
    return this.http.get(this.baseUrl+"product/"+productId);
  }

  getAllProducts() :Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  filterResults(keyword: string) {
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get<Product[]>(this.baseUrl + 'products/search', {
      params,
    });
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + 'product/' + id);
  }

  addNewProduct(data:any){
    return this.http.post(`${this.baseUrl}`+"products",data);
  }

  updateProduct(id:number,data:any){
    return this.http.put(this.baseUrl+"product/"+id,data);
  }

}