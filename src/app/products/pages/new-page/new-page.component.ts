import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Presentacion, Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent implements OnInit {

  public productForm = new FormGroup({
    id: new FormControl<number>(0),
    nombre: new FormControl<string>('', { nonNullable: true }),
    texto: new FormControl<string>(''),
    marca: new FormControl<string>(''),
    presentacion: new FormControl<Presentacion>(Presentacion.The300Gr),
    preciobaseeu: new FormControl<number>(0),
    descuento: new FormControl<number>(0),
    imagen: new FormControl<string>(''),
    categoria: new FormControl<string[]>(['']),
    subcategoria: new FormControl<string[]>(['']),
    cantidad: new FormControl<number>(0),
    alt_img: new FormControl<string>(''),
  });

  public presentacion = [
    { id: '300gr.', desc: '300gr.'},
    { id: '400gr.', desc: '400gr.'},
  ];

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  get currentProduct(): Product {
    const product = this.productForm.value as Product;

    return product;
  }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return; // Si no estamos en la ruta /products/edit, no hacemos nada

    // Si estamos en la ruta /products/edit, obtenemos el id del producto a editar y lo cargamos en el formulario
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productsService.getProductById(id)),
      ).subscribe(product => {
        if (!product) return this.router.navigateByUrl('/');

        this.productForm.reset(product);
        return;
      });
  }

  onSubmit(): void {
    // console.log({
    //   formIsValid: this.productForm.valid,
    //   value: this.productForm.value,
    // })

    if (this.productForm.invalid) return;

    if(this.currentProduct.id !== 0) {
      this.productsService.updateProduct(this.currentProduct)
        .subscribe(product => {
          this.showSnackBar(`${product.nombre} actualizado correctamente`)
        });

        return;
    }

    this.productsService.addProduct(this.currentProduct)
      .subscribe(product => {
        this.router.navigate(['/products/edit', product.id]);
        this.showSnackBar(`${product.nombre} añadido correctamente`);
    });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
    });
  }

}
