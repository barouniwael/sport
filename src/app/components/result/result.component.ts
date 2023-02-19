import { Component, Input, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  // A : parametre
  @Input() A: any;
  @Output () newMatches:EventEmitter <any> = new EventEmitter();

  constructor() { }

  ngOnInit(){
   
  }

  scoreColor(x,y){
    if (x>y) {
      return "green" ;
      
    } else if (x<y) {
      return "red";
      
    } else {
      return "blue";   
    }
  }
  deleteMatch(id) {
    //alert(id);
    let matches=JSON.parse(localStorage.getItem("matches")||"[]");
    for (let i = 0; i < matches.length; i++) {
      if (matches[i].id == id) {
        matches.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("matches", JSON.stringify(matches));
    this.newMatches.emit(matches);
  }
}
