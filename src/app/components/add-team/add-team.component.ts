import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  team: any = {};
  teamForm:FormGroup;
  title:string="Add Team";
  id:any;
  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,private teamService:TeamService) { }

  ngOnInit() {
   
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.title = "Edit Team";
      //search object by 
      let teams = JSON.parse(localStorage.getItem("teams") || "[]");
 
      for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == this.id) {
          //remplir le formulaire
          this.team = teams[i];
          break;
        }
      }
    }
  }
  addTeam() {
    let teams = JSON.parse(localStorage.getItem("teams") || "[]");
    if (this.id) {
     
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == this.id) {
          teams[i] = this.team;
          break;

        }
      }
    }

    else{
    
      this.teamService.addTeam(this.team).subscribe((data)=>console.log(data))
    // let teamId = JSON.parse(localStorage.getItem("teamId") || "1");
    // let teams = JSON.parse(localStorage.getItem("teams") || "[]");
    // this.team.id = teamId;
    // teams.push(this.team);
    // localStorage.setItem("teamId", teamId + 1);
    
  }
  localStorage.setItem("teams", JSON.stringify(teams));
  this.router.navigate(['admin']);

}}
