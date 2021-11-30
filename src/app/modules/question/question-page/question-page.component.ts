
import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { MenuService } from 'src/app/service/menu.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  public name: string = "";
  public questionList: any[] =[];
  public currentQuestion: number = 0;
  public points: number = 0;
  public counter: number = 15;
  private interval$:any;
  public progress: string = '0';
  public done: boolean = false;
  public countQu: number = 0;
  public correctAnswer: number = 0;
  public inCorrectAnswer: number = 0;
  public incorrect: boolean = false;
  public start: boolean = false
  public questionType!: string;
  public menuType: any = [];
  public resultList: any = [];
  public showResult: boolean = false;
  constructor(
    private questionService: QuestionService,
    private menuService: MenuService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {

    this.getQueryParams()
    this.getMenuType()
    this.getQuestion()
    this.name = localStorage.getItem("name")!;
    this.startCounter();
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      this.questionType = params.type;
    })
  }

  getMenuType() {
    this.menuService.getAllmenu().subscribe(res => {
      const menuType = res.menuList.filter((menu: { type: string; }) => menu.type === this.questionType)
      this.menuType = menuType;
    })
  }
  getQuestion() {
    this.questionService.getQuestion().subscribe(res => {
      const allQuestion = res.questionList;
      const filteredQuestions = allQuestion.filter((question: { type: string; }) => question.type === this.questionType);
      // this.questionList = filteredQuestions.reduce((result: any[], item: any) => {
      //   const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
      //   if (!result?.includes(filteredQuestions[randomIndex]) && result?.length <= 10) {
      //     result.push(filteredQuestions[randomIndex]);
      //   }
      //   return result;
      // }, []);
      let i = 1;
      const result: any = [];
      let range = 10;
      while(i <= range) {
        let randomItem = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
        if (result?.length < 10) {
          range++;
          i++;
        }
        if (!result?.includes(randomItem)) {
          result.push(randomItem);
          i++;
        }
        this.questionList = result;
      }

    });
  }
  startCounter(){
    this.interval$ = interval(1000).subscribe(res => {
      this.counter--;
      if(this.counter === 0){
      this.inCorrectAnswer++;
        this.nextQuestion();
      }
      if(this.countQu === 10){
        this.counter = 0;
        this.stopCounter();

      }

    })
  }
  answered(question: any,currentQu: number,answer:any){
    if(answer.correct){
      this.correctAnswer++;
      this.resultList.push({"question":question?.question, "answer":answer.text, "isCorrect":true})
      setTimeout(() => {
        this.points+=10;
      this.nextQuestion();
      }, 500);
    }else{
      this.incorrect = true;
      this.resultList.push({"question":question?.question, "answer":answer.text, "isCorrect":false})
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.nextQuestion();
      }, 500);
    }
    console.log(this.resultList);

  }
  stopCounter(){
      this.interval$.unsubscrip();
  }
  getProgress(){
    this.progress = (this.countQu * 10).toString()
    return this.progress;
  }
  nextQuestion() {
    this.incorrect = false
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

  startAQuiz() {
    this.start = true;
  }

  quizAgain() {
    location.reload();
  }

  viewResult() {
    this.showResult = true;
  }
}
