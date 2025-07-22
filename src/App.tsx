import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Logo from './components/Logo';
import Search from './components/Search';
import NumResults from './components/NumResults';

import MovieList from './components/MovieList';
import Box from './components/Box';
import WatchedSummary from './components/WatchedSummary';
import WatchedMovieList from './components/WatchedMoviesList';
import SelectedMovie from './components/SelectedMovie';

export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type WatchedMovie = MovieType & {
  runtime: number;
  imdbRating: number;
  userRating?: number;
};

export function Loader() {
  return <p className='loader'>Loading...</p>;
}

interface ErrorMessageProps {
  message: string;
}
function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className='error'>
      <span>⛔</span>
      {message}
    </p>
  );
}
export default function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [watched, setWatched] = useState<WatchedMovie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [query, setQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const KEY = 'ee3cf935';

  const handleSelectMovie = (id: string) => {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleWatchedMovies = (movie: WatchedMovie) => {
    setWatched(watched => [...watched, movie]);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  };
  useEffect(() => {
    const fetchMovies = async () => {
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      try {
        setError('');
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) {
          throw new Error('Something went wrong while fetching movies');
        }

        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.error('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              keys={KEY}
              oncloseMovie={handleCloseMovie}
              selectedMovieId={selectedId}
              onAddWatched={handleWatchedMovies}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
