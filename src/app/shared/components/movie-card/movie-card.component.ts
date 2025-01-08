import { Component, Input } from '@angular/core';
import { Movie } from '../../domain/interfaces/movie.interface';
import { returnPosterUrl } from '../../domain/helpers/utils';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-movie-card',
  imports: [TruncatePipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  @Input() movie: Movie | undefined;
  hoveredMovie: any = null; // Almacena la película actualmente enfocada


  /**
   *
   * @returns
   */
  returnMoviePoster(): string {
    return returnPosterUrl(this.movie?.poster_path)
  }


  onHover(movie: any): void {
    this.hoveredMovie = movie; // Almacena la película al hover o resetea al salir
  }

}
