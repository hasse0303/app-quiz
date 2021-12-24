
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { Answer, Question } from 'src/app/model/question';
import { MenuService } from 'src/app/service/menu.service';
import { QuestionService } from 'src/app/service/question.service';
import { AppLoaderService } from 'src/app/shared/app-loader/app-loader.service';

import { finalize } from 'rxjs/operators';

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
  hasAnswer!: boolean;
  constructor(
    private questionService: QuestionService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private loader: AppLoaderService
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
    this.loader.open()
    this.questionService.getQuestion()
    .subscribe(res => {
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
        setTimeout(() => {
          this.loader.close()
        }, 1000);
      }

    });
  }
  startCounter(){
    this.interval$ = interval(1000).subscribe(res => {
      this.counter--;
      if(this.counter === 0){
      this.inCorrectAnswer++;
        this.nextQuestion(this.hasAnswer);
      }
      if(this.countQu === 10){
        this.counter = 0;
        this.stopCounter();

      }

    })
  }
  answered(question: Question,answer:Answer){
    this.hasAnswer = true;
    if(answer.correct){
      this.correctAnswer++;
      this.resultList.push({"question":question?.question, "answered":answer.text, "isCorrect":true})
      setTimeout(() => {
        this.points+=10;
      this.nextQuestion(this.hasAnswer);
      }, 500);
    }else{
      this.incorrect = true;
      const correctAn = question?.answer?.find((ans:Answer) => ans.correct);
      this.resultList.push({"question":question?.question, "answered":answer.text,"correctAnswer": correctAn,"isCorrect":false})
      this.inCorrectAnswer++;
      setTimeout(() => {
        this.nextQuestion(this.hasAnswer);
      }, 500);
    }

  }
  stopCounter(){
      this.interval$.unsubscribe();
  }
  getProgress(){
    this.progress = (this.countQu * 10).toString()
    return this.progress;
  }
  nextQuestion(hasAnswer?:boolean, question?:Question) {
    if(!hasAnswer){
      this.resultList.push({message: 'You are not answer!'});
      console.log(this.resultList);

    }
    this.indeterminate = false
    this.checked = false
    this.incorrect = false
    this.hasAnswer = false
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
