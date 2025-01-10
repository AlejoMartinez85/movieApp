import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductionCompany } from '../../domain/interfaces/movie.interface';
import { returnPosterUrl } from '../../domain/helpers/utils';

@Component({
  selector: 'app-company-card',
  imports: [CommonModule],
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss'
})
export class CompanyCardComponent {
  @Input()
  company!: ProductionCompany;
  /**
   *  function allowing to return the
   *  full url for the production company image
   * @returns
   */
  getCompanyImage(): string {
    const path = this.company && this.company.logo_path ? this.company.logo_path : undefined;
    return returnPosterUrl(path);
  }
}
