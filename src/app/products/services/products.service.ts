import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class ProductsService {

  private baseUrl: string = environments.baseURL;

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {

    return this.httpClient.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(id: string): Observable<Product|undefined> {

    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`)
      .pipe(
        catchError(error => of(undefined) )
      )
  }

  getSuggestions(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/products?q=${query}&_limit=6`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}/products`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    if (!product.id) throw new Error('Product id is required to update a product.');

    return this.httpClient.patch<Product>(`${this.baseUrl}/products/${product.id}`, product);
  }

  deleteProductById(id: number): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/products/${id}`)
      .pipe(
        map((resp) => true),
        catchError((error) => of(false)),
      );
  }
}
