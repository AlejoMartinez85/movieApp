export interface Movie {
  adult: boolean; // Indica si la película es para adultos
  backdrop_path: string; // Ruta de la imagen de fondo
  genre_ids: number[]; // Array con los IDs de los géneros
  id: number; // ID único de la película
  original_language: string; // Idioma original de la película
  original_title: string; // Título original
  overview: string; // Resumen de la película
  popularity: number; // Índice de popularidad
  poster_path: string; // Ruta de la imagen del póster
  release_date: string; // Fecha de lanzamiento (formato YYYY-MM-DD)
  title: string; // Título de la película
  video: boolean; // Indica si tiene un video asociado
  vote_average: number; // Promedio de votos
  vote_count: number; // Número total de votos
}

export interface PaginatedResponse {
  page: number;           // Número de página actual
  results: Movie[];           // Array genérico para los resultados
  total_pages: number;    // Número total de páginas
  total_results: number;  // Número total de resultados
}

/**
 *  response when the user get movie
 */

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  gender: number;
  popularity: number;
  cast_id: number;
  credit_id: string;
  order: number;
  adult: boolean;
  known_for_department: string;
  original_name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
