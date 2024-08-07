// components/Dialogue.tsx
import React from 'react';
import PuzzleStore from '../stores/PuzzleStore'

// interface DialogueProps {
//   won: boolean;
//   lost: boolean;
//   dailyStreak: number;
//   secretWord: string;
//   onPlayAgain: () => void;
// }

interface DialogueProps {
    store: typeof PuzzleStore
    onClose: () => void; // Function to close the modal
  }

const toSentenceCase = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Dialogue: React.FC<DialogueProps> = ({ store, onClose }) => {
  if (!store.won && !store.lost) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg text-black">

        {/* <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
        >
            X
        </button> */}
      <h2 className="text-2xl font-bold mb-4">{store.won ? "Congratulations!" : store.lost ? "Game Over" : "Game Status"}</h2>
        {store.won && <p>You guessed the word correctly!</p>}
        {store.lost && <p>Sorry, you've run out of guesses.</p>}
        <p className="mt-2">The word was: <strong>{toSentenceCase(store.word)}</strong></p>
        <p className="mt-2">Daily Streak: <strong>{store.dailyStreak}</strong></p>
        <p className="mt-2">Win Rate: <strong>{store.winPercentage}%</strong></p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={store.init}
          >
            Play Again
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
          </div>
      </div>
    </div>
  );
};

export default Dialogue;
