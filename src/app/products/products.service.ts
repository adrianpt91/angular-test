import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from './store/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}  

  get() {
    return this.http.get<Products[]>('http://localhost:3000/products');
  }

  create(product: Products) {
    return this.http.post<Products>('http://localhost:3000/products', product);
  }

  update(product: Products) {
    return this.http.put<Products>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
}
