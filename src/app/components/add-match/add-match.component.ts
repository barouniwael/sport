import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {

  match: any = {};
  matchForm: FormGroup;
  id: any;
  title: string = "Add Match";
  //module qui gére la route active (chemin)
  // param map ( chercher)
  constructor(private activatedRoute: ActivatedRoute
    , private router: Router,private matchService:MatchService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.title = "edit match";
      this.matchService.displayMatchById(this.id).subscribe((data)=>{
        this.match = data.match
      })
      
    }
    // if (this.id) {
    //   this.title = "Edit Match";
    //   //search object by 
    //   let matches = JSON.parse(localStorage.getItem("matches") || "[]");
 
    //   for (let i = 0; i < matches.length; i++) {
    //     if (matches[i].id == this.id) {
    //       //remplir le formulaire
    //       this.match = matches[i];
    //       break;
    //     }
    //   }
    // }
  }

  validateForm() {
  //  let matches = JSON.parse(localStorage.getItem("matches") || "[]");
    if (this.id) {
      //Editting Match
      // for (let i = 0; i < matches.length; i++) {
      //   if (matches[i].id == this.id) {
      //     matches[i] = this.match;
      //     break;

      //   }
      // }
      this.matchService.editMatch(this.match).subscribe(()=>
      this.router.navigate(['admin'])
      )
    }

    else{
      //Adding Match
    // let matchId = JSON.parse(localStorage.getItem("matchId") || "1");
    // let matches = JSON.parse(localStorage.getItem("matches") || "[]");
    // this.match.id = matchId;
    // matches.push(this.match);
    // localStorage.setItem("matchId", matchId + 1);
    // localStorage.setItem("matches", JSON.stringify(matches));
    this.matchService.addMatch(this.match).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['admin']);
    });
  }

}
}
