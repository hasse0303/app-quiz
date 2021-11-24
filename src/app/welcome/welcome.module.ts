import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WelcomePageComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,

  ]
})
export class WelcomeModule { }
