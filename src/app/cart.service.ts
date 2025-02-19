import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
readonly baseUrl = 'http://localhost:8080/api/carts';
  
    constructor(private http: HttpClient) {}

    
  addToCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}`, cart);
  }

  getCartByUserId(userId: number): Observable<Cart[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${userId}`).pipe(
      map((cartsItem) => cartsItem.map((item) => item.product))
    );
  }

  filterResults(keyword: string,userId:number){
    const params = new HttpParams().set('keyword', keyword);
    return this.http.get(this.baseUrl+"/search/"+userId,{params});
  }

}
