import { useState } from 'react';
import { MovieType } from '../App';

interface ListBoxProps {
  children: React.ReactNode;
}

function Box({ children }: ListBoxProps) {
  const [isOpen1, setIsOpen1] = useState<boolean>(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen1(open => !open)}>
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && children}
    </div>
  );
}

export default Box;
