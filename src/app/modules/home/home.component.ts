import { Component, signal } from '@angular/core';
import { Movie, PaginatedResponse } from '../../shared/domain/interfaces/movie.interface';
import { MovieService } from '../../shared/domain/services/movie.service';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  imports: [InputSearchComponent, MovieCardComponent, CommonModule, NgbPaginationModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movieList = signal<Movie[]>([]);
  currentPage = signal(1); // Página actual
  pageSize = signal(20);
  totalResutls = signal(0); // Total de páginas disponibles
  hasSearched = signal<boolean>(false);
  currentQuery: string = '';

  constructor(private movieService: MovieService) {}
  /**
   *
   * @param query
   */

  getQueryValue(event: string | any): void {
    const query: string = event.trim();
    console.log('query Value: ', event);
    if (!query) {
      this.resetSearch();
    } else {
      this.searchMovies(query);
    }
  }
  searchMovies(query: string, page: number = 1): void {
    console.log('query: ', query);
    console.log('page: ', page);
    console.log('-----------------------------');

    this.currentQuery = query;
    this.movieService.searchMovies(query, page).subscribe(
      {
        next: (response: PaginatedResponse) => {
          console.log('movies response: ', response);
          this.movieList.set(response.results);
          this.currentPage.set(response.page);
          this.totalResutls.set(response.total_results);
          this.hasSearched.set(true);
          this.pageSize.set(response.results.length || 20);
        },
        error: (err) => console.error(err),
      }
    );
  }

  resetSearch(): void {
    this.movieList.set([]);
    this.currentPage.set(1);
    this.totalResutls.set(0);
    this.pageSize.set(20);
    this.hasSearched.set(false);
    this.currentQuery = '';
  }
  /**
   *
   * @param page
   */
  onPageChange(page: number) {
    console.log('page: ', page);
    console.log('//////////////');

    this.currentPage.set(page);
    this.searchMovies(this.currentQuery , this.currentPage());
  }
}
