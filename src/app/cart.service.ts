import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
readonly baseUrl = 'http://localhost:8080/api/carts';
  
    constructor(private http: HttpClient) {}

    // Add product to cart
  addToCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}`, cart);
  }

  // Get cart items for a specific user
  getCartByUser(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/${userId}`);
  }

}
