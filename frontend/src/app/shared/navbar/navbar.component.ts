import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: any = {};
  timestamp = new Date().getTime();

  constructor(private router: Router) {}

  ngOnInit(): void {

    const data = localStorage.getItem('user');

    if (data) {
      this.user = JSON.parse(data);
    }

    console.log("NAV USER:", this.user);
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
}
