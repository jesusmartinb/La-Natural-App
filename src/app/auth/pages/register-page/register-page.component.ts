import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  getData(pRegisterForm: any): void {
    let user: User = pRegisterForm.value;
    this.authService.create(user).subscribe(response => {
      console.log(response);
    })
  }
}
