import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-savebill',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './savebill.component.html',
  styleUrls: ['./savebill.component.css']
})
export class SavebillComponent implements OnInit {

  bills:any[] = [];

  constructor(
    private billService: BillService
  ) {}

  ngOnInit(): void {

    this.loadBills();

  }

  loadBills() {

    this.billService.getHistory()
      .subscribe({

        next: (res:any) => {

          console.log(res);

          this.bills = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }



  downloadBill(id: number) {

  this.billService.downloadBill(id).subscribe({

    next: (res: Blob) => {

      const blob = new Blob([res], { type: 'application/pdf' });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');

      a.href = url;

      a.download = `bill_${id}.pdf`;

      a.click();

      window.URL.revokeObjectURL(url);

    },

    error: (err) => {
      console.log(err);
      alert("PDF download failed");
    }

  });

}

}
