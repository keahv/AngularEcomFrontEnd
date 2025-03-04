import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-cart',
  imports: [ProductsViewComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  localStorageService = inject(LocalStorageService);
  authService = inject(AuthServiceService);
  private destroyRef = inject(DestroyRef);

  productList: any[] = [];
  constructor() {}

  ngOnInit(): void {
    if(this.authService.isLogin()){
    this.fetchUserCart();
    }
  }

  fetchUserCart() {
    const userId = this.localStorageService.getUserId('userId');
    if (userId === null) {
      alert('User login Required');
    } else {
     const subscribe = this.cartService.getCartByUserId(userId as number).subscribe({
        next: (response) => {
          this.productList = response;
          console.log(this.productList);
        },
      });
      this.destroyRef.onDestroy(()=>{
        subscribe.unsubscribe();
      });
    }
  }

  filterResults(keyword: string) {
    const userId = this.localStorageService.getItem('userId');
    const subscribe = this.cartService
      .filterResults(keyword, userId as number)
      .subscribe((result: any) => {
        this.productList = result;
        if (this.productList.length == 0) {
          this.fetchUserCart();
        }
      });

      this.destroyRef.onDestroy(()=> {
        subscribe.unsubscribe();
      });
  }

}
