import { Component, signal } from '@angular/core';
import { Movie, PaginatedResponse } from '../../shared/domain/interfaces/movie.interface';
import { MovieService } from '../../shared/domain/services/movie.service';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  imports: [InputSearchComponent, MovieCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  movieList = signal<Movie[]>([]);
  currentPage = signal(1); // Página actual
  totalPages = signal(0); // Total de páginas disponibles

  constructor(private movieService: MovieService) {}
  /**
   *
   * @param query
   */
  searchMovies(query: string): void {
    this.movieService.searchMovies(query).subscribe(
      {
        next: (response: PaginatedResponse) => {
          console.log('movies response: ', response);
        },
        error: (err) => console.error(err),
      }
    );
  }
}
