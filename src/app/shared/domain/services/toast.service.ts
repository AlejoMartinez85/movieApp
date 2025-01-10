import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage } from '../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toasts = new BehaviorSubject<ToastMessage[]>([]);

  getToastMessages() {
    return this.toasts.asObservable();
  }

  showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
    const currentToasts = this.toasts.getValue();
    this.toasts.next([...currentToasts, { text: message, type }]);
    setTimeout(() => this.dismissToast(message), 5000);
  }

  dismissToast(message: string) {
    const currentToasts = this.toasts.getValue();
    this.toasts.next(currentToasts.filter(toast => toast.text !== message));
  }
}
