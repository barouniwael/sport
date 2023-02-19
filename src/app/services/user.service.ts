import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userUrl:string="http://localhost:3000";
  constructor(private http:HttpClient) { }
  //user :object {first name , last name , email , pwd ...}
  signup(user,img:File){
    let formData = new FormData();
    formData.append("firstName",user.firstName);
    formData.append("lastName",user.lastName);
    formData.append("email",user.email);
    formData.append("pwd",user.pwd);
    formData.append("img",img);
    return this.http.post<{message:string}>(this.userUrl + "/signup",formData);
  }
  // user :object {email , pwd}
  login(user){
    return this.http.post(this.userUrl+"/login",user);
  }
}
