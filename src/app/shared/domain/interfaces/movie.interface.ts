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
