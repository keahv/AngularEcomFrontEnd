import { Component } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductServiceService } from '../services/product-service.service';
import { CommonModule } from '@angular/common';
import { CanDeactivateFn } from '@angular/router';
@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule,CommonModule,ButtonModule,CheckboxModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  submitted = false;
  image =
    'https://images.unsplash.com/flagged/photo-1572609239482-d3a83f976aa0?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D';

  constructor(private http: ProductServiceService) {}
//TODO:-(status = Done) use canDeactivate Gaurd while leaving page
  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    releaseDate: new FormControl('', Validators.required),
    productAvailable: new FormControl('true', Validators.required),
    stockQuantity: new FormControl('', Validators.required),
    imageUrl: new FormControl(this.image),
  });

  onSave() {
    const formSubmit = this.addProductForm.value;
    console.log(formSubmit);
    this.http.addNewProduct(formSubmit).subscribe({
      next: (response) => {
        console.log('Product added successfully:', response);
        alert('Product added successfully!');
        this.submitted = true;
      },
      error: (error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product.');
      },
    });
  }

  
}

// gaurd to confirm leave page if data is inserted
export const canLeaveEditPage: CanDeactivateFn<AddProductComponent> = (component) => {
  if (component.submitted) {
    return true;
  }
  if (component.addProductForm.get('name')?.value || component.addProductForm.get('description') || component.addProductForm.get('brand')
    || component.addProductForm.get('price') || component.addProductForm.get('category') || component.addProductForm.get('releaseDate')
  || component.addProductForm.get('productAvailable') || component.addProductForm.get('stockQuantity') ) {
    return window.confirm('Do you really want to leave? You will lose the entered data.')
  }
  return true;
}


