import { CommonModule } from '@angular/common';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Product } from '../product';
import { ProductServiceService } from '../product-service.service';
import { LocalStorageService } from '../local-storage.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  service: ProductServiceService = inject(ProductServiceService);
  cartService : CartService = inject(CartService);
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
    const userId = this.localStorageService.getItem('userId');
   console.log(userId)
    const cartItem: Cart = {
      user: { id: userId as number},
      product: { id: this.id },
      quantity: this.quantity,
    };
    this.cartService.addToCart(cartItem).subscribe((res)=>{
      console.log(res);
      window.alert("added to cart");
    })
  }

  
}
