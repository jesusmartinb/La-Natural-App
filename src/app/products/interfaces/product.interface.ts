export interface Product {
  id:           number;
  nombre:       string;
  texto:        string;
  marca:        string;
  presentacion: Presentacion;
  preciobaseeu: number;
  descuento:    number;
  imagen:       string;
  categoria:    string[];
  subcategoria: string[];
  cantidad:     number;
}

export enum Presentacion {
  The300Gr = "300gr.",
  The400Gr = "400gr.",
}
