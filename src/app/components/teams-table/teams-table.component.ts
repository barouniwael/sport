import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.css']
})
export class TeamsTableComponent implements OnInit {
  teams: any =[];
  id:any;
  constructor(private router:Router,private teamService:TeamService) { }

  ngOnInit() {
    // this.teams=JSON.parse(localStorage.getItem("teams")|| "[]");
    this.teamService.getAllTeams().subscribe((data)=>{this.teams=data.teams})
     ;
  }
  goTodisplay(id){
   this.router.navigate([`teaminfo/${id}`]);
  }
  
  goToEdit(id){
    this.router.navigate([`editTeam/${id}`]);
  }
  DeleteTeam(id){
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].id== id) {
       this.teams.splice(i,1);
       break;
       
      }
       
     }
   localStorage.setItem("teams",JSON.stringify(this.teams));
  }

}
