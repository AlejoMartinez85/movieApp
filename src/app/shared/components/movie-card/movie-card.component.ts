import { Component, Input } from '@angular/core';
import { Movie } from '../../domain/interfaces/movie.interface';
import { returnPosterUrl } from '../../domain/helpers/utils';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { Router } from '@angular/router';
import { BASES_ROUTE } from '../../constants/constants';
import { MovieService } from '../../domain/services/movie.service';

@Component({
  selector: 'app-movie-card',
  imports: [TruncatePipe],
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
   *
   *
   */
  returnMoviePoster(): string {
    return returnPosterUrl(this.movie?.poster_path)
  }
  onHover(movie: Movie | any): void {
    this.hoveredMovie = movie; // Almacena la película al hover o resetea al salir
  }

  goToDetail(): void {
    if (this.movie?.id) this.movieService.setCurrentMovie = this.movie;
    this.router.navigateByUrl(`${BASES_ROUTE.HOME}/${this.movie?.id}`);
  }

}
