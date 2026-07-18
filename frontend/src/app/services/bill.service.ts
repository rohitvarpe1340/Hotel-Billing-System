import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  api='http://localhost:5000/api/bills';

 constructor(private http:HttpClient){}

 generateBill(data:any){
   return this.http.post(
    `${this.api}/generate`,
    data
   );
 }

 getHistory(){
   return this.http.get(
    `${this.api}/history`
   );
 }

 downloadBill(id: number) {
  return this.http.get(
    `http://localhost:5000/api/bills/download/${id}`,
    { responseType: 'blob' }
  );
}


}
