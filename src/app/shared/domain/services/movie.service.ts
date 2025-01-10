import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = constants.api.path;

  constructor(private http: HttpClient) { }

  /**
   * service to bring popular films to you
   * @param page
   * @returns
   */
  getPopularMovies(page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?language=en-US&page=${page}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * service to bring you the films filtered by title
   * @param query
   * @param page
   * @returns
   */
  searchMovies(query: string, page: number = 1): Observable<any> {
    const url = `${this.baseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * service that provides detailed
   * information on the selected film
   * @param id
   * @returns
   */
  getMovieData(id: string): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * service that brings the cast
   * information of the selected movie
   * @param id
   * @returns
   */
  getMovieCast(id: string): Observable<any> {
    const url = `${this.baseUrl}/movie/${id}/credits?language=en-US`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * function to handle the error that
   * may be returned by the services
   * @param error
   * @returns
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
