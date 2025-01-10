import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbItem } from '../../domain/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  standalone: true
})
export class BreadcrumbComponent {
  @Input() breadcrumbList: BreadcrumbItem[] = [];
}
