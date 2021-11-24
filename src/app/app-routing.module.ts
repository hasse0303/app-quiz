import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome/welcome-page/welcome-page.component';
import { WelcomeModule } from './welcome/welcome.module';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch:'full'},
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./question/question.module').then(m => m.QuestionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
