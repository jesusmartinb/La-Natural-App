import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
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
}
