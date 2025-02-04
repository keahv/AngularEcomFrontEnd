import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  
  route: ActivatedRoute = inject(ActivatedRoute);
  service : ProductServiceService = inject(ProductServiceService);
  product : any = {};

  constructor(private http: HttpClient,private router: Router) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.getProductById(productId);
    console.log(productId);
    };


    getProductById(id:number){
      this.http.get("http://localhost:8080/api/product/"+id).subscribe((result:any)=>{
        this.product = result;
      })
    }

    onDelete(id: number) {
      debugger;
      const isDelete=  confirm("Are you sure want to delete");
      if(isDelete) {
        this.service.deleteProduct(id).subscribe((res:any)=>{
          debugger;
          if(res.result) {
            alert("Department Deleted Success");
            this.router.navigate(['/']);
          } else {
            alert(res.message)
          }
        })
      }

}

}