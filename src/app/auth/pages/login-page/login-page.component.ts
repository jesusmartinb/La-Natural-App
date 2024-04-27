import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  getData(pLoginForm: any): void {
    const user: User = pLoginForm.value;
    this.authService.login(user).subscribe((response: any) => {
      if (response.token) {
        localStorage.setItem('mitoken', response.token);
        localStorage.setItem('rol', 'admin');
        this.router.navigate(['/products/list']);
      }
    })
  }

}
