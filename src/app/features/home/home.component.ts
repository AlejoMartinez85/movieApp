import { Component, OnInit, signal } from '@angular/core';
import { Movie, PaginatedResponse, ViewMode } from '../../shared/domain/interfaces/movie.interface';
import { MovieService } from '../../shared/domain/services/movie.service';
import { InputSearchComponent } from '../../shared/components/input-search/input-search.component';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ScrollTopComponent } from '../../shared/components/scroll-top/scroll-top.component';
import { ToastService } from '../../shared/domain/services/toast.service';

@Component({
  selector: 'app-home',
  imports: [
    InputSearchComponent,
    MovieCardComponent,
    CommonModule,
    NgbPaginationModule,
    NgxSkeletonLoaderModule,
    ScrollTopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  movieList = signal<Movie[]>([]);
  currentPage = signal(1); // Página actual
  pageSize = signal(20);
  totalResutls = signal(0); // Total de páginas disponibles
  hasSearched = signal<boolean>(false);
  currentQuery: string = '';
  notFound: string = 'https://robohash.org/404';
  /**
   * variable for show and hide skeleton screen
   */
  isLoadingSK = signal<boolean>(false);
  viewMode = signal<ViewMode>(ViewMode.POPULAR);

  constructor(private movieService: MovieService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.getPopularMovies();
  }
  /**
   *  function to get the value the user
   *  typed in the input search
   * @param query
   */
  getQueryValue(event: string | any): void {
    const query: string = event.trim();
    if (!query) {
      this.resetSearch();
    } else {
      this.searchMovies(query);
    }
  }
  /**
   * function for get popular movies
   * @param page
   */
  getPopularMovies(page: number = 1): void {
    this.isLoadingSK.set(true);
    this.viewMode.set(ViewMode.POPULAR);
    this.movieService.getPopularMovies(page).subscribe({
      next: (response: PaginatedResponse) => {
        this.movieList.set(response.results);
        this.hasSearched.set(true);
        this.currentPage.set(response.page);
        this.totalResutls.set(response.total_results);
        this.hasSearched.set(true);
        this.pageSize.set(response.results.length || 20);
        this.isLoadingSK.set(false);
      },
      error: (err) => {
        this.toastService.showToast(err, 'error');
        this.isLoadingSK.set(false);
      }
    })
  }
  /**
   * Search function for films by title
   * @param query
   * @param page
   */
  searchMovies(query: string, page: number = 1): void {
    this.isLoadingSK.set(true);
    this.currentQuery = query;
    this.viewMode.set(ViewMode.SEARCH);
    this.movieService.searchMovies(query, page).subscribe(
      {
        next: (response: PaginatedResponse) => {
          this.movieList.set(response.results);
          this.currentPage.set(response.page);
          this.totalResutls.set(response.total_results);
          this.hasSearched.set(true);
          this.pageSize.set(response.results.length || 20);
          this.isLoadingSK.set(false);
        },
        error: (err) => {
          console.log(err);
          this.toastService.showToast(err, 'error');
          this.isLoadingSK.set(false);
        },
      }
    );
  }
  /**
   * function used to reset all values
   * when the value to be fetched is empty
   */
  resetSearch(): void {
    this.movieList.set([]);
    this.currentPage.set(1);
    this.totalResutls.set(0);
    this.pageSize.set(20);
    this.hasSearched.set(false);
    this.currentQuery = '';
    this.getPopularMovies();
  }
  /**
   * function that allows scrolling to the top
   * of the page each time the pager is made.
   */
  scrollUp(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  /**
   * function to receive the value emitted by the pager
   * and thus know which function to query depending on
   * the view mode
   * @param page
   */
  onPageChange(page: number) {
    this.currentPage.set(page);
    this.scrollUp();
    if (this.viewMode() === ViewMode.POPULAR) {
      this.getPopularMovies(page);
    } else {
      this.searchMovies(this.currentQuery, page);
    }
  }
}
