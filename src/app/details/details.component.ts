import { CommonModule } from '@angular/common';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, DestroyRef, inject } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterModule,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '../models/product';

import { LocalStorageService } from '../services/local-storage.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { AuthServiceService } from '../services/auth-service.service';
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
  cartService: CartService = inject(CartService);
  authservice: AuthServiceService = inject(AuthServiceService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private destroyRef = inject(DestroyRef);
  product: any = {};//TODO:-(status = inProgress 40%) use dynamic route data resolver to get userID from param and get product
  id!: number;
  quantity: number = 1;
  constructor(private http: HttpClient, private router: Router) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.getProductById(productId);
    this.id = productId;
    console.log(this.id);
  }

  getProductById(id: number) {
    const subscribe = this.http
      .get('http://localhost:8080/api/product/' + id)
      .subscribe((result: any) => {
        this.product = result;
      });

    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to delete');
    if (isDelete) {
      const subscribe = this.service.deleteProduct(id).subscribe((res: any) => {
        console.log(res);
        if (res.status === 'OK') {
          alert(res.message);
          this.router.navigate(['/']);
        } else {
          alert(res.message);
        }
      });

      this.destroyRef.onDestroy(() => {
        subscribe.unsubscribe();
      });
    }
  }

  addToUsersCart() {
    const userId = this.localStorageService.getItem('userId') as number;

    console.log(userId);
    const cartItem: Cart = {
      user: { id: userId as number },
      product: { id: this.id },
      quantity: this.quantity,
    };
    const subscribe = this.cartService.addToCart(cartItem).subscribe({
      next: (res) => {
        console.log(res);
        window.alert('added to cart');
      },
      error: (e) => {
        console.error(e);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }
}

export const resolveProductDetails: ResolveFn<Product> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const productService = inject(ProductServiceService);
  const productId = activatedRoute.paramMap.get('id');
  let product : any = {};
  productService.getProductById(productId as unknown as number).
    subscribe((result: any) => {
    product = result;
  });
  return product;
}
