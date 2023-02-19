import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-matches-table',
  templateUrl: './matches-table.component.html',
  styleUrls: ['./matches-table.component.css']
})
export class MatchesTableComponent implements OnInit {
  matches: any = [];
  pageOfItems: Array<any>;
  constructor(private router: Router,private matchService:MatchService) { }

  ngOnInit() {
    // this.matches = JSON.parse(localStorage.getItem("matches") || "[]");
    this.getAllMatches();
  }
getAllMatches() {
  this.matchService.displayAllMatches().subscribe((data)=>this.matches=data.matches);

}
  goToDisplay(x) {
    // localStorage.setItem("matchInfoId",x)
    this.router.navigate([`matchInfo/${x}`]);
  }
  // supprimer
  deleteMatch(id) {
    this.matchService.deleteMatch(id).subscribe((data)=>{
     
    if (data.idDeleted) {
this.getAllMatches();
    }
    })
    // for (let i = 0; i < this.matches.length; i++) {
    //   if (this.matches[i].id == x) {
    //     this.matches.splice(i, 1);
    //     break;

    //   }

    // }
    // localStorage.setItem("matches", JSON.stringify(this.matches));
  }
  // Modifer 
  goToEdit(x) {
    this.router.navigate([`editMatch/${x}`])
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    }

}
