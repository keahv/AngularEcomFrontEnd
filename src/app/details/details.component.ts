import { CommonModule } from '@angular/common';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Product } from '../models/product';

import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { AuthServiceService } from '../services/auth-service.service';
import { response } from 'express';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  service: ProductServiceService = inject(ProductServiceService);
  cartService : CartService = inject(CartService);
  authservice : AuthServiceService = inject(AuthServiceService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  product: any = {};
  id!: number;
  quantity : number = 1;
  constructor(private http: HttpClient, private router: Router) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.getProductById(productId);
    this.id = productId;
    console.log(this.id);
  }

  getProductById(id: number) {
    this.http
      .get('http://localhost:8080/api/product/' + id)
      .subscribe((result: any) => {
        this.product = result;
      });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to delete');
    if (isDelete) {
      this.service.deleteProduct(id).subscribe((res: any) => {
        console.log(res);
        if (res.status === 'OK') {
          alert(res.message);
          this.router.navigate(['/']);
        } else {
          alert(res.message);
        }
      });
    }
  }


  addToUsersCart(){
    const userId = this.localStorageService.getItem('userId') as number;
    
   
    console.log(userId)
          const cartItem: Cart = {
            user: { id: userId as number},
            product: { id: this.id },
            quantity: this.quantity,
          };
          this.cartService.addToCart(cartItem).subscribe({
            next:(res)=>{
              console.log(res);
              window.alert("added to cart");
            },
            error: (e)=>{
              console.error(e);
            }
          });
  }

  
}
