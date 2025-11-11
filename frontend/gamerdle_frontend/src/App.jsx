import { useEffect, useRef, useState } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";

function getLetterStatuses(guesses) {
  const statuses = {};
  for (const { word, result } of guesses) {
    word.split("").forEach((letter, i) => {
      const status = result[i];
      const current = statuses[letter];
      if (
        current === "correct" ||
        (current === "present" && status === "absent") ||
        current === status
      )
        return;
      statuses[letter] = status;
    });
  }
  return statuses;
}

function App() {
  const [guesses, setGuesses] = useState([]);
  const [currGuess, setCurrGuess] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [currentWordData, setCurrentWordData] = useState({});
  const currGuessRef = useRef(currGuess);
  const correctWordRef = useRef("");

  useEffect(() => {
    currGuessRef.current = currGuess;
  }, [currGuess]);

  useEffect(() => {
    correctWordRef.current = currentWord.toUpperCase();
  }, [currentWord])

  useEffect(() => {
    fetch("http://localhost:8080/api/words/random")
      .then((res) => res.json())
      .then((entry) => {
        setCurrentWord(entry.word.toUpperCase());
        setCurrentWordData(entry);
      })
      .catch((err) => console.error("Error fetching word", err));
  }, []);

  const correctWord = currentWord;
  const wordInfo = currentWordData.definition;
  console.log(correctWord);

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

        const targetWord = correctWordRef.current;
        if (!targetWord) return;

        const target = targetWord.split("");
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

  const letterStatuses = getLetterStatuses(guesses);

  return (
    <div className="app">
      <h1>🎮 GAMERDLE 🎮</h1>
      <Board guesses={guesses} currGuess={currGuess} />
      <Keyboard
        letterStatuses={letterStatuses}
        onKeyPress={(key) => {
          const event = new KeyboardEvent("keydown", { key });
          window.dispatchEvent(event);
        }}
      />
    </div>
  );
}

export default App;
