import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  api='http://localhost:5000/api/menu';

 constructor(private http:HttpClient){}

 getMenu(){
   return this.http.get(this.api);
 }

 addMenu(data:any){
   return this.http.post(this.api,data);
 }

 updateMenu(id:number,data:any){
   return this.http.put(
    `${this.api}/${id}`,
    data
   );
 }

 deleteMenu(id:number){
   return this.http.delete(
    `${this.api}/${id}`
   );
 }
}
