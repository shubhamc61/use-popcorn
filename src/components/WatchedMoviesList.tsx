import { WatchedMovie } from './WatchedBox';
import WatchedMovieTile from './WatchedMovieTile';

interface WatchedMovieListProps {
  watched: WatchedMovie[];
}

function WatchedMovieList({ watched }: WatchedMovieListProps) {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovieTile movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
