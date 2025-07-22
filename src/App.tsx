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

export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
};

export type WatchedMovie = MovieType & {
  runtime: number;
  imdbRating: number;
  userRating: number;
};

function Loader() {
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

  const KEY = 'ee3cf935';
  const query = 'in r';

  useEffect(() => {
    const fetchMovies = async () => {
      try {
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
          console.log(err.message);
          setError(err.message);
        } else {
          console.log('An unknown error occurred');
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
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
