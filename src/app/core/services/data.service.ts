import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // User data
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  // Questions data
  private questionsSubject = new BehaviorSubject<any[]>([]);
  public questions$ = this.questionsSubject.asObservable();

  // Loading state
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() { }

  // Set user data
  setUser(user: any): void {
    this.userSubject.next(user);
  }

  // Get current user value
  getCurrentUser(): any {
    return this.userSubject.value;
  }

  // Set questions data
  setQuestions(questions: any[]): void {
    this.questionsSubject.next(questions);
  }

  // Get current questions value
  getCurrentQuestions(): any[] {
    return this.questionsSubject.value;
  }

  // Set loading state
  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  // Clear all data (for logout)
  clearData(): void {
    this.userSubject.next(null);
    this.questionsSubject.next([]);
  }
}