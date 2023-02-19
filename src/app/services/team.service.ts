import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teamUrl: string = "http://localhost:3000/teams";
  constructor(private http: HttpClient) { }

  addTeam(teamObj) {
    return this.http.post<{msg:string,doc:any}>(this.teamUrl, teamObj);
  }
  //teamObj : newObject
  editTeam(teamObj) {
    return this.http.put(this.teamUrl, teamObj);
  }
  //Message (boolean , string)
  deleteTeamById(id) {
    return this.http.delete(`${this.teamUrl}/${id}`);
  }
  // object (response)

  getTeamById(id) {
    return this.http.get(`${this.teamUrl}/${id}`);
  }
  getAllTeams() {
    return this.http.get<{teams:any}>(this.teamUrl);
  }
}
