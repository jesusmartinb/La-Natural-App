export interface Product {
  id:           number;
  nombre:       string;
  texto:        string;
  marca:        string;
  presentacion: Presentacion;
  preciobaseeu: number;
  descuento:    number;
  imagen?:       string;
  categorias:    string;
  subcategorias: string;
  cantidad:     number;
  alt_img?:     string;
}

export enum Presentacion {
  The300Gr = "300gr.",
  The400Gr = "400gr.",
}
