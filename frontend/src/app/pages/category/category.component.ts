import { Component ,OnInit} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
 categories: any[] = [];

  categoryName = '';

  isEditMode = false;

  selectedCategoryId!: number;

  constructor(
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {

    this.categoryService
      .getCategories()
      .subscribe({
        next: (res: any) => {
          this.categories = res;
          console.log("CATEGORY RESPONSE:", res);
        },
        error: (err) => {
          console.log(err);
        }
      });

  }

  saveCategory(): void {

    if (!this.categoryName.trim()) {
      return;
    }

    const payload = {
      category_name: this.categoryName
    };

    if (this.isEditMode) {

      this.categoryService
        .updateCategory(
          this.selectedCategoryId,
          payload
        )
        .subscribe({
          next: () => {

            this.resetForm();

            this.loadCategories();

          }
        });

    } else {

      this.categoryService
        .addCategory(payload)
        .subscribe({
          next: () => {

            this.resetForm();

            this.loadCategories();

          }
        });

    }

  }

  editCategory(category: any): void {

    this.isEditMode = true;

    this.selectedCategoryId = category.id;

    this.categoryName =
      category.category_name;

  }

  deleteCategory(id: number): void {

    const confirmDelete =
      confirm('Delete Category ?');

    if (!confirmDelete) {
      return;
    }

    this.categoryService
      .deleteCategory(id)
      .subscribe({
        next: () => {
          this.loadCategories();
        }
      });

  }

  resetForm(): void {

    this.categoryName = '';

    this.isEditMode = false;

  }




  toggleStatus(category: any) {

  const newStatus =
    category.status === 'ACTIVE'
      ? 'INACTIVE'
      : 'ACTIVE';

  const payload = {
    status: newStatus
  };

  this.categoryService
    .updateStatus(category.id, payload)
    .subscribe({

      next: () => {

        category.status = newStatus;

      },

      error: (err) => {

        console.log(err);

      }

    });

}
}
