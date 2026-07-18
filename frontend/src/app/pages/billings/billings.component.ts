import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MenuService } from '../../services/menu.service';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-billings',
   standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent implements OnInit{
showBillModal = false;
customerName = '';
customerMobile = '';

hotelName = 'हॉटेल अचानक';

hotelAddress =
                 '📍 बाभळेश्वर, ता. राहाता, जि. अहिल्यानगर 📞 मो. : 7654356780';

billPreview: any = null;

  menuItems: any[] = [];

  selectedItems: any[] = [];

  grandTotal = 0;

  constructor(
    private menuService: MenuService,
    private billService: BillService
  ) {}

  ngOnInit(): void {

    this.loadMenu();

  }

  loadMenu(): void {

    this.menuService
      .getMenu()
      .subscribe({

        next: (res: any) => {

          this.menuItems = res.map(
            (item: any) => ({

              ...item,

              quantity: 1,
              selected: false

            })
          );

        }

      });

  }

  updateTotal(): void {

    this.selectedItems =
      this.menuItems.filter(
        item => item.selected
      );

    this.grandTotal = 0;

    this.selectedItems.forEach(item => {

      this.grandTotal +=
        item.price *
        item.quantity;

    });

  }


  generateBill(): void {

  this.selectedItems =
    this.menuItems.filter(
      item => item.selected
    );

  if (this.selectedItems.length === 0) {

    alert('Please Select Menu Items');
    return;

  }

  if (!this.customerName.trim()) {

    alert('Enter Customer Name');
    return;

  }

  if (!this.customerMobile.trim()) {

    alert('Enter Mobile Number');
    return;

  }

  this.billPreview = {

    customerName:
      this.customerName,

    customerMobile:
      this.customerMobile,

    items:
      this.selectedItems,

    total:
      this.grandTotal,

    billDate:
      new Date()

  };
   this.showBillModal = true;

}

printBill(): void {

  window.print();

}



saveBill() {

  const payload = {

    customer_name: this.customerName,
    customer_mobile: this.customerMobile,

    items: this.billPreview.items.map((item: any) => ({
      menu_item_id: item.id,
      quantity: item.quantity
    }))

  };

  this.billService.generateBill(payload)
    .subscribe({
      next: (res) => {
        alert("Bill Saved Successfully");
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });

}

closeModal(): void {

  this.showBillModal = false;

}


}
