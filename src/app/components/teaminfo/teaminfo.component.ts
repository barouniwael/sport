import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teaminfo',
  templateUrl: './teaminfo.component.html',
  styleUrls: ['./teaminfo.component.css']
})
export class TeaminfoComponent implements OnInit {
id:any;
team:any;
  constructor( private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id =this.activatedRoute.snapshot.paramMap.get("id");

    let teams = JSON.parse(localStorage.getItem("teams") || "[]");
    for (let i = 0; i < teams.length; i++) {
      if (teams[i].id == this.id) {
        this.team = teams[i];
        break;
      }
    }
  }

}
