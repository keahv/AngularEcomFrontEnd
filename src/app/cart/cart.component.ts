import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { LocalStorageService } from '../local-storage.service';
import { response } from 'express';

@Component({
  selector: 'app-cart',
  imports: [ProductsViewComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  localStorageService = inject(LocalStorageService);
  productList: any[] = [];
  constructor() {}

  ngOnInit(): void {
    this.fetchUserCart();
  }

  fetchUserCart() {
    const userId = this.localStorageService.getUserId('userId');
    if (userId === null) {
      alert('User login Required');
    } else {
      this.cartService.getCartByUserId(userId as number).subscribe({
        next: (response) => {
          this.productList = response;
          console.log(this.productList);
        },
      });
    }
  }

  filterResults(keyword: string) {
    const userId = this.localStorageService.getItem('userId');
    const params = new HttpParams().set('keyword', keyword);
    this.cartService
      .filterResults(keyword, userId as number)
      .subscribe((result: any) => {
        this.productList = result;
        if (this.productList.length == 0) {
          this.fetchUserCart();
        }
      });
  }
}
