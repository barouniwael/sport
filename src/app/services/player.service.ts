import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
playerUrl :string="http://localhost:3000/players";
  constructor(private http:HttpClient) { }
  addPlayer(playerObj,img:File){
  
    
    let formData = new FormData();
    formData.append("name",playerObj.name);
    formData.append("position",playerObj.position);
    formData.append("nbr",playerObj.nbr);
    formData.append("age",playerObj.age);
    formData.append("img",img);
    return this.http.post<{msg:string,doc:any}>(this.playerUrl,formData);
  }
  editPlayer(playerObj){
    return this.http.put(this.playerUrl,playerObj);
  }
  deletePlayer(id){
    return this.http.delete(`${this.playerUrl}/${id}}`);
  }
  displayPlayerById(id){
    return this.http.get(`${this.playerUrl}/${id}`);
  }
  getAllPlayers(){
    return this.http.get<{players:any}>(this.playerUrl);
  }
}
