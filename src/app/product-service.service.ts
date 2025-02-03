import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  getAllUser() {
    debugger;
  return  this.http.get("http://localhost:8080/api/products");
}

}
