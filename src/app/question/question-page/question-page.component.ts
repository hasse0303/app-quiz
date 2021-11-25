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
  public progress: string = '0';
  public done: boolean = false;
  countQu: number = 0;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestion()
    this.name = localStorage.getItem("name")!;
    this.startCounter();

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
        this.nextQuestion();
      }
      if(this.countQu === 10){
        this.counter = 0;
        this.stopCounter();

      }

    })
  }
  answered(currentQu: number,answer:any){
    if(answer.correct){
      this.correctAnswer++;
      setTimeout(() => {
        this.points+=10;
      this.nextQuestion();
      }, 1000);
    }else{
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.nextQuestion();
      }, 1000);
    }

  }
  stopCounter(){
      this.interval$.unsubscrip();
  }
  getProgress(){
    this.progress = (this.countQu * 10).toString()
    return this.progress;
  }
  nextQuestion() {
    this.countQu = this.currentQuestion + 1;
    this.getProgress()
    this.counter = 15;
    if(this.currentQuestion < 9){
      this.currentQuestion++;
    }
    else{
      this.done = true;
    }

  }
}
