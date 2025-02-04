import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { CommonModule, JsonPipe } from '@angular/common';
import { ProductsViewComponent } from '../products-view/products-view.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ProductsViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  service : ProductServiceService = inject(ProductServiceService);
  
  constructor(private http: HttpClient) {
    this.getAllProducts();

  } 
 
  productList: Product[] =[];

  getAllProducts() {
    this.service.getAllProducts().subscribe((result:any)=>{
    this.productList = result;
    });
  }


  filterResults(keyword:string){
    const params = new HttpParams().set('keyword', keyword);
     this.service.filterResults(keyword).subscribe((result:any)=>{
      this.productList = result;
      if(this.productList.length == 0){
        this.getAllProducts();
      }
    });
  }

  onDelete(id: number) {
    debugger;
    const isDelete=  confirm("Are you sure want to delete");
    if(isDelete) {
      this.service.deleteProduct(id).subscribe((res:any)=>{
        debugger;
        if(res.result) {
          alert("Department Deleted Success");
          this.getAllProducts();
        } else {
          alert(res.message)
        }
      })
    }
   
}

}
