import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public counter: number = 20;
  private interval$:any;
  public progress: string = '0';
  public done: boolean = false;
  countQu: number = 0;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  incorrect: boolean = false;
  start: boolean = false
  notAllow!: boolean;
  questionType!: string;
  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getQueryParams()
    this.getQuestion()
    this.name = localStorage.getItem("name")!;
    this.startCounter();
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.questionType = params.type;
    })
  }

  getQuestion() {
    this.questionService.getQuestion().subscribe(res => {
      const allQuestion = res.questionList;
     this.questionList = allQuestion.filter((question: { type: string; }) => question.type === this.questionType)
    })
  }
  startCounter(){
    this.interval$ = interval(1000).subscribe(res => {
      this.counter--;
      if(this.counter === 0){
      this.inCorrectAnswer++;
        this.nextQuestion();
      }
      if(this.countQu === this.questionList.length){
        this.counter = 0;
        this.stopCounter();

      }

    })
  }
  answered(currentQu: number,answer:any){
    if(answer.correct){
      this.notAllow = true;
      this.correctAnswer++;
      setTimeout(() => {
        this.points+=10;
      this.nextQuestion();
      this.notAllow = false;
      }, 1000);
    }else{
      this.incorrect = true;
      this.notAllow = true;
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.nextQuestion();
        this.notAllow = false;
      }, 1000);
    }

  }
  stopCounter(){
      this.interval$.unsubscrip();
  }
  getProgress(){
    this.progress = (this.countQu * this.questionList.length).toString()
    return this.progress;
  }
  nextQuestion() {
    this.incorrect = false
    this.countQu = this.currentQuestion + 1;
    this.getProgress()
    this.counter = 20;
    if(this.currentQuestion < 9){
      this.currentQuestion++;
    }
    else{
      this.done = true;
    }
  }

  startAQuiz() {
    this.start = true;
  }
}
