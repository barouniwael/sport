import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {
players:any=[];
constructor( private router:Router,private playerService:PlayerService) { }

  ngOnInit() {
    // this.players=JSON.parse(localStorage.getItem("players")||"[]");
    this.playerService.getAllPlayers().subscribe((data)=>this.players = data.players)
  }
  goToEditPlayer(id){
    this.router.navigate([`editPlayer/${id}`]);
   
  }
  
deletePlayer(id){
  for (let i = 0; i < this.players.length; i++) {
    if (this.players[i].id== id) {
     this.players.splice(i,1);
     break;
     
    }
     
   }
 localStorage.setItem("players",JSON.stringify(this.players));
}
}

