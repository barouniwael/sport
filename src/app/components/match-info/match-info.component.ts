import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.css']
})
export class MatchInfoComponent implements OnInit {

  id: any;
  match: any;

  constructor( private activatedRoute:ActivatedRoute,private matchService:MatchService) { }

  ngOnInit() {
    //this.id = localStorage.getItem("matchInfoId");
    this.id =this.activatedRoute.snapshot.paramMap.get("x");
this.matchService.displayMatchById(this.id).subscribe((data)=>{
  this.match = data.match;
  console.log(this.match)
});
  //   let matches = JSON.parse(localStorage.getItem("matches") || "[]");
  //   for (let i = 0; i < matches.length; i++) {
  //     if (matches[i].id == this.id) {
  //       this.match = matches[i];
  //       break;
  //     }
  //   }
  }

}
