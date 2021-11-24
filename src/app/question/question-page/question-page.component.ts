import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  name: string = "";
  constructor() { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
  }

}
