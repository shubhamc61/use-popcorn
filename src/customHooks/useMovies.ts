import { useState, useEffect } from 'react';
import { MovieType } from '../App';

const KEY = 'ee3cf935';

export function useMovies(query: string, callback: () => void) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    callback?.();
    const controller = new AbortController();

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
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
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

    const timeoutId = setTimeout(fetchMovies, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return { movies, error, isLoading, KEY };
}
