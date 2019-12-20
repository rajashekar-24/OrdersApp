import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  readonly url = 'http://localhost:3000/order';
  orders : Order[];

  constructor(private http: HttpClient) { }
  

  getOrder(){
    return this.http.get(this.url);
  }

  postOrder(order: Order){
     return this.http.post(this.url,order)
  }

  putOrder(order:Order, id:string){
     return this.http.put(this.url+`/${id}`,order);
  }

  deleteOrder(id : string){
     return this.http.delete(this.url+`/${id}`)
  }


}
