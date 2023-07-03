'use client';

import React, { useEffect, useState } from 'react';
import { useStateContext } from '@/context/StateContext';
import { LetterStatus } from '@/enums';

type Props = {
  value: string
}

const Key = ({ value }: Props) => {
  const { setCells, cells, curResults, curWord} = useStateContext();

  const [status, setStatus] = useState(LetterStatus.unset);

  useEffect(() => {
    cells.forEach((letter, index) => {
      if (letter === value) {
        if (curResults[index] === LetterStatus.correct) {
          setStatus(LetterStatus.correct);

        } else if (curResults[index] === LetterStatus.misplaced && status !== LetterStatus.correct) {
          setStatus(LetterStatus.misplaced);

        } else if (curResults[index] === LetterStatus.missing) {
          setStatus(LetterStatus.missing);

        }
      }
    })
  }, [curResults]);

  useEffect(() => {
    const key = document.getElementById(value);
    if (key instanceof HTMLButtonElement) {
      if (status === LetterStatus.correct) {
        key.style.backgroundColor = '#538d4e';
      } else if (status === LetterStatus.misplaced) {
        key.style.backgroundColor = '#b59f3b';
      } else if (status === LetterStatus.missing) {
        key.style.backgroundColor = 'rgb(17 24 39)';
        key.style.color = 'rgb(107 114 128)';
        key.style.border = '1px solid rgb(107 114 128)';
      } else {
        key.style.backgroundColor = '#3a3a3c';
        key.style.color = 'white';
        key.style.border = 'none';
      }
    }
  }, [status]);

  useEffect(() => {
    setStatus(LetterStatus.unset);
  }, [curWord]);

  return (
    <button
      type='button'
      id={value}
      className='text-2xl font-semibold max-sm:w-[22px] w-[40px] h-[50px] rounded-lg bg-[#3a3a3c] m-1'
      onClick={() => setCells(prevCells => {
        const length = prevCells.filter(val => val !== '').length;
        if (length < 5) {
          prevCells.splice(length, 1, value);
          return [...prevCells];
        }
        return prevCells;
      })}
    >
      {value}
    </button>
  )
}

export default Key;
