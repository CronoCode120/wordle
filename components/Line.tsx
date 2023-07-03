'use client';

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import { useStateContext } from '@/context/StateContext';

import { LetterStatus } from '@/enums';

type IndexProp = {
  index: number
}

const Line = ({ index }: IndexProp) => {
  const { cells, activeLine, curResults, curWord } = useStateContext();

  const [lineCells, setLineCells] = useState(['', '', '', '', '']);
  const [lineResults, setLineResults] = useState(new Array(5).fill(LetterStatus.unset));

  useEffect(() => {
    if (activeLine === index) {
      setLineCells([...cells]);
    }
  }, [activeLine, cells]);

  useEffect(() => {
    if (activeLine === index) {
      setLineResults([...curResults]);
    }
  }, [curResults]);

  useEffect(() => {
    setLineCells(['', '', '', '', '']);
    setLineResults(new Array(5).fill(LetterStatus.unset));
  }, [curWord]);

  return (
    <div id={`line${index}`} className='flex justify-between w-[300px] py-1 relative transition-all duration-400'>
      {lineCells.map((_, i) => (
        <Cell key={i} id={`${index}${i}`} line={index} letter={lineCells[i]} result={lineResults[i]}/>
      ))}
    </div>
  );
}

export default Line;
