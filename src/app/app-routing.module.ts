import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SingupComponent } from './pages/singup/singup.component';
import { QuestionsListComponent } from './pages/questions/questions-list/questions-list.component';
import { AskQuestionComponent } from './pages/questions/ask-question/ask-question.component';
import { QuestionDetailComponent } from './pages/questions/question-detail/question-detail.component';
import { authGuard } from './core/auth/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
  { path: 'questions', component: QuestionsListComponent },
  {
    path: 'questions/ask',
    component: AskQuestionComponent,
    //canActivate: [authGuard],
  },
  {
    path: 'questions/:id',
    component: QuestionDetailComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
