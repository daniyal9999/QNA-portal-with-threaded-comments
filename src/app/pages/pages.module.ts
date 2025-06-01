import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { QuestionsListComponent } from './questions/questions-list/questions-list.component';
import { AskQuestionComponent } from './questions/ask-question/ask-question.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { PrimeNgModule } from '../shared/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    SingupComponent,
    QuestionsListComponent,
    AskQuestionComponent,
    QuestionDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
  ],
  exports: [
    LandingComponent,
    LoginComponent,
    SingupComponent,
    QuestionsListComponent,
    AskQuestionComponent,
    QuestionDetailComponent,
  ],
})
export class PagesModule {}
