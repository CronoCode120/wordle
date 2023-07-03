'use client';

import React, { useEffect, useState } from 'react';
import Key from './Key';
import { useStateContext } from '@/context/StateContext';
import words from '@/app/words';
import { LetterStatus } from '@/enums';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faRightToBracket, faRotateBack } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const Keyboard = () => {
  const alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM".split('');
  const { cells, setCells, curWord, setActiveLine, setCurResults, getWord, showWarn } = useStateContext();

  const [won, setWon] = useState(false);

  const enterWord = () => {
    const testWord = [...cells].join('').toLowerCase();
    const wordIsFound = words.words.find(word => word === testWord);

    const newResults: LetterStatus[] = [];


    if (testWord === curWord) {
      for (let i = 0; i < 5; i++) {
        newResults.push(LetterStatus.correct);
      }
      setCurResults(newResults);

      setWon(true);

    } else if (wordIsFound) {
      for (let i = 0; i < 5; i++) {
        const letterKey = document.getElementById(`${curWord[i]}`);
        if (curWord[i] === testWord[i]) {
          newResults.push(LetterStatus.correct);
          
          if (letterKey instanceof HTMLButtonElement) {
            letterKey.style.backgroundColor = '#538d4e';
          }

        } else if (curWord.includes(testWord[i])) {
          newResults.push(LetterStatus.misplaced);

          if (letterKey instanceof HTMLButtonElement && letterKey.style.backgroundColor !== '#538d4e') {
            letterKey.style.backgroundColor = '#b59f3b';
          }

        } else {
          newResults.push(LetterStatus.missing);

          if (letterKey instanceof HTMLButtonElement) {
            letterKey.style.backgroundColor = '#3a3a3c';
          }
        }
      }
      setCurResults([...newResults]);
      setTimeout(() => {
        setActiveLine(prevLine => prevLine + 1);
        setCells(['', '', '', '', '']);
        setCurResults(new Array(5).fill(LetterStatus.unset));
      }, 1000);

    } else {
      showWarn();
      import('react-hot-toast')
      .then(data => {
        data.toast.custom((t) => (
          <div className={`${t.visible && 'animate-show'} rounded-3xl bg-gray-800 p-4`}>
            <p><span className='mr-2'><FontAwesomeIcon icon={faCircleXmark} size='2xl'/></span> This word is not on the list.</p>
          </div>
        ), {
          duration: 3000,
          position: 'top-center'
        })
      })
    }
  }

  useEffect(() => {
    if (won) {
      const msg = document.getElementById('win-msg');
      if (msg instanceof HTMLElement) {
        setTimeout(() => {
          msg.style.opacity = '1';
        }, 100);
      }
    }
  }, [won]);

  return (
    <div className='max-sm:w-[300px] w-[500px] h-full flex flex-wrap justify-center items-center relative'>
      {alphabet.map(letter => (
        <Key key={letter} value={letter}/>
      ))}
      <button
        type='button'
        aria-label='Delete'
        title='Delete'
        className='text-2xl max-sm:w-[35px] w-[40px] h-[50px] rounded-lg bg-gray-800 m-1'
        onClick={() => {
          if (!won) {
            setCells(prevCells => {
              const length = prevCells.filter(val => val !== '').length;
              if (length > 0) {
                prevCells.splice(length - 1, 1, '');
                return [...prevCells];
              }
              return prevCells;
            });
          }
        }}
      >
        <FontAwesomeIcon icon={faDeleteLeft}/>
      </button>
      <button
        type='button'
        aria-label='Enter'
        title='Enter'
        className='text-2xl max-sm:w-[35px] w-[80px] h-[50px] rounded-lg bg-gray-800 m-1'
        onClick={() => {
          if (cells.length === 5 && !won) {
            enterWord();
          }
        }}
      >
        <span className='sm:hidden'><FontAwesomeIcon icon={faRightToBracket}/></span>
        <span className='max-sm:hidden text-xl font-semibold'>ENTER</span>
      </button>
      {won && <section id='win-msg' className='w-full h-full absolute top-0 left-0 flex flex-col justify-center items-center z-30 bg-[rgba(25,25,25,.8)] backdrop-blur-[5px] rounded-3xl opacity-0 transition-all duration-500'>
        <h1 className='font-semibold text-2xl mb-4'>You got it!</h1>
        <p>The word was:</p>
        <p className='font-bold text-lg text-green-400 mb-4'>{curWord.toUpperCase()}</p>
        <button
          type='button'
          className='max-sm:text-sm p-2 rounded-full border bg-gray-300 text-black shadow-md shadow-gray-500 group'
          onClick={() => {
            setWon(false);
            getWord();
          }}
        >
          New round <FontAwesomeIcon icon={faRotateBack} size='xl' id='replay' className='transition-all duration-[800ms] group-hover:rotate-[-360deg]'/>
        </button>
      </section>}
    </div>
  )
}

export default Keyboard;
