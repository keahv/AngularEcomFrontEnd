import { Component, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './products-view.component.html',
  styleUrl: './products-view.component.css',
})
export class ProductsViewComponent {
  @Input() product!: Product;
}
