import { useState } from 'react';

import MovieTile from './MovieTile';
import { MovieType } from '../App';

interface MovieListProp {
  movies: MovieType[];
  onSelectMovie: (id: string) => void;
}

function MovieList({ movies, onSelectMovie }: MovieListProp) {
  return (
    <ul className='list list-movies'>
      {movies.map(movie => (
        <MovieTile
          onSelectMovie={onSelectMovie}
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

export default MovieList;
