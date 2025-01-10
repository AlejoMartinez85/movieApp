import { Component, Input } from '@angular/core';
import { returnPosterUrl } from '../../domain/helpers/utils';
import { Actor } from '../../domain/interfaces/movie.interface';

@Component({
  selector: 'app-movie-cast',
  imports: [],
  templateUrl: './movie-cast.component.html',
  styleUrl: './movie-cast.component.scss'
})
export class MovieCastComponent {
  @Input()
  actor!: Actor;
  /**
   * function that allows to return the
   * path of the actor's image
   * @param profilePath
   * @returns
   */
  getActorImage(profilePath: string): string {
    return returnPosterUrl(profilePath)
  }
}
