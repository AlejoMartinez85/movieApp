import { Component, Input } from '@angular/core';
import { Movie } from '../../domain/interfaces/movie.interface';
import { returnPosterUrl } from '../../domain/helpers/utils';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { Router } from '@angular/router';
import { BASES_ROUTE } from '../../constants/constants';
import { MovieService } from '../../domain/services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  imports: [TruncatePipe, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

  constructor(
    private router: Router,
    private movieService: MovieService
  ) {}
  @Input() movie: Movie | undefined;
  hoveredMovie: Movie| any = null; // Almacena la película actualmente enfocada
  /**
   * function that returns the full url
   * to fetch the image of the selected film
   * @returns
   */
  returnMoviePoster(): string {
    return returnPosterUrl(this.movie?.poster_path)
  }
  /**
   * function allowing to display the
   * synopsis of the film when hove over its container
   * @param movie
   */
  onHover(movie: Movie | any): void {
    this.hoveredMovie = movie; // Almacena la película al hover o resetea al salir
  }
  /**
   * function that allows to navigate
   * to the detail of the selected film
   */
  goToDetail(): void {
    this.router.navigateByUrl(`${BASES_ROUTE.HOME}/${this.movie?.id}`);
  }

}
