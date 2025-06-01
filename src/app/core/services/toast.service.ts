import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private messageService: MessageService) { }

  // Success toast
  showSuccess(summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
      life: life
    });
  }

  // Info toast
  showInfo(summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity: 'info',
      summary: summary,
      detail: detail,
      life: life
    });
  }

  // Warning toast
  showWarn(summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity: 'warn',
      summary: summary,
      detail: detail,
      life: life
    });
  }

  // Error toast
  showError(summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      life: life
    });
  }

  // Clear all toasts
  clear(): void {
    this.messageService.clear();
  }
}