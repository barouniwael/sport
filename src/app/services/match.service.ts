import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//décorateur specificique de service 
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  //matchUrl:backend Server Url 
  matchUrl: string = "http://localhost:3000/matches";
  //http : module that sends request
  constructor(private http: HttpClient) { }

  addMatch(matchObj){
    return this.http.post<{msg:string, match:any}> (this.matchUrl , matchObj);
  }
  editMatch(newObj) {
    return this.http.put<{msg:string}>(this.matchUrl, newObj);
  }
  deleteMatch(id) {
    return this.http.delete<{msg:string,idDeleted:boolean}>(`${this.matchUrl}/${id}`);
  }
  displayMatchById(id) {
    return this.http.get<{match:any,msg:string}>(`${this.matchUrl}/${id}`);
  }
  displayAllMatches() {
    return this.http.get<{matches:any,msg:string}>(this.matchUrl);
  }
  searchMatchByTeamOne(teamOne) {
  return this.http.get(`${this.matchUrl}/${teamOne}`);
  }
}
