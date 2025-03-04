import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { CommonModule, JsonPipe } from '@angular/common';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductServiceService } from '../services/product-service.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { error } from 'console';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ProductsViewComponent,ProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private service = inject(ProductServiceService);
  private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  productList: Product[] = [];

  getAllProducts() {
    const subscribe = this.service.getAllProducts().subscribe((result: any) => {
      this.productList = result;
    
      console.log(this.productList)
    },
    (error) => {
      alert("Not authenticated, please login or register!");
    }
  );
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }

  filterResults(keyword: string) {
    const params = new HttpParams().set('keyword', keyword);
    const subscribe = this.service
      .filterResults(keyword)
      .subscribe((result: any) => {
        this.productList = result;
        if (this.productList.length == 0) {
          this.getAllProducts();
        }
      });
    this.destroyRef.onDestroy(() => {
      subscribe.unsubscribe();
    });
  }

  onDelete(id: number) {
    const isDelete = confirm('Are you sure want to delete');
    if (isDelete) {
      const subscribe = this.service.deleteProduct(id).subscribe((res: any) => {
        if (res.result) {
          alert('Department Deleted Success');
          this.getAllProducts();
        } else {
          alert(res.message);
        }
      });
      this.destroyRef.onDestroy(() => {
        subscribe.unsubscribe();
      });
    }
  }

}
