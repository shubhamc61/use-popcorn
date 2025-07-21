import { useState } from 'react';

import MovieTile from './MovieTile';
import { MovieType } from '../App';

interface MovieListProp {
  movies: MovieType[];
}

function MovieList({ movies }: MovieListProp) {
  return (
    <ul className='list'>
      {movies.map(movie => (
        <MovieTile movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default MovieList;
