import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  T: any = [
    { id: 1, date: "06/12/2022", title: "Title 1", description: "Description 1" },
    { id: 2, date: "05/12/2022", title: "Title 2", description: "Description 2" },
    { id: 3, date: "17/12/2021", title: "Title 3", description: "Description 3" },
    { id: 4, date: "10/12/2021", title: "Title 4", description: "Description 4" }
  ];
  constructor() { }

  ngOnInit() {
  }

}
