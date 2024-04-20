import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {

  public products: Product[] = [];

  constructor( private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getProducts()
      .subscribe( products => this.products = products);
  }

}
