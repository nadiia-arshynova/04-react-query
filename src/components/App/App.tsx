import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import './App.module.css';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearchSubmit = async (query: string): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      

      const data = await fetchMovies(query);

      
      if (data.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(data);
    } catch (error) {
      setIsError(true);
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = (): void => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      
      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

    
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );

}

