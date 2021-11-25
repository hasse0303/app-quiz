import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionPageComponent } from './question-page/question-page.component';
import { MaterialModule } from '../shared/material/material.module';
import { ChangeBgDirective } from '../directive/change-bg.directive';


@NgModule({
  declarations: [
    QuestionPageComponent,
    ChangeBgDirective
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MaterialModule,
  ]
})
export class QuestionModule { }
