import React from 'react';
import { MovieType } from '../App';

type MovieTileProps = {
  movie: MovieType;
};

function MovieTile({ movie }: MovieTileProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieTile;
