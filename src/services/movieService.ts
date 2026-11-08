import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const fetchMovies = async (query: string, page: number = 1): Promise<TMDBResponse> => {
  
  if (!query) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const config = {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };

  const response: AxiosResponse<TMDBResponse> = await axios.get<TMDBResponse>(BASE_URL, config);
  return response.data;
};
