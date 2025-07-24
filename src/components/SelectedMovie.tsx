import React, { useEffect, useRef, useState } from 'react';
import StarRating from './StarRating';
import { Loader, WatchedMovie } from '../App';

interface SelectedMovieProp {
  selectedMovieId: string;
  oncloseMovie: () => void;
  keys: string;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}
interface MovieDetails {
  Title?: string;
  Year?: string;
  Released?: string;
  Genre?: string;
  imdbRating?: string;
  Poster?: string;
  Plot?: string;
  Actors?: string[];
  Director?: string;
  Runtime?: string;
  imdbID?: string;
}
export default function SelectedMovie({
  selectedMovieId,
  oncloseMovie,
  keys,
  onAddWatched,
  watched,
}: SelectedMovieProp) {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRating, setUserRating] = useState<number>(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  const isWatched = watched
    .map(movie => movie.imdbID)
    .includes(selectedMovieId);

  const watchedUserRating = watched.find(
    movie => movie.imdbID === selectedMovieId
  )?.userRating;

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${keys}&i=${selectedMovieId}`
      );
      const data = await res.json();
      setMovieDetails(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedMovieId, keys]);

  const handleAdd = () => {
    if (!movieDetails) return; // ✅ Null check

    const newWatchedMovie: WatchedMovie = {
      imdbID: selectedMovieId,
      Title: movieDetails.Title || '',
      Year: movieDetails.Year || '',
      Poster: movieDetails.Poster || '',
      imdbRating: Number(Number(movieDetails.imdbRating).toFixed(1)),
      runtime: parseInt(movieDetails.Runtime || '0', 10),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    oncloseMovie();
  };

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={oncloseMovie}>
              &larr;
            </button>
            <img src={movieDetails?.Poster} alt={movieDetails?.Poster} />
            <div className='details-overview'>
              <h2>{movieDetails?.Title}</h2>
              <p>
                {movieDetails?.Released} &bull; {movieDetails?.Runtime}
              </p>
              <p>{movieDetails?.Genre}</p>
              <p>
                <span>⭐</span>
                <span>{movieDetails?.imdbRating} IMDb Rating</span>
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    size={24}
                    defaultRating={1}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to the list
                    </button>
                  )}
                </>
              ) : (
                <p>You have already given this movie {watchedUserRating}⭐</p>
              )}
            </div>
            <p>
              <em>{movieDetails?.Plot}</em>
            </p>
            <p>Starring: &nbsp;{movieDetails?.Actors}</p>
            <p>Directed By {movieDetails?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
