import { useState } from 'react';

interface ListBoxProps {
  children: React.ReactNode;
}
function ListBox({ children }: ListBoxProps) {
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

export default ListBox;
