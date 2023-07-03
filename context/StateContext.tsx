'use client';

import React, { useState, createContext, useContext, SetStateAction, useEffect } from 'react';
import words from '@/app/words';

import { LetterStatus } from '@/enums';

interface StateContextType {
  activeLine: number,
  setActiveLine: React.Dispatch<SetStateAction<number>>,
  cells: string[],
  setCells: React.Dispatch<SetStateAction<string[]>>,
  curWord: string,
  setCurWord: React.Dispatch<SetStateAction<string>>,
  curResults: LetterStatus[],
  setCurResults: React.Dispatch<SetStateAction<LetterStatus[]>>,
  getWord: () => void,
  warn: boolean,
  showWarn: () => void
}

const Context = createContext<StateContextType>({
  activeLine: 0,
  setActiveLine: () => {},
  cells: ['', '', '', '', ''],
  setCells: () => {},
  curWord: '',
  setCurWord: () => {},
  curResults: new Array(5).fill(LetterStatus.unset),
  setCurResults: () => {},
  getWord: () => {},
  warn: false,
  showWarn: () => {}
});

type Children = {
  children: React.ReactNode
}

const StateContext = ({ children }: Children) => {
  const [activeLine, setActiveLine] = useState(0);
  const [cells, setCells] = useState(['', '', '', '', '']);
  const [curWord, setCurWord] = useState('');
  const [curResults, setCurResults] = useState(new Array(5).fill(LetterStatus.unset));

  const [warn, setWarn] = useState(false);

  function getWord () {
    const index = Math.floor(Math.random() * words.words.length);
    setCurWord(words.words[index]);
  }

  useEffect(() => {
    getWord();
  }, []);

  useEffect(() => {
    setActiveLine(0);
    setCells(['', '', '', '', '']);
    setCurResults(new Array(5).fill(LetterStatus.unset));
  }, [curWord]);

  function showWarn () {
    setWarn(true);
    setTimeout(() => {
      setWarn(false);
    }, 1100);
  }

  return (
    <Context.Provider value={{
      activeLine,
      setActiveLine,
      cells,
      setCells,
      curWord,
      setCurWord,
      curResults,
      setCurResults,
      getWord,
      warn,
      showWarn
    }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);

export default StateContext;
