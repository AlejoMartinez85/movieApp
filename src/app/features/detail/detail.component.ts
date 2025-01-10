import { Component, OnInit, signal } from '@angular/core';
import { MovieService } from '../../shared/domain/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Actor, MovieDetail } from '../../shared/domain/interfaces/movie.interface';
import { formatMovieDuration, returnPosterUrl } from '../../shared/domain/helpers/utils';
import { MovieCastComponent } from '../../shared/components/movie-cast/movie-cast.component';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, throwError } from 'rxjs';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { BreadcrumbItem } from '../../shared/domain/interfaces/breadcrumb.interface';
import { CompanyCardComponent } from '../../shared/components/company-card/company-card.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ScrollTopComponent } from '../../shared/components/scroll-top/scroll-top.component';
import { ToastService } from '../../shared/domain/services/toast.service';

@Component({
  selector: 'app-detail',
  imports: [
      MovieCastComponent,
      CommonModule,
      BreadcrumbComponent,
      CompanyCardComponent,
      NgxSkeletonLoaderModule,
      ScrollTopComponent
    ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  movie = signal<MovieDetail>({
    adult: false,
    backdrop_path: '',
    belongs_to_collection: null,
    budget: 0,
    genres: [],
    homepage: '',
    id: 0,
    imdb_id: '',
    origin_country: [],
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  });
  movieCast = signal<Actor[]>([]);
  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Movies', url: '/movies' }
  ];
  /**
   * variable for show and hide skeleton screen
   */
  isLoadingSK = signal<boolean>(true);
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getMovieParams();
  }

  /**
   * function to obtain the query params and
   * to be able to consult the information of the selected movie.
  */
  getMovieParams(): void {
    this.route.params.subscribe((response: any) => {
      if (response.id) {
        this.getMovieInfo(response.id);
      }
    })
  }
  /**
   * function that receives the numerical
   * value of the duration of the film and
   * returns it with hours and minutes
   * @returns
   */
  returnMovieDuration(): string {
    return formatMovieDuration(this.movie().runtime)
  }

  /**
   * Function that consumes all the information
   * related to the selected film (detail and cast).
   * @param id
   */
  getMovieInfo(id: number): void {
    forkJoin({
      movieDetails: this.movieService.getMovieData(`${id}`),
      movieCredits: this.movieService.getMovieCast(`${id}`)
    }).pipe(
      catchError(error => {
        this.toastService.showToast(error, 'error');
        this.isLoadingSK.set(false);
        console.error('Error fetching movie data:', error);
        return throwError(() => error);
      })
    ).subscribe({
      next: ({ movieDetails, movieCredits }) => {
        this.movie.set(movieDetails);
        this.movieCast.set(movieCredits.cast);
        this.breadcrumbItems = [
          { label: 'Movies', url: '/movies' },
          { label: movieDetails.title }
        ];
        this.isLoadingSK.set(false);
      }
    });
  }

  /**
   * function that returns the full url
   * to fetch the image of the selected film
   * @returns
   */
  returnMoviePoster(): string {
    return returnPosterUrl(this.movie()?.poster_path)
  }
}
