import { WatchedMovie } from '../App';
import WatchedMovieTile from './WatchedMovieTile';

interface WatchedMovieListProps {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string) => void;
}

function WatchedMovieList({ watched, onDeleteWatched }: WatchedMovieListProps) {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovieTile
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

export default WatchedMovieList;
