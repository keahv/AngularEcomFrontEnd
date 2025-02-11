import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details',
      },
      {
        path: 'addProduct',
        component: AddProductComponent,
        title: 'Add Product',
      },
      {
        path: 'updateProduct/:id',
        component: UpdateProductComponent,
        title: 'Update Product',
      },
      {
        path: 'loginOrSignUp',
        component: AuthComponent,
        title: 'loginOrSignUp',
      },
];
