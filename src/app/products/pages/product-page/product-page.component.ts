import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit{

  public product?: Product;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1500),
        switchMap(({ id }) => this.productsService.getProductById(id)),
      ).subscribe(product => {
        if(!product) return this.router.navigate(['/products/list']);

        this.product = product;
        return;
    });
  }

  goBack(): void {
    this.router.navigate(['/products/list']);
  }

}
