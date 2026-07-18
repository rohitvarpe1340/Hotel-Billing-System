import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  selectedFile!: File;

  user = {
    name: '',
    email: '',
    password: ''
  };


  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

 passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  constructor(private auth: AuthService) {}

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  register() {


    if (!this.user.name || this.user.name.trim().length < 3) {
      alert("Name must be at least 3 characters!");
      return;
    }

    if (!this.emailPattern.test(this.user.email)) {
      alert("Invalid email format!");
      return;
    }

    if (!this.passwordPattern.test(this.user.password)) {
      alert("Password must be 6+ chars with at least 1 letter and 1 number!");
      return;
    }

    const formData = new FormData();

    formData.append("name", this.user.name);
    formData.append("email", this.user.email);
    formData.append("password", this.user.password);

    if (this.selectedFile) {
      formData.append("profile", this.selectedFile);
    }

    this.auth.register(formData).subscribe({

      next: (res: any) => {

        alert(res.message);

        // RESET FORM
        this.user = {
          name: '',
          email: '',
          password: ''
        };

        this.selectedFile = null as any;

        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }

      },

      error: (err) => {
        alert(err.error?.message || "Registration failed");
      }

    });
  }
}
