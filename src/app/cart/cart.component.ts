import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartService: CartService = inject(CartService);
  productList: Product[] = [];
  constructor() {}

  //TODO : subscribe and handle response
  getAllProductFromCart(){
    // this.cartService.getCartByUser();
  }

  filterResults(keyword: string) {}

}
