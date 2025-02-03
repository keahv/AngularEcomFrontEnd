import { Component } from '@angular/core';
import { Product } from '../product';
import { CommonModule, JsonPipe } from '@angular/common';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ProductsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private http: HttpClient) {
    this.getAllProducts();
  } 

  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
  productList: Product[] =[];

  userList : any[] = [];
  getAllProducts() {
    // debugger;
    this.http.get("http://localhost:8080/api/products").subscribe((result:any)=>{
      
      this.productList = result;
      //console.log(this.productList)
    })
  }


  filterResults(keyword:string){
    const params = new HttpParams().set('keyword', keyword);
     this.http.get<Product[]>("http://localhost:8080/api/products/search", { params }).subscribe((result:any)=>{
      // debugger;
      this.productList = result;
      console.log(this.productList)
    });
  }
   
}
