import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuService } from '../../services/menu.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  menuList: any[] = [];
  categories: any[] = [];

  category_id = '';
  item_name = '';
  price: any = '';

  isEditMode = false;
  selectedMenuId!: number;

  constructor(
    private menuService: MenuService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {

    this.loadMenu();
    this.loadCategories();

  }

  loadMenu(): void {

    this.menuService
      .getMenu()
      .subscribe({

        next: (res: any) => {

          this.menuList = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  loadCategories(): void {

    this.categoryService
      .getCategories()
      .subscribe({

        next: (res: any) => {

          this.categories = res;

        }

      });

  }

  saveMenu(): void {

    const payload = {

      category_id: this.category_id,
      item_name: this.item_name,
      price: this.price

    };

    if (this.isEditMode) {

      this.menuService
        .updateMenu(
          this.selectedMenuId,
          payload
        )
        .subscribe({

          next: () => {

            this.resetForm();
            this.loadMenu();

          }

        });

    } else {

      this.menuService
        .addMenu(payload)
        .subscribe({

          next: () => {

            this.resetForm();
            this.loadMenu();

          }

        });

    }

  }

  editMenu(menu: any): void {

    this.isEditMode = true;

    this.selectedMenuId = menu.id;

    this.category_id = menu.category_id;

    this.item_name = menu.item_name;

    this.price = menu.price;

  }

  deleteMenu(id: number): void {

    if (!confirm('Delete Menu Item ?')) {
      return;
    }

    this.menuService
      .deleteMenu(id)
      .subscribe({

        next: () => {

          this.loadMenu();

        }

      });

  }

  resetForm(): void {

    this.category_id = '';
    this.item_name = '';
    this.price = '';

    this.isEditMode = false;

  }

}
