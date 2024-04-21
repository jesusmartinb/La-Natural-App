import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Presentacion } from '../../interfaces/product.interface';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {

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

  onSubmit(): void {
    console.log({
      formIsValid: this.productForm.valid,
      value: this.productForm.value,
    })
  }
}
