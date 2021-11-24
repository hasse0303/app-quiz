import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  name: string = "";
  questionList: any[] =[];
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestion()
    this.name = localStorage.getItem("name")!;
  }

  getAllQuestion() {
    this.questionService.getQuestion().subscribe(res => {
      this.questionList = res.questionList;
    })
  }
}
