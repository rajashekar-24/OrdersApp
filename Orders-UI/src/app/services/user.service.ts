import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
 

@Injectable({
  providedIn: 'root'
})

export class UserService {
  
  readonly url="http://localhost:3000/user";
  constructor(private http: HttpClient) { }

  login(user){
     return this.http.post(`http://localhost:3000/login`, user);
  }

  getUserById(id: String){
      return this.http.get(this.url+`/${id}`)
  }

  getUser(){
     return this.http.get(this.url);
  }

  postUser(user){
    return this.http.post(this.url,user);
  }

  putUser(user: User, id : String){
    return this.http.put(this.url+`/${id}`,user);
  }
  
  deleteUser(id: String){
    return this.http.delete(this.url+`/${id}`);
  }

}
