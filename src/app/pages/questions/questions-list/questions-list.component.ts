import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  id: number;
  title: string;
  body: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  askedBy: string;
  askedDate: Date;
}

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  questions: Question[] = [];
  loading: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulate loading data
    setTimeout(() => {
      this.questions = this.getFakeQuestions();
      this.loading = false;
    }, 1000);
  }

  getFakeQuestions(): Question[] {
    return [
      {
        id: 1,
        title: 'How to implement authentication in Angular?',
        body: 'I am building an Angular application and need to implement user authentication. What is the best approach?',
        tags: ['angular', 'authentication', 'typescript'],
        votes: 15,
        answers: 3,
        views: 120,
        askedBy: 'john_doe',
        askedDate: new Date('2023-10-15'),
      },
      {
        id: 2,
        title: 'Understanding RxJS Observables in Angular',
        body: 'I am having trouble understanding how Observables work in Angular. Can someone explain the basics?',
        tags: ['angular', 'rxjs', 'javascript'],
        votes: 23,
        answers: 5,
        views: 230,
        askedBy: 'jane_smith',
        askedDate: new Date('2023-10-10'),
      },
      {
        id: 3,
        title: 'How to use PrimeNG DataTable with server-side pagination?',
        body: 'I want to implement server-side pagination with PrimeNG DataTable. What is the correct approach?',
        tags: ['primeng', 'angular', 'pagination'],
        votes: 8,
        answers: 2,
        views: 95,
        askedBy: 'dev_guru',
        askedDate: new Date('2023-10-05'),
      },
      {
        id: 4,
        title: 'Best practices for Angular component design',
        body: 'What are the best practices for designing reusable components in Angular?',
        tags: ['angular', 'components', 'design-patterns'],
        votes: 31,
        answers: 7,
        views: 320,
        askedBy: 'angular_fan',
        askedDate: new Date('2023-09-28'),
      },
      {
        id: 5,
        title: 'How to handle form validation in Angular?',
        body: 'I need to implement complex form validation in my Angular application. What approaches should I consider?',
        tags: ['angular', 'forms', 'validation'],
        votes: 19,
        answers: 4,
        views: 180,
        askedBy: 'form_master',
        askedDate: new Date('2023-09-20'),
      },
    ];
  }

  viewQuestion(id: number): void {
    this.router.navigate(['/questions', id]);
  }

  askQuestion(): void {
    this.router.navigate(['/questions/ask']);
  }
}
