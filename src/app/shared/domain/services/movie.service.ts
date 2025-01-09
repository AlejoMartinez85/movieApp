import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { constants } from '../../constants/constants';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = constants.api.path;
  private currentMovie: Movie = {
    adult: false,
    backdrop_path: '',
    genre_ids: [],
    id: 0,
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    release_date: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0
  };
  constructor(private http: HttpClient) { }

  get getCurrentMovie() {
    return this.currentMovie;
  }

  set setCurrentMovie(movieSelected: Movie) {
    this.currentMovie = movieSelected;
  }

  resetCurrentMovie(): void {
    this.currentMovie = {
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      id: 0,
      original_language: '',
      original_title: '',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '',
      title: '',
      video: false,
      vote_average: 0,
      vote_count: 0
    };
  }
  /**
   *
   * @param query
   * @param page
   * @returns
   */
  // Método para buscar películas
  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener datos de una película por ID
  getMovieData(id: string): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getMovieCast(id: string): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/credits?language=en-US`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado.';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
