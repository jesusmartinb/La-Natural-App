import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-page',
  templateUrl: './perfil-page.component.html',
  styleUrl: './perfil-page.component.css'
})
export class PerfilPageComponent {

  public rol: string | null = localStorage.getItem('rol');

}
