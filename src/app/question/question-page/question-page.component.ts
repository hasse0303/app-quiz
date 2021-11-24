import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  name: string = "";
  questionList: any[] =[];
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter: number = 15;
  private interval$:any;
  public progress: string = '0'
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestion()
    this.name = localStorage.getItem("name")!;
    this.startCounter();
    if(this.currentQuestion > 10){
      this.stopCounter()
    }
  }

  getAllQuestion() {
    this.questionService.getQuestion().subscribe(res => {
      this.questionList = res.questionList;
    })
  }
  startCounter(){
    this.interval$ = interval(1000).subscribe(res => {
      this.counter--;
      if(this.counter === 0){
        this.currentQuestion++;
        this.counter = 15;
        this.getProgress();
      }

    })
  }
  answered(currentQu: number,answer:any){
    if(answer.correct){
      this.points+=10;
      this.currentQuestion++;
    }else{
      this.currentQuestion++;
    }

  }
  stopCounter(){
      this.interval$.unSubscrip();
  }
  getProgress(){
    this.progress = (this.currentQuestion * 10).toString()

  }
}
