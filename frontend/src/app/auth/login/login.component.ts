import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {

    if (!this.emailPattern.test(this.user.email)) {
      alert("Invalid email format!");
      return;
    }

    if (!this.user.password || this.user.password.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    this.auth.login(this.user).subscribe({

      next: (res: any) => {

        console.log("API Response:", res);

        // TOKEN SAVE
        localStorage.setItem('token', res.token);

        // USER SAVE
        localStorage.setItem('user', JSON.stringify(res.user));

        // redirect
        this.router.navigate(['/dashboard']);
      },

      error: (err) => {
        console.log(err);
        alert("Login failed!");
      }

    });

  }
}
