import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AddProductComponent, canLeaveEditPage } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { inject } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';


const dummyCanMatch: CanMatchFn = (route,segments) => {
  const router = inject(Router);
  const authService = inject(AuthServiceService);
  if(authService.isLogin()){
    return true;
  }
  return new RedirectCommand(router.parseUrl('/loginOrSignUp'));
}

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
    canMatch: [dummyCanMatch],
  },
  {
    path: 'addProduct',
    component: AddProductComponent,
    title: 'Add Product',
    canMatch: [dummyCanMatch],
    canDeactivate: [canLeaveEditPage],
  },
  {
    path: 'updateProduct/:id',
    component: UpdateProductComponent,
    title: 'Update Product',
    canMatch: [dummyCanMatch]
  },
  {
    path: 'loginOrSignUp',
    component: AuthComponent,
    title: 'loginOrSignUp',
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'My Cart',
    canMatch: [dummyCanMatch]
  },
];
