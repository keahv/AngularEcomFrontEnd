import { CommonModule } from '@angular/common';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-details',
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  
  route: ActivatedRoute = inject(ActivatedRoute);
  service : ProductServiceService = inject(ProductServiceService);
  product : any = {};
  id!:number;
  constructor(private http: HttpClient,private router: Router) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.getProductById(productId);
    this.id = productId;
    console.log(this.id);
    };


    getProductById(id:number){
      this.http.get("http://localhost:8080/api/product/"+id).subscribe((result:any)=>{
        this.product = result;
      })
    }

    onDelete(id: number) {
        
      const isDelete=  confirm("Are you sure want to delete");
      if(isDelete) {
        this.service.deleteProduct(id).subscribe((res:any)=>{
         console.log(res);
         debugger;
          if(res.status === "OK") {
            debugger;
             alert(res.message);
             debugger;
            this.router.navigate(['/']);
          } else {
            debugger;
            alert(res.message)
          }
        });
     }
  }

  

}