import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(product: Product): string {
    if (!product.nombre && !product.alt_img) {
      return 'assets/img/no-image.png';
    }

    if (product.alt_img) {
      return product.alt_img;
    }

    const indexOf: number = product.nombre.indexOf(' ');

    return `assets/img/products/${product.nombre.toLowerCase().substring(indexOf + 1)}.jpg`;
  }

}
