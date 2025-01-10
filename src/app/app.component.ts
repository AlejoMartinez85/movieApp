import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastMessage } from './shared/domain/interfaces/toast.interface';
import { ToastService } from './shared/domain/services/toast.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbToastModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  toastMessages: ToastMessage[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.getToastMessages().subscribe(toasts => {
      this.toastMessages = toasts;
    });
  }

  dismissToast(message: string) {
    this.toastService.dismissToast(message);
  }
}
