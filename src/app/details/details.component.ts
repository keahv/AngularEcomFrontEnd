import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  
  route: ActivatedRoute = inject(ActivatedRoute);
  product : any = {};

  constructor(private http: HttpClient) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    this.getProductById(productId);
    console.log(productId);
    };


    getProductById(id:number){
      this.http.get("http://localhost:8080/api/product/"+id).subscribe((result:any)=>{
      
        this.product = result;
        console.log(this.product);
      })
    }

}