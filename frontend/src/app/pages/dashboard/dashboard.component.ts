import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalSales = 0;
  totalOrders = 0;
  totalMenuItems = 0;
  totalCategories = 0;

  dailySales = 0;
  weeklySales = 0;
  monthlySales = 0;

  recentBills: any[] = [];

  constructor(
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.dashboardService
      .getStats()
      .subscribe({

        next: (res: any) => {

          this.totalSales = res.totalSales;
          this.totalOrders = res.totalOrders;
          this.totalMenuItems = res.totalMenuItems;
          this.totalCategories = res.totalCategories;

          this.dailySales = res.dailySales;
          this.weeklySales = res.weeklySales;
          this.monthlySales = res.monthlySales;

          this.recentBills = res.recentBills || [];

        },

        error: (err) => {
          console.log(err);
        }

      });

  }

}
