import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { HttpService } from '../../../core/services/http.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit {
  questionForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.questionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(15)]],
      body: ['', [Validators.required, Validators.minLength(30)]],
      tags: ['', Validators.required],
    });
  }

  // Getter for easy access to form fields
  get f(): { [key: string]: AbstractControl } {
    return this.questionForm.controls;
  }

  submitQuestion(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.questionForm.invalid) {
      this.toastService.showWarn(
        'Form Error',
        'Please fix the errors in the form before submitting'
      );
      return;
    }

    this.loading = true;

    // In a real app, this would be an API call
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Simulate successful submission
      const formData = this.questionForm.value;

      // Format the body text with paragraphs
      const formattedBody = formData.body
        .split('\n\n')
        .map((paragraph: string) => `<p>${paragraph}</p>`)
        .join('');

      // Parse tags from comma-separated string to array
      const tagsArray = formData.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      // Create a new question object
      const newQuestion = {
        id: Math.floor(Math.random() * 1000) + 100,
        title: formData.title,
        body: formattedBody,
        tags: tagsArray,
        votes: 0,
        answers: 0,
        views: 0,
        askedBy: 'current_user', // Would come from auth service
        askedDate: new Date(),
      };

      console.log('New question:', newQuestion);

      this.loading = false;

      // Show success toast
      this.toastService.showSuccess(
        'Question Posted',
        'Your question has been successfully posted'
      );

      // Navigate to the questions list
      this.router.navigate(['/questions']);
    }, 1000);

    // Example of how to use the HTTP service (commented out for now)
    /*
    this.httpService.post<any>('/questions', this.questionForm.value).subscribe({
      next: (response) => {
        this.loading = false;
        this.toastService.showSuccess('Question Posted', 'Your question has been successfully posted');
        this.router.navigate(['/questions']);
      },
      error: (error) => {
        this.loading = false;
        this.toastService.showError('Error', 'Failed to post your question. Please try again.');
        console.error('Error posting question:', error);
      }
    });
    */
  }
}
