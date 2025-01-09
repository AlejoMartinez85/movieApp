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
      debounceTime(2000),
      distinctUntilChanged()
    ).subscribe((value: string | any) => {
      console.log('value in input_ ', value);
      this.search.emit(value); // Emitir valor después de 2 segundos
    });
  }
}
