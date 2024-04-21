import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public products: Product[] = [];
  public selectedProduct?: Product;

  constructor(private productsService: ProductsService) { }

  searchProduct(): void {
    const value: string = this.searchInput.value || '';

    this.productsService.getSuggestions(value)
      .subscribe(products => this.products = products);
  }

  onSelectedOption(e: MatAutocompleteSelectedEvent): void {
    if (!e.option.value) {
      this.selectedProduct = undefined;
      return;
    }

    const product: Product = e.option.value;
    this.searchInput.setValue(product.nombre);

    this.selectedProduct = product;
  }
}
