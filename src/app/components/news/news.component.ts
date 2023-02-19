import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  T: any = [
    { id: 1, title: "Title 1", author: "Author 1", date: "06/12/22", img: "assets/images/img_1.jpg", avatar: "assets/images/person_1.jpg" },
    { id: 2, title: "Title 2", author: "Author 2", date: "26/12/22", img: "assets/images/img_2.jpg", avatar: "assets/images/person_2.jpg" },
    { id: 3, title: "Title 3", author: "Author 3", date: "16/12/22", img: "assets/images/img_3.jpg", avatar: "assets/images/person_3.jpg" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
