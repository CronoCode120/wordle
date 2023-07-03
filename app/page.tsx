'use client';

import { useState } from "react";
import { Keyboard, Line } from "@/components";
import { faQuestionCircle, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Toaster} from 'react-hot-toast';

export default function Home() {
  const [help, setHelp] = useState(false);

  const showHelp = () => {
    setHelp(true);
    setTimeout(() => {
      const helpEl = document.getElementById('help-main');
      if (helpEl instanceof HTMLDivElement) {
        helpEl.style.opacity = '1';
        helpEl.style.transform = 'translateY(0)';
      }
    }, 100);
  }

  const hideHelp = () => {
    const helpEl = document.getElementById('help-main');
    if (helpEl instanceof HTMLDivElement) {
      helpEl.style.opacity = '0';
      helpEl.style.transform = 'translateY(40px)';
    }
    setTimeout(() => setHelp(false), 350);
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="h-14 flex justify-between items-center px-6">
        <h1 className="font-bold text-3xl">Wordle</h1>
        <button type="button" aria-label="Help" title="Help" onClick={showHelp}>
          <FontAwesomeIcon icon={faQuestionCircle} size="xl"/> Help
        </button>
      </header>
      <main>
        <Toaster/>
        <div className="w-full flex flex-col justify-center items-center">
          <Line index={0}/>
          <Line index={1}/>
          <Line index={2}/>
          <Line index={3}/>
          <Line index={4}/>
          <Line index={5}/>
        </div>
        <div className="w-full flex justify-center items-center mt-2">
          <Keyboard/>
        </div>

        {help && (<div className="absolute w-screen h-screen bg-[rgba(0,0,0,.8)] top-0 left-0 z-30 flex justify-center items-center">
          <div id="help-main" className="bg-gray-900 rounded-3xl w-[290px] p-5 relative translate-y-[40px] opacity-0 transition-all duration-300">
            <h2 className="text-left text-2xl font-bold mb-2">How to Play</h2>
            <h3 className="text-lg font-semibold mb-4">Guess the word in 6 tries</h3>
            <p className="text-sm">Each guess must be a valid 5-letter word. The color of the tiles will change to show how close your guess was to the word:</p>
            <ul className="mt-4 text-sm">
              <li className="flex justify-between items-center mb-3">
                <span className="text-[rgb(34,197,94)] border border-[rgb(34,197,94)] rounded-md p-1 mr-2">GREEN</span>
                <span className="w-[70%]">The letter is in the word and in the correct spot.</span>
              </li>
              <li className="flex justify-between items-center mb-3">
                <span className="text-[rgb(250,204,21)] border border-[rgb(250,204,21)] rounded-md p-1 mr-2">YELLOW</span>
                <span className="w-[70%]">The letter is in the word but in the wrong spot.</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-300 border border-gray-300 rounded-md p-1 mr-2">GRAY</span>
                <span className="w-[70%]">The letter is not in the word in any spot.</span>
              </li>
            </ul>
            <button type="button" className="absolute top-5 right-5" aria-label="Close help" title="Close help" onClick={hideHelp}>
              <FontAwesomeIcon icon={faXmarkCircle} size="xl"/>
            </button>
          </div>
        </div>)}
      </main>
      
    </div>
  )
}
