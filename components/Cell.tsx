'use client';

import { LetterStatus } from '@/enums';
import React, { useEffect } from 'react';
import { useStateContext } from '@/context/StateContext';

type Props = {
  letter: string
  result: LetterStatus
  id: string
  line: number
}

const Cell = ({ letter, result, id, line }: Props) => {
  const { warn, activeLine, curWord } = useStateContext();

  useEffect(() => {
    if (activeLine === line) {
      const cell = document.getElementById(id);
      if (cell instanceof HTMLDivElement) {
        cell.style.border = '2px solid white';
        cell.style.boxShadow = '0 0 4px 0 white';
      }
    }
  }, [activeLine]);

  useEffect(() => {
    const cell = document.getElementById(id);
    if (cell instanceof HTMLDivElement) {
      if (result === LetterStatus.correct) {
        cell.style.border = '2px solid rgb(34 197 94)';
        cell.style.color = 'rgb(34 197 94)';
        cell.style.boxShadow = '0 0 4px 2px rgb(74 222 128)';
      } else if (result === LetterStatus.misplaced) {
        cell.style.border = '2px solid rgb(250 204 21)';
        cell.style.color = 'rgb(250 204 21)';
        cell.style.boxShadow = 'none';
      } else if (result === LetterStatus.missing) {
        cell.style.border = '2px solid rgb(156 163 175)';
        cell.style.color = 'rgb(156 163 175)';
        cell.style.boxShadow = 'none';
      } else {
        cell.style.backgroundColor = 'transparent';
      }
    }
  }, [result, id]);

  useEffect(() => {
    if (line === activeLine && warn) {
      const cell = document.getElementById(id);
      if (cell instanceof HTMLDivElement) {
        setTimeout(() => {
          cell.style.border = '2px solid rgb(220 38 38)';
          cell.style.boxShadow = '0 0 10px 1px rgb(239 68 68)';
          setTimeout(() => {
            cell.style.border = '2px solid white';
            cell.style.boxShadow = '0 0 4px 0 white';
            setTimeout(() => {
              cell.style.border = '2px solid rgb(220 38 38)';
              cell.style.boxShadow = '0 0 10px 1px rgb(239 68 68)';
              setTimeout(() => {
                cell.style.border = '2px solid white';
                cell.style.boxShadow = '0 0 4px 0 white';
              }, 250);
            }, 250);
          }, 250);
        }, 250);
      }
    }
  }, [warn]);

  useEffect(() => {
    const cell = document.getElementById(id);
    if (cell instanceof HTMLDivElement) {
      if (line === 0) {
        cell.style.border = '2px solid white';
        cell.style.boxShadow = '0 0 4px 0 white';
      } else {
        cell.style.boxShadow = 'none';
        cell.style.border = '2px solid rgb(31 41 55)';
      }
    }
  }, [curWord]);

  return (
    <div id={id} className='rounded-lg border-[2px] border-gray-800 w-[55px] h-[55px] flex justify-center items-center text-4xl font-bold transition-all duration-250'>
      {letter}
    </div>
  )
}

export default Cell;
