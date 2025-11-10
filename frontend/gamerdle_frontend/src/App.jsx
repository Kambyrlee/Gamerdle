import { useEffect, useRef, useState } from "react";
import Board from "./components/Board";

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currGuess, setCurrGuess] = useState("");
  const currGuessRef = useRef(currGuess);
  // Add hardcoded correct word for debugging.
  const correctWord = "GAMER";

  useEffect(() => {
    currGuessRef.current = currGuess;
  }, [currGuess]);

  useEffect(() => {
    function handleKeyDown(e) {
      const key = e.key.toLowerCase();
      if (/^[a-z]$/.test(key)) {
        setCurrGuess((prev) => (prev.length < 5 ? prev + key : prev));
      }
      if (key === "backspace") {
        setCurrGuess((prev) => prev.slice(0, -1));
      }
      if (key === "enter") {
        const guess = currGuessRef.current.toUpperCase();
        if (guess.length !== 5) return;

        const target = correctWord.split("");
        const guessArr = guess.split("");
        const result = Array(5).fill("absent");
        const used = Array(5).fill(false);

        for (let i = 0; i < 5; i++) {
          if (guessArr[i] === target[i]) {
            result[i] = "correct";
            used[i] = true;
          }
        }
        for (let i = 0; i < 5; i++) {
          if (result[i] === "correct") continue;
          const index = target.findIndex(
            (t, j) => t === guessArr[i] && !used[j]
          );
          if (index !== -1) {
            result[i] = "present";
            used[index] = true;
          }
        }

        if (guess.length === 5) {
          setGuesses((prev) => [...prev, { word: guess, result }]);
          setCurrGuess("");
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="app">
      <h1>🎮 GAMERDLE 🎮</h1>
      <Board guesses={guesses} currGuess={currGuess} />
    </div>
  );
}

export default App;
