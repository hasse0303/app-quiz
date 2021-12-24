
import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { Answer, Question } from 'src/app/model/question';
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
  public counter: number = 20;
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
  indeterminate: boolean = false;
  checked: boolean = false;
  corrAnswerList: any[] = [];
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
  answered(question: Question,answer:Answer){
    if(answer.correct){
      this.correctAnswer++;
      this.resultList.push({"question":question?.question, "answered":answer.text, "isCorrect":true})
      setTimeout(() => {
        this.points+=10;
      this.nextQuestion();
      }, 500);
    }else{
      this.incorrect = true;
      const correctAn = question?.answer?.find((ans:Answer) => ans.correct);
      this.resultList.push({"question":question?.question, "answered":answer.text,"correctAnswer": correctAn,"isCorrect":false})
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.nextQuestion();
      }, 500);
    }

  }
  // isIndeterminate(): boolean{
  //   return this.incorrect ? true : false;
  // }

  // isChecked(): boolean{
  //   return this.incorrect ? false : true;
  // }
  stopCounter(){
      this.interval$.unsubscribe();
  }
  getProgress(){
    this.progress = (this.countQu * 10).toString()
    return this.progress;
  }
  nextQuestion() {
    this.indeterminate = false
    this.checked = false
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
    this.startCounter();
  }

  quizAgain() {
    location.reload();
  }
  backFromView(){
    this.showResult = false;
    this.done = true;
  }

  viewResult() {
    this.showResult = true;
    this.getCorrectAnswer()
  }

  getCorrectAnswer(){
    this.corrAnswerList = this.questionList.map(que => que.answer.filter((correctAn: { correct: boolean; }) => correctAn.correct === true))
  }
}
