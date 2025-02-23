import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
})
export class UpdateProductComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  id!:number;
  constructor(private http: ProductServiceService, private router: Router) {
    const productId = parseInt(this.route.snapshot.params['id'], 10);
    console.log(productId);
    this.id = productId;
  }

  updateProductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    releaseDate: new FormControl('', Validators.required),
    productAvailable: new FormControl('true', Validators.required),
    stockQuantity: new FormControl('', Validators.required),
    imageUrl: new FormControl(),
  });

  ngOnInit() {
    this.loadProductData(this.id);
  }

  loadProductData(productId: number) {
    this.http.getProductById(productId).subscribe({
      next: (product) => {
        console.log('Product data loaded:', product);
        this.updateProductForm.patchValue(product);
      },
      error: (error) => {
        console.error('Error loading product data:', error);
        alert('Failed to load product data.');
      },
    });
  }

  onUpdate(productId: number) {
    const updatedProduct = this.updateProductForm.value;
    console.log(
      'Updating product with ID:',
      productId,
      'Data:',
      updatedProduct
    );

    this.http.updateProduct(productId, updatedProduct).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        alert('Product updated successfully!');
      },
      error: (error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product.');
      },
    });
  }
  
}
