import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css'
})
export class NewPageComponent {

  public presentacion = [
    { id: '300gr.', desc: '300gr.'},
    { id: '400gr.', desc: '400gr.'},
  ];
}
