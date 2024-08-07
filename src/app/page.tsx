"use client";

import { observer, useLocalObservable } from "mobx-react-lite";
import {useEffect, useState, useRef} from 'react'
import Guess from "../components/Guess";
import Qwerty from "../components/Qwerty";
import PuzzleStore from "../stores/PuzzleStore";
import Dialogue from "../components/Dialogue"

export default observer(function Home() {
  const store = useLocalObservable(() => PuzzleStore)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    store.init()
    window.addEventListener('keyup', store.handleKeyup)

    return() => {
      window.removeEventListener('keyup', store.handleKeyup)
    }
  }, [] )

  useEffect(() => {
    if (store.won || store.lost) {
      setIsModalOpen(true);
    }
  }, [store.won, store.lost]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContainerClick = () => {
    // Focus the hidden input on mobile devices
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-600" onClick={handleContainerClick}>
      <h1 className="text-6xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-green-400">Wordle</h1>
      { store.guesses.map((_,i) => (
        <Guess 
          key={i}
          word={store.word} 
          guess={store.guesses[i]} 
          isGuessed={i < store.currentGuess}
          />
      ))}
      {/* {store.won && <h1>You won!</h1>}
      {store.lost && <h1>You lost :( </h1>} */}
      {(store.won || store.lost) && (
        <button onClick={store.init}> Play Again </button> )}
      <Qwerty store={store}/>

      {(store.dialogue) && <h1> {store.dialogue}</h1>}

      {isModalOpen && (
        <Dialogue store={store} onClose={closeModal} />
      )}

      {/* Word: {store.word} 
      Guesses: {JSON.stringify(store.guesses)}
      Dialogue: {store.dialogue}
      Streak: {JSON.stringify(store.dailyStreak)}
      Win Rate: {JSON.stringify(store.winPercentage)}
      Total Games: {JSON.stringify(store.totalGames)}
      Wins: {JSON.stringify(store.totalWins)}
      Win Metric: {JSON.stringify(store.winGuessDistribution)} */}
    </div>
  )
})
