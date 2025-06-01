import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { DataService } from '../../core/services/data.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  loading = false;

  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    // Example of using the services
    this.dataService.setLoading(true);

    // Example of HTTP service usage (commented out since it's just for demonstration)
    /*
    this.httpService.get<any[]>('/questions/featured').subscribe({
      next: (data) => {
        this.dataService.setQuestions(data);
        this.dataService.setLoading(false);
        this.toastService.showSuccess('Welcome!', 'Successfully loaded featured questions');
      },
      error: (error) => {
        console.error('Error fetching featured questions:', error);
        this.dataService.setLoading(false);
        this.toastService.showError('Error', 'Failed to load featured questions');
      }
    });
    */

    // For demo purposes, just show a welcome toast
    setTimeout(() => {
      this.loading = false;
      this.dataService.setLoading(false);
      this.toastService.showInfo(
        'Welcome to QnA App',
        'Your knowledge sharing platform'
      );
    }, 1000);
  }
}
