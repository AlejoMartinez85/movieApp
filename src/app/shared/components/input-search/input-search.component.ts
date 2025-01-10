import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  /**
   * ouputs and variables
   */
  @Output() search = new EventEmitter<string>();
  searchControl = new FormControl('');

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((value: string | any) => {
      this.search.emit(value);
    });
  }

  clearSearch(): void {
    this.searchControl.setValue('');
  }
}
