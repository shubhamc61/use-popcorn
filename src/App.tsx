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
import { useMovies } from './customHooks/useMovies';

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
  const [query, setQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // const [watched, setWatched] = useState<WatchedMovie[]>([]);
  const { movies, KEY, error, isLoading } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useState<WatchedMovie[]>(() => {
    const storedValue = localStorage.getItem('watched');
    return storedValue ? JSON.parse(storedValue) : [];
  });

  const handleSelectMovie = (id: string) => {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  };

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const handleWatchedMovies = (movie: WatchedMovie) => {
    setWatched(watched => [...watched, movie]);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

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
