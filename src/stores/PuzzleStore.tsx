import words from "../words.json"
import {useState} from 'react'

export default{
    word: '',
    guesses:[],
    currentGuess:0,
    dialogue: "", 
    showDialogue: false,
    lastWinDate: null,
    winGuessDistribution: new Array(6).fill(0),
    dailyStreak:0,
    totalGames:0,
    totalWins:0,
    // winPercentage:0,

    get won() {
        // If guessed word is the secret word, user wins
        return this.guesses[this.currentGuess-1] === this.word
    },
    get lost() {
        // If the current guess is maxed out, user loses
        return this.currentGuess === 6
    },
    get allGuesses() {
        // Get all guessed characters
        return this.guesses.slice(0, this.currentGuess).join('').split('')
    },
    get exactGuesses() {
        // Filter the characters in the word based on which ones are in the correct spot
        return (
            this.word.split('').filter((letter, i) => {
                return this.guesses.slice(0, this.currentGuess).map((word) => word[i]).includes(letter) 
            })
        )
    },
    get inexactGuesses() {
        // Filter the characters in the word based on what has been guessed
        return this.word.split('').filter(letter => this.allGuesses.includes(letter))
    },

    init() {
        // Reset word and clear guesses
        this.loadMetrics();
        this.word = words[Math.round(Math.random() * words.length)]
        this.guesses.replace(new Array(6).fill(''))
        this.currentGuess = 0;
        this.totalGames += 1;
    },
    submitGuess() {
        this.dialogue = null
        // Word is not in list
        if( !(words.includes(this.guesses[this.currentGuess]))) {
            this.dialogue = `${this.guesses[this.currentGuess]} is not in the word list.`
            
            return
        }

        // Word is a repeat guess
        if( (this.guesses.filter(word => word === this.guesses[this.currentGuess]).length) > 1) {
            this.dialogue = `You already guessed ${this.guesses[this.currentGuess]}.`

            return
        }

        this.currentGuess += 1

        if (this.won) {
            this.totalWins += 1;
            // this.winPercentage = Math.round((this.totalWins / this.totalGames) * 100);

            this.updateStreak();
            this.incrementWinGuessDistribution(this.currentGuess)
            this.saveMetrics();
            console.log(this.winPercentage);
        } else if (this.lost) {
            this.saveMetrics();
        }

    },

    get winPercentage() {
        return this.totalGames === 0 ? 0 : Math.round((this.totalWins / this.totalGames) * 100);
    },
    
    handleKeyup(e) {
        // End game if the user won or lost
        if (this.won || this.lost) {
            // TODO: show pop up with message?
            return
        }

        // Submit a guess 
        if (e.key === "Enter") {
            return this.submitGuess()
        }

        // Backspace functionality
        if(e.key === "Backspace") {
            this.guesses[this.currentGuess] = this.guesses[this.currentGuess].slice(
                0,
                this.guesses[this.currentGuess].length - 1
            )
            return
        }

        // Enter character based on RegEx. Otherwise, ignore the key stroke
        if(this.guesses[this.currentGuess].length < 5 && e.key.match(/^[A-z]$/)) {
            this.guesses[this.currentGuess] = 
                this.guesses[this.currentGuess] + e.key.toLowerCase()
        }
    },

    loadMetrics() {
        // this.winPercentage = JSON.parse(localStorage.getItem('winPercentage')) || 0;
        this.dailyStreak = JSON.parse(localStorage.getItem('dailyStreak')) || 0;
        this.totalWins = JSON.parse(localStorage.getItem('totalWins')) || 0;
        this.totalGames = JSON.parse(localStorage.getItem('totalGames')) || 0;
        this.winGuessDistribution = JSON.parse(localStorage.getItem('winGuessDistribution')) || new Array(6).fill(0);
      },
      saveMetrics() {
        // localStorage.setItem('winPercentage', JSON.stringify(this.winPercentage));
        localStorage.setItem('dailyStreak', JSON.stringify(this.dailyStreak));
        localStorage.setItem('totalWins', JSON.stringify(this.totalWins));
        localStorage.setItem('totalGames', JSON.stringify(this.totalGames));
        localStorage.setItem('winGuessDistribution', JSON.stringify(this.winGuessDistribution));
      },

      updateStreak() {
        const today = new Date();
        const lastWin = new Date(this.lastWinDate);
    
        if (this.lastWinDate) {
          const diffInTime = today.getTime() - lastWin.getTime();
          const diffInDays = diffInTime / (1000 * 3600 * 24);
    
          if (diffInDays === 1) {
            this.dailyStreak += 1; // Increment daily streak
          } else {
            this.dailyStreak = 1; // Reset daily streak
          }
        } else {
          this.dailyStreak = 1; // Start new streak
        }
      },
      incrementWinGuessDistribution(guessNumber) {
        if (guessNumber > 0 && guessNumber <= 6) {
          this.winGuessDistribution[guessNumber - 1] += 1;
        }
      },

}