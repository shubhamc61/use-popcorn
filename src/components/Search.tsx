import { useEffect, useRef, useState } from 'react';

interface SearchProps {
  query: string;
  setQuery: (value: string) => void;
}
function Search({ query, setQuery }: SearchProps) {
  const inputElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputElement.current?.focus();
  }, []);

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

export default Search;
